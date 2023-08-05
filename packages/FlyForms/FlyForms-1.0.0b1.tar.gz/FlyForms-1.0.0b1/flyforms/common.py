# coding=utf-8
from collections import Iterable, Mapping

from flyforms.compat import string_base


UNSET = object()  # the default mark for not set values

# Supported types for JSON encoding and decoding operations
jsonify_types = (bool, int, float, Iterable, Mapping, string_base)


class FrozenDict(Mapping):
    """
    Immutable dictionary implementation
    Base was copied from StackOverflow_ with some modifications

    .. _StackOverflow: http://stackoverflow.com/questions/2703599/what-would-a-frozen-dict-be
    """

    def __init__(self, *args, **kwargs):
        self._d = dict(*args, **kwargs)
        self._hash = None

    def __iter__(self):
        return iter(self._d)

    def __len__(self):
        return len(self._d)

    def __getitem__(self, key):
        return self._d[key]

    def __hash__(self):
        if self._hash is None:
            self._hash = 0
            for pair in self.iteritems():
                self._hash ^= hash(pair)
        return self._hash

    def __repr__(self):
        return str(self._d)

    def __getattr__(self, item):
        if item in self._d:
            return self._d[item]
        if item == "_hash":
            return self._hash
        raise AttributeError()
