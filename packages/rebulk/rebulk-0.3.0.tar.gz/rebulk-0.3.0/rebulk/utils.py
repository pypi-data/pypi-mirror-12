#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Various utilities functions
"""
from types import GeneratorType


def find_all(string, sub, start=None, end=None, ignore_case=False):
    """
    Return all indices in string s where substring sub is
    found, such that sub is contained in the slice s[start:end].

    >>> list(find_all('The quick brown fox jumps over the lazy dog', 'fox'))
    [16]

    >>> list(find_all('The quick brown fox jumps over the lazy dog', 'mountain'))
    []

    >>> list(find_all('The quick brown fox jumps over the lazy dog', 'The'))
    [0]

    >>> list(find_all(
    ... 'Carved symbols in a mountain hollow on the bank of an inlet irritated an eccentric person',
    ... 'an'))
    [44, 51, 70]

    >>> list(find_all(
    ... 'Carved symbols in a mountain hollow on the bank of an inlet irritated an eccentric person',
    ... 'an',
    ... 50,
    ... 60))
    [51]

    :param string: the input string
    :type string: str
    :param sub: the substring
    :type sub: str
    :return: all indices in the input string
    :rtype: __generator[str]
    """
    if ignore_case:
        sub = sub.lower()
        string = string.lower()
    while True:
        start = string.find(sub, start, end)
        if start == -1:
            return
        yield start
        start += len(sub)


def is_iterable(obj):
    """
    Are we being asked to look up a list of things, instead of a single thing?
    We check for the `__iter__` attribute so that this can cover types that
    don't have to be known by this module, such as NumPy arrays.

    Strings, however, should be considered as atomic values to look up, not
    iterables.

    We don't need to check for the Python 2 `unicode` type, because it doesn't
    have an `__iter__` attribute anyway.
    """
    return hasattr(obj, '__iter__') and not isinstance(obj, str) or isinstance(obj, GeneratorType)


def extend_safe(target, source):
    """
    Extends source list to target list only if elements doesn't exists in target list.
    :param target:
    :type target: list
    :param source:
    :type source: list
    """
    for elt in source:
        if elt not in target:
            target.append(elt)
