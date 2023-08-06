#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Copyright 2014 True Blade Systems, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Original:
#   - https://bitbucket.org/ericvsmith/toposort (1.4)
# Modifications:
#   - port to pytest
# pylint: skip-file

import pytest
from ..toposort import toposort, toposort_flatten, CyclicDependency


class TestCase(object):
    def test_simple(self):
        results = list(toposort({2: {11}, 9: {11, 8}, 10: {11, 3}, 11: {7, 5}, 8: {7, 3}}))
        expected = [{3, 5, 7}, {8, 11}, {2, 9, 10}]
        assert results == expected

        # make sure self dependencies are ignored
        results = list(toposort({2: {2, 11}, 9: {11, 8}, 10: {10, 11, 3}, 11: {7, 5}, 8: {7, 3}}))
        expected = [{3, 5, 7}, {8, 11}, {2, 9, 10}]
        assert results == expected

        assert list(toposort({1: set()})) == [{1}]
        assert list(toposort({1: {1}})) == [{1}]

    def test_no_dependencies(self):
        assert list(toposort({1: {2}, 3: {4}, 5: {6}})) == [{2, 4, 6}, {1, 3, 5}]
        assert list(toposort({1: set(), 3: set(), 5: set()})) == [{1, 3, 5}]

    def test_empty(self):
        assert list(toposort({})) == []

    def test_strings(self):
        results = list(toposort({'2': {'11'}, '9': {'11', '8'}, '10': {'11', '3'}, '11': {'7', '5'}, '8': {'7', '3'}}))
        expected = [{'3', '5', '7'}, {'8', '11'}, {'2', '9', '10'}]
        assert results == expected

    def test_objects(self):
        o2 = object()
        o3 = object()
        o5 = object()
        o7 = object()
        o8 = object()
        o9 = object()
        o10 = object()
        o11 = object()
        results = list(toposort({o2: {o11}, o9: {o11, o8}, o10: {o11, o3}, o11: {o7, o5}, o8: {o7, o3, o8}}))
        expected = [{o3, o5, o7}, {o8, o11}, {o2, o9, o10}]
        assert results == expected

    def test_cycle(self):
        # a simple, 2 element cycle
        with pytest.raises(CyclicDependency):
            list(toposort({1: {2}, 2: {1}}))

        # an indirect cycle
        with pytest.raises(CyclicDependency):
            list(toposort({1: {2}, 2: {3}, 3: {1}}))

    def test_input_not_modified(self):
        data = {2: {11},
                9: {11, 8},
                10: {11, 3},
                11: {7, 5},
                8: {7, 3, 8},  # includes something self-referential
                }
        orig = data.copy()
        results = list(toposort(data))
        assert data == orig

    def test_input_not_modified_when_cycle_error(self):
        data = {1: {2},
                2: {1},
                3: {4},
                }
        orig = data.copy()
        with pytest.raises(CyclicDependency):
            list(toposort(data))
        assert data == orig


class TestCaseAll(object):
    def test_sort_flatten(self):
        data = {2: {11},
                9: {11, 8},
                10: {11, 3},
                11: {7, 5},
                8: {7, 3, 8},  # includes something self-referential
                }
        expected = [{3, 5, 7}, {8, 11}, {2, 9, 10}]
        assert list(toposort(data)) == expected

        # now check the sorted results
        results = []
        for item in expected:
            results.extend(sorted(item))
        assert toposort_flatten(data) == results

        # and the unsorted results. break the results up into groups to compare them
        actual = toposort_flatten(data, False)
        results = [{i for i in actual[0:3]}, {i for i in actual[3:5]}, {i for i in actual[5:8]}]
        assert results == expected
