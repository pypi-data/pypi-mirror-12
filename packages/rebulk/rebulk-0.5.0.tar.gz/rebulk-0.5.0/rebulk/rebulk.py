#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Entry point functions and classes for Rebulk
"""
from .match import Matches

from .pattern import RePattern, StringPattern, FunctionalPattern

from .processors import conflict_prefer_longer, remove_private
from .loose import call, set_defaults
from .utils import extend_safe
from .rules import Rules

from logging import getLogger
log = getLogger(__name__).log


class Rebulk(object):
    r"""
    Regular expression, string and function based patterns are declared in a ``Rebulk`` object. It use a fluent API to
    chain ``string``, ``regex``, and ``functional`` methods to define various patterns types.

    .. code-block:: python

        >>> from rebulk import Rebulk
        >>> bulk = Rebulk().string('brown').regex(r'qu\w+').functional(lambda s: (20, 25))

    When ``Rebulk`` object is fully configured, you can call ``matches`` method with an input string to retrieve all
    ``Match`` objects found by registered pattern.

    .. code-block:: python

        >>> bulk.matches("The quick brown fox jumps over the lazy dog")
        [<brown:(10, 15)>, <quick:(4, 9)>, <jumps:(20, 25)>]

    If multiple ``Match`` objects are found at the same position, only the longer one is kept.

    .. code-block:: python

        >>> bulk = Rebulk().string('lakers').string('la')
        >>> bulk.matches("the lakers are from la")
        [<lakers:(4, 10)>, <la:(20, 22)>]
    """
    # pylint:disable=protected-access

    def __init__(self, disabled=False, default=True):
        """
        Creates a new Rebulk object.
        :param disabled: if True, this pattern is disabled. Can also be a function(context).
        :type disabled: bool|function
        :param default: use default processors and post_processors
        :type default:
        :return:
        :rtype:
        """
        if not callable(disabled):
            self.disabled = lambda context: disabled
        else:
            self.disabled = disabled
        self._patterns = []
        self._processors = []
        self._post_processors = []
        if default:
            self.processor(*DEFAULT_PROCESSORS)
            self.post_processor(*DEFAULT_POST_PROCESSORS)
        self._rules = Rules()
        self._defaults = {}
        self._regex_defaults = {}
        self._string_defaults = {}
        self._functional_defaults = {}
        self._rebulks = []

    def pattern(self, *pattern):
        """
        Add patterns objects

        :param pattern:
        :type pattern: rebulk.pattern.Pattern
        :return: self
        :rtype: Rebulk
        """
        self._patterns.extend(pattern)
        return self

    def defaults(self, **kwargs):
        """
        Define default keyword arguments for all patterns
        :param kwargs:
        :type kwargs:
        :return:
        :rtype:
        """
        self._defaults = kwargs
        return self

    def regex_defaults(self, **kwargs):
        """
        Define default keyword arguments for functional patterns.
        :param kwargs:
        :type kwargs:
        :return:
        :rtype:
        """
        self._regex_defaults = kwargs
        return self

    def regex(self, *pattern, **kwargs):
        """
        Add re pattern

        :param pattern:
        :type pattern:
        :return: self
        :rtype: Rebulk
        """
        set_defaults(self._regex_defaults, kwargs)
        set_defaults(self._defaults, kwargs)
        self.pattern(RePattern(*pattern, **kwargs))
        return self

    def string_defaults(self, **kwargs):
        """
        Define default keyword arguments for string patterns.
        :param kwargs:
        :type kwargs:
        :return:
        :rtype:
        """
        self._string_defaults = kwargs
        return self

    def string(self, *pattern, **kwargs):
        """
        Add string pattern

        :param pattern:
        :type pattern:
        :return: self
        :rtype: Rebulk
        """
        set_defaults(self._string_defaults, kwargs)
        set_defaults(self._defaults, kwargs)
        self.pattern(StringPattern(*pattern, **kwargs))
        return self

    def functional_defaults(self, **kwargs):
        """
        Define default keyword arguments for functional patterns.
        :param kwargs:
        :type kwargs:
        :return:
        :rtype:
        """
        self._functional_defaults = kwargs
        return self

    def functional(self, *pattern, **kwargs):
        """
        Add functional pattern

        :param pattern:
        :type pattern:
        :return: self
        :rtype: Rebulk
        """
        set_defaults(self._functional_defaults, kwargs)
        set_defaults(self._defaults, kwargs)
        self.pattern(FunctionalPattern(*pattern, **kwargs))
        return self

    def processor(self, *func):
        """
        Add matches processor function.

        Default processors can be found in rebulk.processors module.

        :param func:
        :type func: list[rebulk.match.Match] = function(list[rebulk.match.Match])
        """
        self._processors.extend(func)
        return self

    def post_processor(self, *func):
        """
        Add matches post_processor function.

        Default processors can be found in rebulk.processors module.

        :param func:
        :type func: list[rebulk.match.Match] = function(list[rebulk.match.Match])
        """
        self._post_processors.extend(func)
        return self

    def rules(self, *rules):
        """
        Add rules as a module, class or instance.
        :param rules:
        :type rules: list[Rule]
        :return:
        """
        self._rules.load(*rules)
        return self

    def rebulk(self, *rebulks):
        """
        Add a children rebulk object
        :param rebulks:
        :type rebulks: Rebulk
        :return:
        """
        self._rebulks.extend(rebulks)
        return self

    def matches(self, string, context=None):
        """
        Search for all matches with current configuration against input_string
        :param string: string to search into
        :type string: str
        :param context: context to use
        :type context: dict
        :return: A custom list of matches
        :rtype: Matches
        """
        matches = Matches(input_string=string)
        if context is None:
            context = {}

        self._matches_patterns(matches, context)

        matches = self._execute_processors(matches, context)

        self._execute_rules(matches, context)

        matches = self._execute_post_processors(matches, context)

        return matches

    def _execute_rules(self, matches, context):
        """
        Execute rules for this rebulk and children.
        :param matches:
        :type matches:
        :param context:
        :type context:
        :return:
        :rtype:
        """
        if not self.disabled(context):
            rules = Rules()
            rules.extend(self._rules)
            for rebulk in self._rebulks:
                if not rebulk.disabled(context):
                    extend_safe(rules, rebulk._rules)
            rules.execute_all_rules(matches, context)

    def _execute_processors(self, matches, context):
        """
        Execute processors for this rebulk and children.
        :param matches:
        :type matches:
        :param context:
        :type context:
        :return:
        :rtype:
        """
        if not self.disabled(context):
            processors = list(self._processors)
            for rebulk in self._rebulks:
                if not rebulk.disabled(context):
                    extend_safe(processors, rebulk._processors)
            for func in processors:
                ret = call(func, matches, context)
                if isinstance(ret, Matches):
                    matches = ret
        return matches

    def _execute_post_processors(self, matches, context):
        """
        Execute post processors for this rebulk and children.
        :param matches:
        :type matches:
        :param context:
        :type context:
        :return:
        :rtype:
        """
        if not self.disabled(context):
            post_processors = []
            for rebulk in self._rebulks:
                if not rebulk.disabled(context):
                    extend_safe(post_processors, rebulk._post_processors)
            extend_safe(post_processors, self._post_processors)
            for func in post_processors:
                ret = call(func, matches, context)
                if isinstance(ret, Matches):
                    matches = ret
        return matches

    def _matches_patterns(self, matches, context):
        """
        Search for all matches with current paterns agains input_string
        :param matches: matches list
        :type matches: Matches
        :param context: context to use
        :type context: dict
        :return:
        :rtype:
        """
        if not self.disabled(context):
            for pattern in self._patterns:
                if not pattern.disabled(context):
                    pattern_matches = pattern.matches(matches.input_string, context)
                    if pattern_matches:
                        log(pattern.log_level, "Pattern has %s match(es). (%s)", len(pattern_matches), pattern)
                    else:
                        pass
                        # log(pattern.log_level, "Pattern doesn't match. (%s)" % (pattern,))
                    for match in pattern_matches:
                        if match.marker:
                            log(pattern.log_level, "Marker found. (%s)", match)
                            matches.markers.append(match)
                        else:
                            log(pattern.log_level, "Match found. (%s)", match)
                            matches.append(match)
                else:
                    log(pattern.log_level, "Pattern is disabled. (%s)", pattern)
            for rebulk in self._rebulks:
                rebulk._matches_patterns(matches, context)


DEFAULT_PROCESSORS = [conflict_prefer_longer]
DEFAULT_POST_PROCESSORS = [remove_private]
