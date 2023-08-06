#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Title
"""
from __future__ import unicode_literals

from guessit.rules.properties.film import FilmTitleRule
from guessit.rules.properties.language import SubtitlePrefixLanguageRule, SubtitleSuffixLanguageRule, \
    SubtitleExtensionRule
from rebulk import Rebulk, Rule, AppendMatch, RemoveMatch
from rebulk.formatters import formatters

from ..common.formatters import cleanup, reorder_title
from ..common.comparators import marker_sorted
from ..common import seps, title_seps
from rebulk.utils import find_all


class TitleBaseRule(Rule):
    """
    Add title match in existing matches
    """
    #pylint:disable=no-self-use,unused-argument
    consequence = [AppendMatch, RemoveMatch]

    def __init__(self, match_name, match_tags=None, alternative_match_name=None):
        super(TitleBaseRule, self).__init__()
        self.match_name = match_name
        self.match_tags = match_tags
        self.alternative_match_name = alternative_match_name

    def hole_filter(self, hole, matches):
        """
        Filter holes for titles.
        :param hole:
        :type hole:
        :param matches:
        :type matches:
        :return:
        :rtype:
        """
        return True

    def filepart_filter(self, filepart, matches):
        """
        Filter filepart for titles.
        :param filepart:
        :type filepart:
        :param matches:
        :type matches:
        :return:
        :rtype:
        """
        return True

    def holes_process(self, holes, matches):
        """
        process holes
        :param holes:
        :type holes:
        :param matches:
        :type matches:
        :return:
        :rtype:
        """
        cropped_holes = []
        for hole in holes:
            group_markers = matches.markers.named('group')
            cropped_holes.extend(hole.crop(group_markers))
        return cropped_holes

    def is_ignored(self, match):
        """
        Ignore matches when scanning for title (hole)
        """
        return match.name in ['language', 'country', 'episode_details']

    def should_keep(self, match, to_keep, matches, filepart, hole, starting):
        """
        Check if this match should be accepted when ending or starting a hole.
        :param match:
        :type match:
        :param to_keep:
        :type to_keep: list[Match]
        :param matches:
        :type matches: Matches
        :param hole: the filepart match
        :type hole: Match
        :param hole: the hole match
        :type hole: Match
        :param starting: true if match is starting the hole
        :type starting: bool
        :return:
        :rtype:
        """
        # Keep language if other languages exists in the filepart.
        if match.name in ['language', 'country']:
            outside_matches = filepart.crop(hole)
            other_languages = []
            for outside in outside_matches:
                other_languages.extend(matches.range(outside.start, outside.end,
                                                     lambda c_match: c_match.name == match.name and
                                                     c_match not in to_keep))

            if not other_languages:
                return True

        return False

    def should_remove(self, match, matches, filepart, hole):
        """
        Check if this match should be removed after beeing ignored.
        :param match:
        :param matches:
        :param filepart:
        :param hole:
        :return:
        """
        return True

    def check_titles_in_filepart(self, filepart, matches):
        """
        Find title in filepart (ignoring language)
        """
        # pylint:disable=too-many-locals,too-many-branches,too-many-statements
        start, end = filepart.span

        holes = matches.holes(start, end + 1, formatter=formatters(cleanup, reorder_title),
                              ignore=self.is_ignored,
                              predicate=lambda hole: hole.value)

        holes = self.holes_process(holes, matches)

        for hole in holes:
            # pylint:disable=cell-var-from-loop
            if not hole or (self.hole_filter and not self.hole_filter(hole, matches)):
                continue

            to_remove = []
            to_keep = []

            ignored_matches = matches.range(hole.start, hole.end, self.is_ignored)

            if ignored_matches:
                for ignored_match in reversed(ignored_matches):
                    # pylint:disable=undefined-loop-variable
                    trailing = matches.chain_before(hole.end, seps, predicate=lambda match: match == ignored_match)
                    if trailing:
                        should_keep = self.should_keep(ignored_match, to_keep, matches, filepart, hole, False)
                        if should_keep:
                            # pylint:disable=unpacking-non-sequence
                            try:
                                append, crop = should_keep
                            except TypeError:
                                append, crop = should_keep, should_keep
                            if append:
                                to_keep.append(ignored_match)
                            if crop:
                                hole.end = ignored_match.start

                for ignored_match in ignored_matches:
                    if ignored_match not in to_keep:
                        starting = matches.chain_after(hole.start, seps, predicate=lambda match: match == ignored_match)
                        if starting:
                            should_keep = self.should_keep(ignored_match, to_keep, matches, filepart, hole, True)
                            if should_keep:
                                # pylint:disable=unpacking-non-sequence
                                try:
                                    append, crop = should_keep
                                except TypeError:
                                    append, crop = should_keep, should_keep
                                if append:
                                    to_keep.append(ignored_match)
                                if crop:
                                    hole.start = ignored_match.end

            for match in ignored_matches:
                if self.should_remove(match, matches, filepart, hole):
                    to_remove.append(match)
            for keep_match in to_keep:
                to_remove.remove(keep_match)

            if hole and hole.value:
                hole.name = self.match_name
                hole.tags = self.match_tags
                if self.alternative_match_name:
                    # Split and keep values that can be a title
                    titles = hole.split(title_seps, lambda match: match.value)
                    for title in list(titles[1:]):
                        previous_title = titles[titles.index(title) - 1]
                        separator = matches.input_string[previous_title.end:title.start]
                        if len(separator) == 1 and '-' == separator \
                                and previous_title.raw[-1] not in seps \
                                and title.raw[0] not in seps:
                            titles[titles.index(title) - 1].end = title.end
                            titles.remove(title)
                        else:
                            title.name = self.alternative_match_name

                else:
                    titles = [hole]
                return titles, to_remove

    def when(self, matches, context):
        fileparts = [filepart for filepart in list(marker_sorted(matches.markers.named('path'), matches))
                     if not self.filepart_filter or self.filepart_filter(filepart, matches)]

        to_remove = []

        # Priorize fileparts containing the year
        years_fileparts = []
        for filepart in fileparts:
            year_match = matches.range(filepart.start, filepart.end, lambda match: match.name == 'year', 0)
            if year_match:
                years_fileparts.append(filepart)

        ret = []
        for filepart in fileparts:
            try:
                years_fileparts.remove(filepart)
            except ValueError:
                pass
            titles = self.check_titles_in_filepart(filepart, matches)
            if titles:
                titles, to_remove_c = titles
                ret.extend(titles)
                to_remove.extend(to_remove_c)
                break

        # Add title match in all fileparts containing the year.
        for filepart in years_fileparts:
            titles = self.check_titles_in_filepart(filepart, matches)
            if titles:
                # pylint:disable=unbalanced-tuple-unpacking
                titles, to_remove_c = titles
                ret.extend(titles)
                to_remove.extend(to_remove_c)

        return ret, to_remove


class TitleFromPosition(TitleBaseRule):
    """
    Add title match in existing matches
    """
    dependency = [FilmTitleRule, SubtitlePrefixLanguageRule, SubtitleSuffixLanguageRule, SubtitleExtensionRule]

    def __init__(self):
        super(TitleFromPosition, self).__init__('title', ['title'], 'alternativeTitle')

    def enabled(self, context):
        return not context.get('expected_title')


class PreferTitleWithYear(Rule):
    """
    Prefer title where filepart contains year.
    """
    dependency = TitleFromPosition
    consequence = RemoveMatch

    def enabled(self, context):
        return not context.get('expected_title')

    def when(self, matches, context):
        with_year_in_group = []
        with_year = []
        titles = matches.named('title')

        for title in titles:
            filepart = matches.markers.at_match(title, lambda marker: marker.name == 'path', 0)
            if filepart:
                year_match = matches.range(filepart.start, filepart.end, lambda match: match.name == 'year', 0)
                if year_match:
                    group = matches.markers.at_match(year_match, lambda group: group.name == 'group')
                    if group:
                        with_year_in_group.append(title)
                    else:
                        with_year.append(title)

        if with_year_in_group:
            title_values = set([title.value for title in with_year_in_group])
        elif with_year:
            title_values = set([title.value for title in with_year])
        else:
            title_values = set([title.value for title in titles])

        to_remove = []
        for title in titles:
            if title.value not in title_values:
                to_remove.append(title)
        return to_remove


TITLE = Rebulk().rules(TitleFromPosition, PreferTitleWithYear)


def expected_title(input_string, context):
    """
    Expected title functional pattern.
    :param input_string:
    :type input_string:
    :param context:
    :type context:
    :return:
    :rtype:
    """
    for search in context.get('expected_title'):
        for start in find_all(input_string, search, ignore_case=True):
            return start, len(search)

TITLE.functional(expected_title, name='title', disabled=lambda context: not context.get('expected_title'))
