#!/usr/bin/env python
# Copyright (c) 2015 IBM. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""
API module for interacting with result collections.
"""
import json
import types

from collections import Sequence
from .errors import CloudantArgumentError

ARG_TYPES = {
    "descending": bool,
    "endkey": (basestring, Sequence),
    "endkey_docid": basestring,
    "group": bool,
    "group_level": basestring,
    "include_docs": bool,
    "inclusive_end": bool,
    "key": (int, basestring, Sequence),
    "keys": list,
    "limit": (int, types.NoneType),
    "reduce": bool,
    "skip": (int, types.NoneType),
    "stale": basestring,
    "startkey": (basestring, Sequence),
    "startkey_docid": basestring,
}

# pylint: disable=unnecessary-lambda
TYPE_CONVERTERS = {
    basestring: lambda x: json.dumps(x),
    str: lambda x: json.dumps(x),
    unicode: lambda x: json.dumps(x),
    Sequence: lambda x: json.dumps(list(x)),
    list: lambda x: json.dumps(x),
    tuple: lambda x: json.dumps(list(x)),
    int: lambda x: x,
    bool: lambda x: 'true' if x else 'false',
    types.NoneType: lambda x: x
}

def python_to_couch(options):
    """
    Translates query options from python style options into CouchDB/Cloudant
    query options.  For example ``{'include_docs': True}`` will
    translate to ``{'include_docs': 'true'}``.  Primarily meant for use by
    code that formulates a query to retrieve results data from the
    remote database, such as the database API convenience method
    :func:`~cloudant.database.CouchDatabase.all_docs` or the View
    :func:`~cloudant.views.View.__call__` callable, both used to retrieve data.

    :param dict options: Python style parameters to be translated.

    :returns: Dictionary of translated CouchDB/Cloudant query parameters
    """
    translation = {}
    for key, val in options.iteritems():
        if key not in ARG_TYPES:
            msg = 'Invalid argument {0}'.format(key)
            raise CloudantArgumentError(msg)
        if not isinstance(val, ARG_TYPES[key]):
            msg = 'Argument {0} not instance of expected type: {1}'.format(
                key,
                ARG_TYPES[key]
            )
            raise CloudantArgumentError(msg)
        arg_converter = TYPE_CONVERTERS.get(type(val))
        if key == 'stale':
            if val not in ('ok', 'update_after'):
                msg = (
                    'Invalid value for stale option {0} '
                    'must be ok or update_after'
                ).format(val)
                raise CloudantArgumentError(msg)
        try:
            if val is None:
                translation[key] = None
            else:
                translation[key] = arg_converter(val)
        except Exception as ex:
            msg = 'Error converting argument {0}: {1}'.format(key, ex)
            raise CloudantArgumentError(msg)

    return translation

def type_or_none(typerefs, value):
    """
    Provides a helper function to check that a value is of the types passed or 
    None.
    """
    return isinstance(value, typerefs) or value is None

class Result(object):
    """
    Provides a sliceable and iterable interface to result collections.
    A Result object is instantiated with a raw data callable reference
    such as the database API convenience method
    :func:`~cloudant.database.CouchDatabase.all_docs` or the View
    :func:`~cloudant.views.View.__call__` callable, both used to retrieve data.
    A Result object can also use optional extra arguments for result
    customization and supports efficient, paged iteration over the result
    collection to avoid large result data from adversely affecting memory.

    In Python, slicing returns by value, whereas iteration will yield
    elements of the sequence.  This means that slicing will perform better
    for smaller data collections, whereas iteration will be more
    efficient for larger data collections.

    For example:

    .. code-block:: python

        # Access by key:
        result['key'] # get all records matching key

        # Slicing by startkey/endkey:
        result[['2013','10']:['2013','11']] # results between compound keys
        result['2013':'2014'] # results between string keys
        result['2013':] # all results after key
        result[:'2014'] # all results up to key

        # Slicing by value:
        result[100:200] # results between the 100th result and the 200th result
        result[:200]  # results up to the 200th result
        result[100:]  # results after 100th result

        # Iteration:

        # Iterate over the entire result collection
        result = Result(callable)
        for i in result:
            print i

        # Iterate over the result collection between startkey and endkey
        result = Result(callable, startkey='2013', endkey='2014')
        for i in result:
            print i

        # Iterate over the entire result collection,
        # including documents and in batches of a 1000.
        result = Result(callable, include_docs=True, page_size=1000)
        for i in result:
            print i
    """
    def __init__(self, method_ref, **options):
        self.options = options
        self._ref = method_ref
        self._page_size = options.pop("page_size", 100)
        self._valid_args = ARG_TYPES.keys()

    def __getitem__(self, key):
        """
        Provides Result key access and slicing support.

        See :class:`~cloudant.result.Result` for key access and slicing
        examples.

        :param key:  Can be either a single value as a ``str`` or ``list``
            which will be passed as the key to the query for entries matching
            that key or slice.  Slices with integers will be interpreted as
            ``skip:limit-skip`` style pairs.  For example ``[100:200]`` means
            skip 100 records then get next 100 records so that you get the
            range between the supplied slice values.  Slices with strings/lists
            will be interpreted as startkey/endkey style keys.

        :returns: Rows data in JSON format
        """
        if isinstance(key, basestring):
            data = self._ref(key=key, **self.options)
            return data['rows']

        if isinstance(key, list):
            data = self._ref(key=key, **self.options)
            return data['rows']

        if isinstance(key, slice):
            # slice is startkey and endkey if str or array
            str_or_none_start = type_or_none((basestring, list), key.start)
            str_or_none_stop = type_or_none((basestring, list), key.stop)
            if str_or_none_start and str_or_none_stop:
                # startkey/endkey
                if key.start is not None and key.stop is not None:
                    data = self._ref(
                        startkey=key.start,
                        endkey=key.stop,
                        **self.options
                    )
                if key.start is not None and key.stop is None:
                    data = self._ref(startkey=key.start, **self.options)
                if key.start is None and key.stop is not None:
                    data = self._ref(endkey=key.stop, **self.options)
                if key.start is None and key.stop is None:
                    data = self._ref(**self.options)
                return data['rows']
            # slice is skip:skip+limit if ints
            int_or_none_start = type_or_none(int, key.start)
            int_or_none_stop = type_or_none(int, key.stop)
            if int_or_none_start and int_or_none_stop:
                if key.start is not None and key.stop is not None:
                    limit = key.stop - key.start
                    data = self._ref(
                        skip=key.start,
                        limit=limit,
                        **self.options
                    )
                if key.start is not None and key.stop is None:
                    data = self._ref(skip=key.start, **self.options)
                if key.start is None and key.stop is not None:
                    data = self._ref(limit=key.stop, **self.options)
                # both None case handled above
                return data['rows']
        msg = (
            'Failed to interpret the argument {0} passed to '
            'Result.__getitem__ as a key value or as a slice'
        ).format(key)
        raise CloudantArgumentError(msg)

    def __iter__(self):
        """
        Provides iteration support, primarily for large data collections.
        The iterator uses the skip/limit parameters to consume data in chunks
        controlled by the ``page_size`` setting and retrieves a batch of data
        from the result collection and then yields each element.  Since the
        iterator uses the skip/limit parameters to perform the iteration,
        ``skip`` and ``limit`` cannot be included as part of the original result
        customization options.

        See :func:`~cloudant.views.View.make_result` for a list of valid
        result customization options.

        See :class:`~cloudant.result.Result` for Result iteration examples.

        :returns: Iterable rows data sequence
        """
        if 'skip' in self.options:
            msg = 'Cannot use skip for iteration'
            raise CloudantArgumentError(msg)
        if 'limit' in self.options:
            msg = 'Cannot use limit for iteration'
            raise CloudantArgumentError(msg)

        skip = 0
        while True:
            response = self._ref(
                limit=self._page_size,
                skip=skip,
                **self.options
            )
            result = response.get('rows', [])
            skip = skip + self._page_size
            if len(result) > 0:
                for row in result:
                    yield row
                del result
            else:
                break
