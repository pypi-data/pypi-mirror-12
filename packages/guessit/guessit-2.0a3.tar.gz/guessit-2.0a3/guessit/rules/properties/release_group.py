#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
release_group property
"""
from __future__ import unicode_literals

import copy

from guessit.rules.common.validators import int_coercable
from guessit.rules.properties.title import TitleFromPosition
from rebulk import Rebulk, Rule, AppendMatch
from ..common.formatters import cleanup
from ..common import seps
from ..common.comparators import marker_sorted


def release_group():
    """
    Builder for rebulk object.
    :return: Created Rebulk object
    :rtype: Rebulk
    """
    return Rebulk().rules(SceneReleaseGroup, AnimeReleaseGroup)


forbidden_groupnames = ['rip', 'by', 'for', 'par', 'pour', 'bonus']

groupname_seps = ''.join([c for c in seps if c not in '[]{}()'])


def clean_groupname(string):
    """
    Removes and strip separators from input_string
    :param input_string:
    :type input_string:
    :return:
    :rtype:
    """
    string = string.strip(groupname_seps)
    for forbidden in forbidden_groupnames:
        if string.lower().startswith(forbidden):
            string = string[len(forbidden):]
            string = string.strip(groupname_seps)
        if string.lower().endswith(forbidden):
            string = string[:len(forbidden)]
            string = string.strip(groupname_seps)
    return string


_scene_previous_names = ['video_codec', 'format', 'video_api', 'audio_codec', 'audio_profile', 'video_profile',
                         'audio_channels', 'screen_size']

_scene_previous_tags = ['release-group-prefix']


class SceneReleaseGroup(Rule):
    """
    Add release_group match in existing matches (scene format).

    Something.XViD-ReleaseGroup.mkv
    """
    dependency = TitleFromPosition
    consequence = AppendMatch

    def when(self, matches, context):
        ret = []

        for filepart in marker_sorted(matches.markers.named('path'), matches):
            start, end = filepart.span

            last_hole = matches.holes(start, end + 1, formatter=clean_groupname,
                                      predicate=lambda hole: cleanup(hole.value), index=-1)

            if last_hole:
                previous_match = matches.previous(last_hole, index=0)
                if previous_match and (previous_match.name in _scene_previous_names or
                                       any(tag in previous_match.tags for tag in _scene_previous_tags)) and \
                        not matches.input_string[previous_match.end:last_hole.start].strip(seps) \
                        and not int_coercable(last_hole.value.strip(seps)):

                    last_hole.name = 'release_group'
                    last_hole.tags = ['scene']

                    # if hole is insed a group marker with same value, remove [](){} ...
                    group = matches.markers.at_match(last_hole, lambda marker: marker.name == 'group', 0)
                    if group:
                        group.formatter = clean_groupname
                        if group.value == last_hole.value:
                            last_hole.start = group.start + 1
                            last_hole.end = group.end - 1
                            last_hole.tags = ['anime']

                    ret.append(last_hole)
        return ret


class AnimeReleaseGroup(Rule):
    """
    Add release_group match in existing matches (anime format)
    ...[ReleaseGroup] Something.mkv
    """
    dependency = [SceneReleaseGroup, TitleFromPosition]
    consequence = AppendMatch

    def when(self, matches, context):
        ret = []

        # If a scene release_group is found, ignore this kind of release_group rule.
        if matches.named('release_group'):
            return ret

        for filepart in marker_sorted(matches.markers.named('path'), matches):

            # pylint:disable=bad-continuation
            empty_group_marker = matches.markers \
                .range(filepart.start, filepart.end, lambda marker: marker.name == 'group'
                                                                    and not matches.range(marker.start, marker.end)
                                                                    and not int_coercable(marker.value.strip(seps)),
                       0)

            if empty_group_marker:
                group = copy.copy(empty_group_marker)
                group.marker = False
                group.raw_start += 1
                group.raw_end -= 1
                group.tags = ['anime']
                group.name = 'release_group'
                ret.append(group)
        return ret
