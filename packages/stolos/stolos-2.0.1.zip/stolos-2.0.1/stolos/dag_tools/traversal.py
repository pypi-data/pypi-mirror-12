from collections import defaultdict
import networkx as nx

from stolos.util import crossproduct, flatmap_with_kwargs

from stolos.exceptions import (
    _log_raise, _log_raise_if, DAGMisconfigured, InvalidJobId)

from stolos import configuration_backend as cb
from stolos import get_NS

from .build import build_dag
from .node import (parse_job_id, get_job_id_template, get_autofill_values)
from . import log


def topological_sort(lst):
    """Given a list of (app_name, job_id) pairs,
    topological sort by the app_names

    This is useful for sorting the parents and children of a node if the node
    has complex dependencies
    """
    dct = defaultdict(list)
    for app_job in lst:
        dct[app_job[0]].append(app_job)
    for node in nx.topological_sort(build_dag()):
        for app_job2 in dct[node]:
            yield app_job2


def get_parents(app_name, job_id, include_dependency_group=False,
                filter_deps=()):
    """Return an iterator over all parent (app_name, job_id) pairs
    Given a child app_name and job_id

    `include_dependency_group` - (bool) If True,
        yield (app_name, job_id, dependency_group_name) tuples instead
    `filter_deps` - (list|tuple) only yield parents from a particular
        dependency group

    """
    ld = dict(app_name=app_name, job_id=job_id)  # log details

    if job_id:
        parsed_job_id = parse_job_id(app_name, job_id)
        filter_deps = set(filter_deps)
        if 'dependency_group_name' in parsed_job_id:
            filter_deps.add(parsed_job_id['dependency_group_name'], )
    else:
        parsed_job_id = None

    for group_name, dep_group in _get_grps(app_name, filter_deps, ld):
        # dep_group is either a dict or list if dicts, where dicts contain
        # depends_on metadata.
        # ie.  group_name, dep_group = ("default", {"app_name": ["a", "b"]})

        dep_group = convert_dep_grp_to_parsed_list(app_name, dep_group)

        compatible = all(dep_group_and_job_id_compatible(
            grp, parsed_job_id, child_app_name=app_name)
            for grp in dep_group)
        if not compatible:
            log.debug(
                "ignore possible parents whose job_id can't match given child",
                extra=dict(dependency_group_name=group_name, **ld))
            continue

        for subgrp in dep_group:

            for rv in _get_parent_job_ids(
                    group_name, subgrp,
                    child_app_name=app_name, child_job_id=job_id, ld=ld):
                if include_dependency_group:
                    yield rv + (group_name, )
                else:
                    yield rv


def convert_dep_grp_to_parsed_list(app_name, dep_group):
    """Convert depends_on data into an expanded list of depends_on dicts, where
    the "all" values have been populated with a list of values determined by
    each parent app_name

    `dep_group` either a dict or a list of dicts in form:
        [{"app_name": ["a", "b"], "testID": "all", ...}]
        --> this input would return
            [{"app_name": ["a"], "testID": ["a's testID values"]},
            {"app_name": ["b"], "testID", ["b's testID values"]}]

    """
    if isinstance(dep_group, cb.TasksConfigBaseMapping):
        dep_group = parse_values(app_name, dep_group)
    elif isinstance(dep_group, cb.TasksConfigBaseSequence):
        dep_group = [
            lst for grp in dep_group for lst in parse_values(app_name, grp)]
    else:
        raise Exception(
            "Expected TasksConfigBaseMapping or TasksConfigBaseSequence."
            " got: %s" % type(dep_group))
    return dep_group


def parse_values(app_name, dep_group):
    """Examine values of job_id metadata in a dict such as:
        {app_name: [a, b, c], testID: "all"}
    If "all" is any of the values, return a list where each app_name has a copy
    of the input dep_group dict, and the "all" values populated

    Don't try too hard to figure out what "all" means.

    When used by get_parents, we want to ensure the child can pupulate parent's
    job_id values When used by get_children, we want to ensure the parent
    job_id can populate the child
    """
    if "all" not in dep_group.values():
        return [dep_group]

    err_msg = (  # in case it happens...
        'Expected to find parent_app_name.autofill_values because'
        ' `child_app_name` depends on "all" possible values of (at'
        ' least) one of its parents job_id components')

    all_replace_keys = [k for k, v in dep_group.items() if v == "all"]
    dep_grps = []
    for parent_app_name in dep_group['app_name']:
        # create a dep group for this parent
        dep_grps.append({k: list(v) for k, v in dep_group.items()})
        dep_grps[-1]['app_name'] = [parent_app_name]

        # get the subset of all_replace_keys that is relevant for this parent
        _, ptemplate = get_job_id_template(parent_app_name)
        parent_replace_keys = [k for k in all_replace_keys if k in ptemplate]

        # drop irrelevant (and undefinable) job_id values from the dep group
        if not parent_replace_keys:
            for k in all_replace_keys:
                dep_grps[-1].pop(k)
            continue

        # replace the "all" keys appropriately
        try:
            autofill_values = get_autofill_values(parent_app_name)
        except:
            log.error(err_msg, extra=dict(
                parent_app_name=parent_app_name, child_app_name=app_name))
            raise
        for k in parent_replace_keys:
            try:
                new_v = autofill_values[k]
            except KeyError:
                log.error(err_msg, extra=dict(
                    parent_app_name=parent_app_name, child_app_name=app_name))
                raise
            dep_grps[-1][k] = new_v
    return dep_grps


def dep_group_and_job_id_compatible(dep_group, child_pjob_id, child_app_name):
    """Check if the dependency group for this app could possibly have
    generated this job_id.  If it could have, then this dependency group
    contains parents and is compatible
    """
    if child_pjob_id is None:
        return True  # all dependency groups are compatible

    cj = get_autofill_values(child_app_name, raise_err=False)
    for parent in dep_group['app_name']:
        pj = get_autofill_values(parent, raise_err=False)
        _, parent_template = get_job_id_template(parent)

        # did this job_id come from this parent?
        for k in parent_template:
            if k not in child_pjob_id and k not in dep_group and k not in pj:
                if 'job_id' not in dep_group:
                    return False
        for k, v in child_pjob_id.items():
            if k in dep_group and v not in dep_group[k]:
                return False
            if k in cj and v not in cj[k] and v not in dep_group.get(k, []):
                return False
    return True


def _get_grps(app_name, filter_deps, ld):
    """
    Return an iterator that yields (dependency_group_name, group_metadata)
    tuples
    """
    td = cb.get_tasks_config()
    try:
        depends_on = td[app_name]['depends_on']
    except KeyError:
        return []  # this task has no dependencies
    if "app_name" in depends_on:
        grps = [(get_NS().dependency_group_default_name, depends_on)]
        _get_parents_validate_group_names(
            [get_NS().dependency_group_default_name], filter_deps, ld)
    elif filter_deps:
        _get_parents_validate_group_names(
            depends_on, filter_deps, ld)
        grps = (data for data in depends_on.items()
                if data[0] in filter_deps)
    else:
        grps = depends_on.items()
    return grps


def _get_parents_validate_group_names(
        dep_names, filter_deps, ld):
    _log_raise_if(
        not set(dep_names).issuperset(filter_deps),
        "You specified dependency group names that don't exist",
        extra=dict(filter_deps=filter_deps, **ld),
        exception_kls=DAGMisconfigured)


def _get_parent_job_ids(group_name, depends_on,
                        child_app_name, child_job_id, ld):
    """
    Yield the parent app_name and derived job_id for each parent listed in
    depends_on metadata

    If there is extra job_id criteria that doesn't apply to a
    particular parent app's job_id template, ignore it.
    """
    for parent_app_name in depends_on['app_name']:
        depends_on = dict(depends_on)  # shallow copy to change the keys

        _inplace_modify_depends_on(
            depends_on, child_app_name, child_job_id, parent_app_name, ld)
        # are there specific job_ids the child would inherit from?
        if 'job_id' in depends_on:
            for rv in _iter_job_ids(
                    dep_group=depends_on, group_name=group_name,
                    parent_app_name=parent_app_name, ld=ld):
                yield rv
        else:
            # try to fill in the parent's job_id template and yield it
            template, parsed_template = get_job_id_template(parent_app_name)
            so_far = set()

            _, cparsed_template = get_job_id_template(child_app_name)
            autofill_values = get_autofill_values(
                child_app_name, raise_err=False)
            pjob_id = parse_job_id(child_app_name, child_job_id)

            job_id_data = prep_crossproduct(
                cparsed_template, depends_on, autofill_values, pjob_id)

            for job_id_data in crossproduct([depends_on[_key]
                                            for _key in parsed_template]):
                _pjob_id = dict(zip(parsed_template, job_id_data))
                parent_job_id = template.format(
                    dependency_group_name=group_name, **_pjob_id)
                if parent_job_id not in so_far:
                    so_far.add(parent_job_id)
                    yield (parent_app_name, parent_job_id)


def _inplace_modify_depends_on(dep_group, child_app_name, child_job_id,
                               parent_app_name, ld):
    """Given metadata about a dependency group, set the dep_group['job_id']
    value.  Assume the dependency group only specifies an app_name key.
    Also, if the field for each identifier in the current job_id does
    not exist in the dependency group, add it.

    Basically, just update the dependency group with information """
    # if only "app_name" is defined in this dependency group,
    # assume child inherited the parent's job_id and passed that
    # to this child
    if child_job_id is None:
        _log_raise(
            ("It's impossible to get all parent job_ids if the"
                " child expects to inherit the parent's job_id and you"
                " haven't specified the child's job_id"),
            extra=dict(parent_app_name=parent_app_name, **ld),
            exception_kls=DAGMisconfigured)
    pjob_id = parse_job_id(child_app_name, child_job_id)
    if len(dep_group) == 1 and len(dep_group['app_name']) == 1:
        t, pt = get_job_id_template(parent_app_name)
        try:
            dep_group['job_id'] = [t.format(**pjob_id)]
        except Exception as err:
            _log_raise(
                ("The child job_id doesn't contain enough pjob_id data to"
                 " create the parent job_id. Err details: %s") % err,
                extra=dict(job_id_template=t, pjob_iddata=str(pjob_id), **ld),
                exception_kls=err.__class__)
    else:
        for k, v in pjob_id.items():
            if k not in dep_group:
                dep_group[k] = [v]


def _iter_job_ids(dep_group, group_name, parent_app_name, ld):
    """
    Assume there specific job_ids listed in dependency group metadata that
    the child would inherit from and yield those.
    """
    for jid in dep_group['job_id']:
        try:
            parse_job_id(parent_app_name, jid)
        except InvalidJobId:
            _ld = dict(**ld)
            _ld.update(
                dependency_group_name=group_name,
                job_id=jid)
            _log_raise(
                ("There's no way parent could have the child's job_id"),
                extra=_ld,
                exception_kls=InvalidJobId)
        yield (parent_app_name, jid)


def get_children(app_name, job_id, include_dependency_group=True):
    dg = build_dag()
    child_apps = [(k, vv) for k, v in dg.succ[app_name].items() for vv in v]
    for child, group_name in child_apps:
        depends_on = dg.node[child]['depends_on']
        # 2 types of depends_on definitions:
        # 1) dict with app_name
        # 2) named dependency groups:
        #     2a) dict without app_name that defines a list of dicts (AND)
        #     2b) dict without app_name that defines a single dict (OR)
        if group_name != get_NS().dependency_group_default_name:
            depends_on = depends_on[group_name]

        depends_on = convert_dep_grp_to_parsed_list(app_name, depends_on)

        kwargs = dict(
            func=_generate_job_ids,
            kwarg_name='depends_on', list_or_value=depends_on,
            app_name=app_name, job_id=job_id, child=child,
            group_name=group_name)
        for rv in flatmap_with_kwargs(**kwargs):
            if include_dependency_group:
                yield rv + (group_name, )
            else:
                yield rv


def _generate_job_ids(app_name, job_id, child, group_name, depends_on):
    # ignore dependency groups that have nothing to do with the parent app_name
    if app_name not in depends_on['app_name']:
        return []

    # if len(depends_on) == 1:
        # # child depends only on one parent, so it must be the parent we've
        # # called get_children on!
        # return [(child, job_id)]

    # check that the job_id applies to this group
    pjob_id = parse_job_id(app_name, job_id)  # parent data
    ctemplate, cparsed_template = get_job_id_template(child)  # child data

    # check if parent job_ids are hardcoded into configuration
    if 'job_id' in depends_on:
        if job_id in depends_on['job_id']:
            kwargs = dict()
            kwargs.update(pjob_id)
            kwargs.update({k: v[0] for k, v in depends_on.items()
                           if len(v) == 1})
            cjob_id = ctemplate.format(**kwargs)
            return [(child, cjob_id)]
        return []
    # check if the parent job_id template is compatible with this dep_grp
    child_autofill_values = get_autofill_values(child, raise_err=False)
    for k, v in pjob_id.items():
        # is the parent's job_id identifier defined anywhere?
        if k not in depends_on and k not in cparsed_template:
            return []
        # is the identifier appropriately missing from the dep_grp?
        if k in depends_on and v not in depends_on[k]:
            return []
        # is parent identifier defined in child autofill_values different
        # than parent's given job id?

        if k in child_autofill_values and v not in child_autofill_values[k]:
            return []

    # check that child's autofill_values are defined if parent doesn't
    # completely define a child's job_id components.
    required_autofill_values = set(cparsed_template).difference(pjob_id)
    _log_raise_if(
        any(x not in child_autofill_values
            for x in required_autofill_values),
        "autofill_values must be defined on child app_name if you have a"
        " parent whose job_id template is not a superset of the child's",
        extra=dict(
            child_app_name=child, parent_app_name=app_name,
            required_autofill_values=required_autofill_values),
        exception_kls=DAGMisconfigured)

    # check if the child's job_id template is compatible with this dep_grp
    for k in cparsed_template:
        # is child's job_id identifier appropriately missing from the dep_grp?
        if k in depends_on and k in pjob_id and \
                pjob_id[k] not in depends_on[k]:
            return []
        # is identifier defined anywhere?
        if (
                k not in depends_on and
                k not in pjob_id and
                k not in get_autofill_values(child, raise_err=False)
        ):
            return []
    return _generate_job_ids2(
        depends_on, pjob_id, cparsed_template, ctemplate, group_name, child)


def _generate_job_ids2(depends_on, pjob_id,
                       cparsed_template, ctemplate, group_name, child):
    so_far = set()
    autofill_values = get_autofill_values(child, raise_err=False)

    job_id_data = prep_crossproduct(
        cparsed_template, depends_on, autofill_values, pjob_id)

    # Build job_ids using crossproduct of all components
    for job_id_data in crossproduct(job_id_data):
        cjob_id = ctemplate.format(
            dependency_group_name=group_name,
            **dict(zip(cparsed_template, job_id_data)))
        if cjob_id not in so_far:
            so_far.add(cjob_id)
            yield (child, cjob_id)


def prep_crossproduct(cparsed_template, depends_on, autofill_values, pjob_id):
    # Compile a list of lists, where each sublist contains the possible values
    # for a particular job_id component

    job_id_data = []
    for _key in cparsed_template:
        if _key in depends_on:
            # depend on explicitly defined job_id values
            job_id_data.append(depends_on[_key])
        elif _key in autofill_values and \
                pjob_id.get(_key) not in autofill_values[_key]:
                # infer job_id values from autofill_values
            job_id_data.append(
                list(autofill_values[_key]))
        else:
            # inherit job_id
            job_id_data.append([pjob_id[_key]])
    return job_id_data
