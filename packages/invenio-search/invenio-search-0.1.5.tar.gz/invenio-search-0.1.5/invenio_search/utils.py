# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2014, 2015 CERN.
#
# Invenio is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# Invenio is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Invenio; if not, write to the Free Software Foundation, Inc.,
# 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.

"""Utility functions for search engine."""

import functools

import six

from flask import g
from intbitset import intbitset
from six import iteritems, string_types
from werkzeug.utils import import_string

from invenio_base.globals import cfg


def get_most_popular_field_values(recids, tags, exclude_values=None,
                                  count_repetitive_values=True, split_by=0):
    """Analyze RECIDS and look for TAGS and return most popular values.

    Optionally return the frequency with which they occur sorted according to
    descending frequency.

    If a value is found in EXCLUDE_VALUES, then do not count it.

    If COUNT_REPETITIVE_VALUES is True, then we count every occurrence
    of value in the tags.  If False, then we count the value only once
    regardless of the number of times it may appear in a record.
    (But, if the same value occurs in another record, we count it, of
    course.)

    Example:

    .. code-block:: python

        >>> get_most_popular_field_values(range(11,20), '980__a')
        [('PREPRINT', 10), ('THESIS', 7), ...]
        >>> get_most_popular_field_values(range(11,20), ('100__a', '700__a'))
        [('Ellis, J', 10), ('Ellis, N', 7), ...]
        >>> get_most_popular_field_values(range(11,20), ('100__a', '700__a'),
        ... ('Ellis, J'))
        [('Ellis, N', 7), ...]

    :return: list of tuples containing tag and its frequency
    """
    from invenio.legacy.bibrecord import get_fieldvalues

    valuefreqdict = {}
    # sanity check:
    if not exclude_values:
        exclude_values = []
    if isinstance(tags, string_types):
        tags = (tags,)
    # find values to count:
    vals_to_count = []
    displaytmp = {}
    if count_repetitive_values:
        # counting technique A: can look up many records at once: (very fast)
        for tag in tags:
            vals_to_count.extend(get_fieldvalues(recids, tag, sort=False,
                                                 split_by=split_by))
    else:
        # counting technique B: must count record-by-record: (slow)
        for recid in recids:
            vals_in_rec = []
            for tag in tags:
                for val in get_fieldvalues(recid, tag, False):
                    vals_in_rec.append(val)
            # do not count repetitive values within this record
            # (even across various tags, so need to unify again):
            dtmp = {}
            for val in vals_in_rec:
                dtmp[val.lower()] = 1
                displaytmp[val.lower()] = val
            vals_in_rec = dtmp.keys()
            vals_to_count.extend(vals_in_rec)
    # are we to exclude some of found values?
    for val in vals_to_count:
        if val not in exclude_values:
            if val in valuefreqdict:
                valuefreqdict[val] += 1
            else:
                valuefreqdict[val] = 1
    # sort by descending frequency of values:
    f = []   # frequencies
    n = []   # original names
    ln = []  # lowercased names
    # build lists within one iteration
    for (val, freq) in iteritems(valuefreqdict):
        f.append(-1 * freq)
        if val in displaytmp:
            n.append(displaytmp[val])
        else:
            n.append(val)
        ln.append(val.lower())
    # sort by frequency (desc) and then by lowercased name.
    try:
        import numpy
        indices = numpy.lexsort([ln, f])
    except ImportError:
        def _cmp(a, b):
            if f[a] == f[b]:
                return ln[a] - ln[b]
            else:
                return f[a] - f[b]
        indices = sorted(
            range(min(len(ln), len(f))),
            cmp=_cmp
        )
    return [(n[i], -1 * f[i]) for i in indices]


def get_permitted_restricted_collections(user_info,
                                         recreate_cache_if_needed=True):
    """Return a list of restricted collection with user is authorization."""
    from invenio_access.engine import acc_authorize_action
    from invenio_collections.cache import (
        restricted_collection_cache,
    )

    if recreate_cache_if_needed:
        restricted_collection_cache.recreate_cache_if_needed()
    ret = []

    auths = acc_authorize_action(
        user_info,
        'viewrestrcoll',
        batch_args=True,
        collection=restricted_collection_cache.cache
    )

    for collection, auth in zip(restricted_collection_cache.cache, auths):
        if auth[0] == 0:
            ret.append(collection)
    return ret


def g_memoise(method=None, key=None):
    """Memoise method results on application context."""
    if method is None:
        return functools.partial(g_memoise, key=key)

    key = key or method.__name__

    @functools.wraps(method)
    def decorator(*args, **kwargs):
        results = getattr(g, key, None)
        if results is None:
            results = method(*args, **kwargs)
            setattr(g, key, results)
        return results
    return decorator


@g_memoise
def query_enhancers():
    """Return list of query enhancers."""
    functions = []
    for enhancer in cfg['SEARCH_QUERY_ENHANCERS']:
        if isinstance(enhancer, six.string_types):
            enhancer = import_string(enhancer)
            functions.append(enhancer)
    return functions


@g_memoise
def parser():
    """Return search query parser."""
    query_parser = cfg['SEARCH_QUERY_PARSER']
    if isinstance(query_parser, six.string_types):
        query_parser = import_string(query_parser)
    return query_parser


@g_memoise
def query_walkers():
    """Return query walker instances."""
    return [
        import_string(walker)() if isinstance(walker, six.string_types)
        else walker() for walker in cfg['SEARCH_QUERY_WALKERS']
    ]


@g_memoise
def search_walkers():
    """Return in search walker instances."""
    return [
        import_string(walker)() if isinstance(walker, six.string_types)
        else walker() for walker in cfg['SEARCH_WALKERS']
    ]
