# Copyright © 2013-2015 Andrew Wilcox and Elizabeth Myers.
# All rights reserved.
# This file is part of the PyIRC 3 project. See LICENSE in the root directory
# for licensing information.


"""Track channels that we have joined and their associated data.

This data includes ops, modes, the topic, and associated data.

"""


from time import time
from functools import partial
from logging import getLogger


from PyIRC.signal import event
from PyIRC.casemapping import IRCDict, IRCDefaultDict
from PyIRC.extensions import BaseExtension
from PyIRC.line import Hostmask
from PyIRC.numerics import Numerics


_logger = getLogger(__name__)  # pylint: disable=invalid-name


class Channel:

    """A channel entity."""

    def __init__(self, case, name, **kwargs):
        """Store the data for a channel.

        Unknown values are stored as None, whereas empty ones are stored as
        '' or 0, so take care in comparisons involving values from this class.

        :key name:
            Name of the channel, not casemapped.

        :key topic:
            The channel topic.

        :key topictime:
            Time the channel topic was set, in Unix time.

        :key topicwho:
            Who set the topic, as a freeform string.

        :key users:
            A mapping containing user to their channel status modes.

        :key timestamp:
            Timestamp of the channel (channel creation), in Unix time.

        :key url:
            URL of the channel, sent on some IRC servers.

        """
        if name is None:
            raise ValueError("name must not be None")
        self.name = name

        self.modes = kwargs.get("modes", dict())
        self.topic = kwargs.get("topic", None)
        self.topictime = kwargs.get("topictime", None)
        self.topicwho = kwargs.get("topicwho", None)
        self.timestamp = kwargs.get("timestamp", None)
        self.url = kwargs.get("url", None)
        self.users = kwargs.get("users", IRCDefaultDict(case, set))

    def __repr__(self):
        keys = ("name", "modes", "topic", "topictime", "topicwho", "timestamp",
                "url", "users")

        # key={0.key!r}
        rep = ["{0}={{0.{0}!r}}".format(k) for k in keys]

        # Final format
        rep = "Channel({})".format(", ".join(rep))
        return rep.format(self)


class ChannelTrack(BaseExtension):

    """Tracks channels and the users on the channels.

    Only the user's casemapped nicks are stored, as well as their statuses.
    They are stored casemapped to make it easier to look them up in other
    extensions.

    This extension adds ``base.channel_track`` as itself as an alias for
    ``get_extension("ChannelTrack").``.

    channels
        Mapping of channels, where the keys are casemapped channel names, and
        the values are Channel instances.

    For more elaborate user tracking, see
    :py:module:`~PyIRC.extensions.usertrack`.

    """

    requires = ["BaseTrack", "BasicRFC", "ISupport"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Convenience method
        self.base.channel_track = self

        # Our channel set
        self.channels = IRCDict(self.case)

        # Scheduled items
        self.mode_timers = IRCDict(self.case)

    def get_channel(self, name):
        """Retrieve a channel from the tracking dictionary based on name.

        Use of this method is preferred to directly accessing the channels
        dictionary.

        Returns None if channel not found.

        Arguments:

        :param name:
            Name of the channel to retrieve.

        """

        return self.channels.get(name)

    def add_channel(self, name, **kwargs):
        """Add a channel to the tracking dictionary.

        Avoid using this method directly unless you know what you are
        doing.

        """
        channel = self.get_channel(name)
        if channel is None:
            _logger.debug("Adding channel: %s", name)

            channel = Channel(self.case, name, **kwargs)
            self.channels[name] = channel

        self.call_event("channel", "channel_create", channel)

        return channel

    def remove_channel(self, name):
        """Remove a channel from the tracking dictionary.

        Avoid using this method directly unless you know what you are
        doing.

        """

        channel = self.get_channel(name)
        if channel is None:
            return

        self.call_event("channel", "channel_delete", channel)

        del self.channels[name]

    @event("protocol", "case_change")
    def case_change(self, _):
        self.channels = self.channels.convert(self.case)
        self.mode_timers = self.mode_timers.convert(self.case)

    @event("link", "disconnected")
    def close(self, _):
        self.channels.clear()
        for timer in self.mode_timers.values():
            try:
                self.unschedule(timer)
            except ValueError:
                pass

    @event("modes", "mode_prefix")
    def prefix(self, _, setter, target, mode):
        # Parse into hostmask in case of usernames-in-host
        channel = self.get_channel(target)
        if channel is None:
            _logger.warning("Got a PREFIX event for an unknown channel: %s",
                            target)
            return

        hostmask = Hostmask.parse(mode.param)
        if mode.adding:
            channel.users[hostmask.nick].add(mode.mode)
        else:
            channel.users[hostmask.nick].discard(mode.mode)

    @event("modes", "mode_key")
    @event("modes", "mode_param")
    @event("modes", "mode_normal")
    def modes(self, _, setter, target, mode):
        """Update a channel's modes."""
        channel = self.get_channel(target)
        if channel is None:
            return

        if mode.adding:
            channel.modes[mode.mode] = mode.param
        else:
            channel.modes.pop(mode.mode, None)

    @event("scope", "user_join")
    def join(self, caller, scope):
        """Handle a user (possibly us) joining a channel."""
        # JOIN event
        basicrfc = self.base.basic_rfc
        if self.casecmp(scope.target.nick, basicrfc.nick):
            # We're joining
            self.add_channel(scope.scope)

        self.burst(caller, scope)

    @event("scope", "user_burst")
    def burst(self, _, scope):
        """Add the users being bursted to the channel."""
        # NAMES event
        channel = self.get_channel(scope.scope)
        if channel is None:
            return

        user = scope.target.nick

        if user not in channel.users:
            channel.users[user] = set()

        modes = {m[0] for m in scope.modes} if scope.modes else set()
        channel.users[user] = modes

    @event("scope", "user_part")
    @event("scope", "user_kick")
    def part(self, _, scope):
        """Remove a user from a channel."""
        channel = self.get_channel(scope.scope)
        assert channel

        user = scope.target.nick

        basicrfc = self.base.basic_rfc
        if self.casecmp(user, basicrfc.nick):
            # We are leaving
            self.remove_channel(channel.name)
            timer = self.mode_timers.pop(channel.name, None)
            if timer is not None:
                try:
                    self.unschedule(timer)
                except ValueError:
                    pass
            return

        _logger.debug("users before deletion: %r", channel.users)

        del channel.users[user]

    @event("scope", "user_quit")
    def quit(self, _, scope):
        """Remove a user from all the channels which they were joined."""
        user = scope.target.nick

        for channel in self.channels.values():
            channel.users.pop(user, None)

    @event("commands", Numerics.RPL_TOPIC)
    @event("commands", "TOPIC")
    def topic(self, _, line):
        """Update a channel's topic."""
        if line.command.lower() == "topic":
            channel = self.get_channel(line.params[0])
            if channel is None:
                _logger.debug("Topic for unknown channel: {}".format(
                    line.params[0]))
                return

            # TODO server/local time deltas for more accurate timestamps
            channel.topicwho = line.hostmask
            channel.topictime = int(time())
        else:
            channel = self.get_channel(line.params[1])
            if channel is None:
                _logger.debug("RPL_TOPIC for unknown channel: {}".format(
                    line.params[1]))
                return

        channel.topic = line.params[-1]

    @event("commands", Numerics.RPL_NOTOPIC)
    def no_topic(self, _, line):
        """Update the fact that a channel has no topic."""
        channel = self.get_channel(line.params[1])
        if channel is None:
            _logger.debug("RPL_NOTOPIC for unknown channel: {}".format(
                line.params[1]))
            return

        channel.topic = ''

    @event("commands", Numerics.RPL_TOPICWHOTIME)
    def topic_who_time(self, _, line):
        """Update the channel's topic metadata."""
        channel = self.get_channel(line.params[1])
        if channel is None:
            _logger.debug("Topic time for unknown channel: {}".format(
                line.params[1]))
            return

        channel.topicwho = Hostmask.parse(line.params[2])
        channel.topictime = int(line.params[3])

    @event("commands", Numerics.RPL_CHANNELURL)
    def url(self, _, line):
        """Update the channel's URL."""
        channel = self.get_channel(line.params[1])
        if channel is None:
            _logger.debug("URL for unknown channel: {}".format(
                line.params[1]))
            return

        channel.url = line.params[-1]

    @event("commands", Numerics.RPL_CREATIONTIME)
    def timestamp(self, _, line):
        """Update the channel's creation time."""
        channel = self.get_channel(line.params[1])
        if channel is None:
            _logger.debug("Creation time for unknown channel: {}".format(
                line.params[1]))
            return

        channel.timestamp = int(line.params[-1])

        # Cancel
        timer = self.mode_timers.pop(channel.name, None)
        if timer is not None:
            try:
                self.unschedule(timer)
            except ValueError:
                pass

    @event("commands", Numerics.RPL_ENDOFNAMES)
    def names_end(self, _, line):
        """Schedule a MODE timer since we are finished bursting this channel."""
        channel = self.get_channel(line.params[1])
        if channel is None:
            return

        timer = self.schedule(5, partial(self.send, "MODE",
                                         [line.params[1]]))
        self.mode_timers[channel.name] = timer

    @event("commands", "NICK")
    def nick(self, _, line):
        """Rename a user in all channels."""
        oldnick = line.hostmask.nick
        newnick = line.params[-1]

        # Change the nick in all channels
        for channel in self.channels.values():
            if oldnick not in channel.users:
                continue

            # Change the nick
            channel.users[newnick] = channel.users.pop(oldnick)
