#!/usr/bin/env python
# -*- coding: utf-8 -*-
# pylint: disable=no-self-use, pointless-statement, missing-docstring

import pytest
import six

from ..match import Match, Matches
from ..pattern import StringPattern, RePattern


class TestMatchClass(object):
    def test_repr(self):
        match1 = Match(1, 3, value="es")

        assert repr(match1) == '<es:(1, 3)>'

    def test_equality(self):
        match1 = Match(1, 3, value="es")
        match2 = Match(1, 3, value="es")

        other = object()

        assert hash(match1) == hash(match2)
        assert hash(match1) != hash(other)

        assert match1 == match2
        assert not match1 == other

    def test_inequality(self):
        match1 = Match(0, 2, value="te")
        match2 = Match(2, 4, value="st")
        match3 = Match(0, 2, value="other")

        other = object()

        assert hash(match1) != hash(match2)
        assert hash(match1) != hash(match3)

        assert match1 != other
        assert match1 != match2
        assert match1 != match3

    def test_length(self):
        match1 = Match(0, 4, value="test")
        match2 = Match(0, 2, value="spanIsUsed")

        assert len(match1) == 4
        assert len(match2) == 2

    def test_compare(self):
        match1 = Match(0, 2, value="te")
        match2 = Match(2, 4, value="st")

        other = object()

        assert match1 < match2
        assert match1 <= match2

        assert match2 > match1
        assert match2 >= match1

        if six.PY3:
            with pytest.raises(TypeError):
                match1 < other

            with pytest.raises(TypeError):
                match1 <= other

            with pytest.raises(TypeError):
                match1 > other

            with pytest.raises(TypeError):
                match1 >= other
        else:
            assert match1 < other
            assert match1 <= other
            assert not match1 > other
            assert not match1 >= other


class TestMatchesClass(object):
    match1 = Match(0, 2, value="te", name="start")
    match2 = Match(2, 3, value="s", tags="tag1")
    match3 = Match(3, 4, value="t", tags=["tag1", "tag2"])
    match4 = Match(2, 4, value="st", name="end")

    def test_tag(self):
        matches = Matches()
        matches.append(self.match1)
        matches.append(self.match2)
        matches.append(self.match3)
        matches.append(self.match4)

        assert "start" in matches.names
        assert "end" in matches.names

        assert "tag1" in matches.tags
        assert "tag2" in matches.tags

        tag1 = matches.tagged("tag1")
        assert len(tag1) == 2
        assert tag1[0] == self.match2
        assert tag1[1] == self.match3

        tag2 = matches.tagged("tag2")
        assert len(tag2) == 1
        assert tag2[0] == self.match3

        start = matches.named("start")
        assert len(start) == 1
        assert start[0] == self.match1

        end = matches.named("end")
        assert len(end) == 1
        assert end[0] == self.match4

    def test_base(self):
        matches = Matches()
        matches.append(self.match1)

        assert len(matches) == 1
        assert repr(matches) == repr([self.match1])
        assert list(matches.starting(0)) == [self.match1]
        assert list(matches.ending(2)) == [self.match1]

        matches.append(self.match2)
        matches.append(self.match3)
        matches.append(self.match4)

        assert len(matches) == 4
        assert list(matches.starting(2)) == [self.match2, self.match4]
        assert list(matches.starting(3)) == [self.match3]
        assert list(matches.ending(3)) == [self.match2]
        assert list(matches.ending(4)) == [self.match3, self.match4]
        assert list(matches.range()) == [self.match1, self.match2, self.match4, self.match3]
        assert list(matches.range(0)) == [self.match1, self.match2, self.match4, self.match3]
        assert list(matches.range(0, 3)) == [self.match1, self.match2, self.match4]
        assert list(matches.range(2, 3)) == [self.match2, self.match4]
        assert list(matches.range(3, 4)) == [self.match4, self.match3]

        matches.remove(self.match1)
        assert len(matches) == 3
        assert len(matches.starting(0)) == 0
        assert len(matches.ending(2)) == 0

        matches.clear()

        assert len(matches) == 0
        assert len(matches.starting(0)) == 0
        assert len(matches.starting(2)) == 0
        assert len(matches.starting(3)) == 0
        assert len(matches.ending(2)) == 0
        assert len(matches.ending(3)) == 0
        assert len(matches.ending(4)) == 0

    def test_crop(self):
        input_string = "abcdefghijklmnopqrstuvwxyz"

        match1 = Match(1, 10, input_string=input_string)
        match2 = Match(0, 2, input_string=input_string)
        match3 = Match(8, 15, input_string=input_string)

        ret = match1.crop([match2, match3.span])

        assert len(ret) == 1

        assert ret[0].span == (2, 8)
        assert ret[0].value == "cdefgh"

        ret = match1.crop((1, 10))
        assert len(ret) == 0

        ret = match1.crop((1, 3))
        assert len(ret) == 1
        assert ret[0].span == (3, 10)

        ret = match1.crop((7, 10))
        assert len(ret) == 1
        assert ret[0].span == (1, 7)

        ret = match1.crop((0, 12))
        assert len(ret) == 0

        ret = match1.crop((4, 6))
        assert len(ret) == 2

        assert ret[0].span == (1, 4)
        assert ret[1].span == (6, 10)

        ret = match1.crop([(3, 5), (7, 9)])
        assert len(ret) == 3

        assert ret[0].span == (1, 3)
        assert ret[1].span == (5, 7)
        assert ret[2].span == (9, 10)

    def test_holes(self):
        input_string = '1'*10+'2'*10+'3'*10+'4'*10+'5'*10+'6'*10+'7'*10

        hole1 = Match(0, 10, input_string=input_string)
        hole2 = Match(20, 30, input_string=input_string)
        hole3 = Match(30, 40, input_string=input_string)
        hole4 = Match(60, 70, input_string=input_string)

        matches = Matches([hole1, hole2], input_string=input_string)
        matches.append(hole3)
        matches.append(hole4)

        holes = list(matches.holes())
        assert len(holes) == 2
        assert holes[0].span == (10, 20)
        assert holes[0].value == '2'*10
        assert holes[1].span == (40, 60)
        assert holes[1].value == '5' * 10 + '6' * 10

        holes = list(matches.holes(5, 15))
        assert len(holes) == 1
        assert holes[0].span == (10, 15)
        assert holes[0].value == '2'*5

        holes = list(matches.holes(5, 15, formatter=lambda value: "formatted"))
        assert len(holes) == 1
        assert holes[0].span == (10, 15)
        assert holes[0].value == "formatted"

        holes = list(matches.holes(5, 15, predicate=lambda hole: False))
        assert len(holes) == 0

    def test_get_slices(self):
        matches = Matches()
        matches.append(self.match1)
        matches.append(self.match2)
        matches.append(self.match3)
        matches.append(self.match4)

        slice_matches = matches[1:3]

        assert isinstance(slice_matches, Matches)

        assert len(slice_matches) == 2
        assert slice_matches[0] == self.match2
        assert slice_matches[1] == self.match3

    def test_remove_slices(self):
        matches = Matches()
        matches.append(self.match1)
        matches.append(self.match2)
        matches.append(self.match3)
        matches.append(self.match4)

        del matches[1:3]

        assert len(matches) == 2
        assert matches[0] == self.match1
        assert matches[1] == self.match4

    def test_set_slices(self):
        matches = Matches()
        matches.append(self.match1)
        matches.append(self.match2)
        matches.append(self.match3)
        matches.append(self.match4)

        matches[1:3] = self.match1, self.match4

        assert len(matches) == 4
        assert matches[0] == self.match1
        assert matches[1] == self.match1
        assert matches[2] == self.match4
        assert matches[3] == self.match4

    def test_set_index(self):
        matches = Matches()
        matches.append(self.match1)
        matches.append(self.match2)
        matches.append(self.match3)

        matches[1] = self.match4

        assert len(matches) == 3
        assert matches[0] == self.match1
        assert matches[1] == self.match4
        assert matches[2] == self.match3

    def test_constructor(self):
        matches = Matches([self.match1, self.match2, self.match3, self.match4])

        assert len(matches) == 4
        assert list(matches.starting(0)) == [self.match1]
        assert list(matches.ending(2)) == [self.match1]
        assert list(matches.starting(2)) == [self.match2, self.match4]
        assert list(matches.starting(3)) == [self.match3]
        assert list(matches.ending(3)) == [self.match2]
        assert list(matches.ending(4)) == [self.match3, self.match4]

    def test_constructor_kwargs(self):
        matches = Matches([self.match1, self.match2, self.match3, self.match4], input_string="test")

        assert len(matches) == 4
        assert matches.input_string == "test"
        assert list(matches.starting(0)) == [self.match1]
        assert list(matches.ending(2)) == [self.match1]
        assert list(matches.starting(2)) == [self.match2, self.match4]
        assert list(matches.starting(3)) == [self.match3]
        assert list(matches.ending(3)) == [self.match2]
        assert list(matches.ending(4)) == [self.match3, self.match4]


class TestMaches(object):
    def test_filters(self):
        input_string = "One Two Three"

        matches = Matches()

        matches.extend(StringPattern("One", name="1-str", tags=["One", "str"]).matches(input_string))
        matches.extend(RePattern("One", name="1-re", tags=["One", "re"]).matches(input_string))
        matches.extend(StringPattern("Two", name="2-str", tags=["Two", "str"]).matches(input_string))
        matches.extend(RePattern("Two", name="2-re", tags=["Two", "re"]).matches(input_string))
        matches.extend(StringPattern("Three", name="3-str", tags=["Three", "str"]).matches(input_string))
        matches.extend(RePattern("Three", name="3-re", tags=["Three", "re"]).matches(input_string))

        selection = matches.starting(0)
        assert len(selection) == 2

        selection = matches.starting(0, lambda m: "str" in m.tags)
        assert len(selection) == 1
        assert selection[0].pattern.name == "1-str"

        selection = matches.ending(7, predicate=lambda m: "str" in m.tags)
        assert len(selection) == 1
        assert selection[0].pattern.name == "2-str"

        selection = matches.previous(matches.named("2-str")[0])
        assert len(selection) == 2
        assert selection[0].pattern.name == "1-str"
        assert selection[1].pattern.name == "1-re"

        selection = matches.previous(matches.named("2-str", 0), lambda m: "str" in m.tags)
        assert len(selection) == 1
        assert selection[0].pattern.name == "1-str"

        selection = matches.next(matches.named("2-str", 0))
        assert len(selection) == 2
        assert selection[0].pattern.name == "3-str"
        assert selection[1].pattern.name == "3-re"

        selection = matches.next(matches.named("2-str", 0), index=0, predicate=lambda m: "re" in m.tags)
        assert selection is not None
        assert selection.pattern.name == "3-re"

        selection = matches.next(matches.named("2-str", index=0), lambda m: "re" in m.tags)
        assert len(selection) == 1
        assert selection[0].pattern.name == "3-re"

        selection = matches.named("2-str", lambda m: "re" in m.tags)
        assert len(selection) == 0

        selection = matches.named("2-re", lambda m: "re" in m.tags, 0)
        assert selection is not None
        assert selection.name == "2-re"

        selection = matches.named("2-re", lambda m: "re" in m.tags)
        assert len(selection) == 1
        assert selection[0].name == "2-re"

        selection = matches.named("2-re", lambda m: "re" in m.tags, index=1000)
        assert selection is None

    def test_raw(self):
        input_string = "0123456789"

        match = Match(0, 10, input_string=input_string, formatter=lambda s: s*2)

        assert match.value == match.raw * 2
        assert match.raw == input_string

        match.raw_end = 9
        match.raw_start = 1

        assert match.value == match.raw * 2
        assert match.raw == input_string[1:9]

        match.raw_end = None
        match.raw_start = None

        assert match.value == match.raw * 2
        assert match.raw == input_string

    def test_to_dict(self):
        input_string = "One Two Two Three"

        matches = Matches()

        matches.extend(StringPattern("One", name="1", tags=["One", "str"]).matches(input_string))
        matches.extend(RePattern("One", name="1", tags=["One", "re"]).matches(input_string))
        matches.extend(StringPattern("Two", name="2", tags=["Two", "str"]).matches(input_string))
        matches.extend(RePattern("Two", name="2", tags=["Two", "re"]).matches(input_string))
        matches.extend(RePattern("Two", name="2", tags=["Two", "reBis"]).matches(input_string))
        matches.extend(StringPattern("Three", name="3", tags=["Three", "str"]).matches(input_string))
        matches.extend(RePattern("Three", name="3bis", tags=["Three", "re"]).matches(input_string))
        matches.extend(RePattern(r"(\w+)", name="words").matches(input_string))

        kvalues = matches.to_dict()
        assert kvalues == {"1": "One",
                           "2": "Two",
                           "3": "Three",
                           "3bis": "Three",
                           "words": ["One", "Two", "Three"]}

        kvalues = matches.to_dict(details=True)
        assert kvalues["1"].value == "One"

        assert len(kvalues["2"]) == 2
        assert kvalues["2"][0].value == "Two"
        assert kvalues["2"][1].value == "Two"

        assert kvalues["3"].value == "Three"
        assert kvalues["3bis"].value == "Three"

        assert len(kvalues["words"]) == 4
        assert kvalues["words"][0].value == "One"
        assert kvalues["words"][1].value == "Two"
        assert kvalues["words"][2].value == "Two"
        assert kvalues["words"][3].value == "Three"
