#!/usr/bin/env python3
# Copyright © 2015 Andrew Wilcox and Elizabeth Myers.
# All rights reserved.
# This file is part of the PyIRC 3 project. See LICENSE in the root directory
# for licensing information.


""" IRC CAP negotation sub-protocol extensions

For more information, see:
http://ircv3.atheme.org/specification/capability-negotiation-3.1
"""


from functools import partial
from logging import getLogger

from taillight.signal import SignalStop

from PyIRC.signal import event
from PyIRC.extensions import BaseExtension
from PyIRC.numerics import Numerics


_logger = getLogger(__name__)  # pylint: disable=invalid-name


class CapNegotiate(BaseExtension):

    """Basic CAP negotiation.

    IRCv3.2 negotiation is attempted, but earlier specifications will be used
    in a backwards compatible manner.

    This extension does little on its own, but provides a public API.

    This extension adds ``base.cap_negotiate`` as itself as an alias for
    ``get_extension("CapNegotiate").``.

    :ivar supported:
        Supported capabilities - these are the capabilities we support,
        at least, in theory.

    :ivar remote:
        Remote capabilities - that is, what the server supports.

    :ivar local:
        Local capabilities - these are what we actually support.

    :ivar negotiating:
        Whether or not CAP negotiation is in progress.

    """

    requires = ["BasicRFC"]

    """ Presently supported maximum CAP version. """
    version = "302"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.base.cap_negotiate = self

        # What we support - other extensions can add doodads to this
        self.supported = dict()

        # What they support
        self.remote = dict()

        # What we are actually using
        self.local = dict()

        # Negotiation phase
        self.negotiating = True

        # Timer for CAP disarm
        self.timer = None

        # If we get an ACK whilst we are processing a previous one, it gets
        # stored here.
        self.ack_chains = list()

        # Temporary storage used for handling multiline CAP LIST replies
        self.list_replies = dict()

    @staticmethod
    def extract_caps(line):
        """Extract caps from a line."""

        caps = line.params[-1].split()
        caps = (CapNegotiate.parse_cap(cap) for cap in caps)
        return {cap : param for cap, param in caps}

    @staticmethod
    def parse_cap(string):
        """Parse a capability string."""

        cap, sep, param = string.partition('=')
        if not sep:
            return (cap, [])

        return (cap, param.split(','))

    @staticmethod
    def create_str(cap, params):
        """Create a capability string."""

        if params:
            return "{}={}".format(cap, ','.join(params))
        else:
            return cap

    @event("link", "connected", priority=-1000)
    def send_cap(self, _):
        """Initiate CAP negotation."""
        # This must come first!!! Even before USER/NICK!
        if not self.negotiating:
            return

        _logger.debug("Requesting CAP list")

        self.send("CAP", ["LS", self.version])

        self.timer = self.schedule(15, partial(self.end, None, None))

        self.negotiating = True

        # Ensure no other connected events get fired
        raise SignalStop

    @event("link", "disconnected")
    def close(self, _):
        """Reset CAP state since we are disconnected."""
        if self.timer is not None:
            try:
                self.unschedule(self.timer)
            except ValueError:
                pass

        self.supported.clear()
        self.remote.clear()
        self.local.clear()

    @event("commands", "CAP")
    def dispatch(self, _, line):
        """Dispatch the CAP command."""

        if self.timer is not None:
            try:
                self.unschedule(self.timer)
            except ValueError:
                pass
            self.timer = None

        list_end = True
        # Handle IRCv3.2 multiline CAP replies
        if line.params[2] == "*":
            list_end = False

        cap_command = line.params[1].lower()
        self.call_event("commands_cap", cap_command, (line, list_end))

    @event("commands_cap", "new")
    @event("commands_cap", "ls")
    def get_remote(self, _, data):
        """Retrieve the remote CAPs."""
        (line, list_end) = data
        remote = self.extract_caps(line)
        self.remote.update(remote)

        extensions = self.extensions
        for extension in extensions.values():
            # Scan the extensions for caps
            caps = getattr(extension, "caps", None)
            if not caps:
                # Unsupported
                continue

            for cap, param in caps.items():
                if cap.lower() not in remote:
                    continue

                self.register(cap, param)

        if self.negotiating:
            # Negotiate caps
            supported = self.supported
            supported = sorted([self.create_str(c, v) for c, v in
                                remote.items() if c in supported])

            if supported:
                caps = ' '.join(supported)
                _logger.debug("Requesting caps: %s", caps)
                self.send("CAP", ["REQ", caps])
            elif list_end:
                # Negotiaton ends, no caps
                _logger.debug("No CAPs to request!")
                self.end(event, line)

    @event("commands_cap", "list")
    def get_local(self, _, data):
        """Retrieve our CAPs."""
        (line, list_end) = data

        self.list_replies.update(self.extract_caps(line))
        if not list_end:
            return # Wait for the server to send the final CAP LIST reply line
                   # before updating caps

        self.local = self.list_replies
        _logger.debug("CAPs active: %s", self.list_replies)
        # Clear the list provided by CAP LIST; the next CAP LIST reply
        # will be from a different CAP LIST query.
        self.list_replies = dict()


    @event("commands_cap", "ack", priority=-1000)
    def ack(self, _, data):
        """Perform CAP acknowledgement."""
        # XXX - I forgot why this was low priority but I'm keeping it like
        # this until I can get a better look
        line = data[0]
        caps = dict()
        for cap, params in self.extract_caps(line).items():
            if cap.startswith('-'):
                cap = cap[1:]
                _logger.debug("CAP removed: %s", cap)
                self.local.pop(cap, None)
                caps.pop(cap, None)  # Just in case
                continue
            elif cap.startswith(('=', '~')):
                # Compatibility stuff, disregard
                cap = cap[1:]

            assert cap in self.supported
            _logger.debug("Acknowledged CAP: %s", cap)
            caps[cap] = self.local[cap] = params

        signal = self.signals.get_signal(("cap_perform", "ack"))
        if signal.last_status == signal.STATUS_DEFER:
            # We are still processing a previous chain
            self.ack_chains.append((line, caps))
        else:
            self.call_event("cap_perform", "ack", line, caps)

    @event("cap_perform", "ack", priority=10000)
    def end_ack(self, _, line, caps):
        """Either dispatch the next ACK, or finish."""
        # pylint: disable=unused-argument
        # This ACK chain has ended, go on to the next.
        if self.ack_chains:
            self.call_event("cap_perform", "ack", *self.ack_chains.pop(0))
        else:
            self.end(None, None)

    @event("commands_cap", "nak")
    def nak(self, _, data):
        """Log CAP rejection."""
        line = data[0]
        _logger.warning("Rejected CAPs: %s", line.params[-1].lower())

    @event("commands_cap", "end")
    def _end_cap(self, _, data):
        self.end(_, data[0])

    @event("commands", Numerics.RPL_HELLO)
    def end(self, _, line):
        """Complete CAP negotiation."""
        # pylint: disable=unused-argument
        _logger.debug("Ending CAP negotiation")

        if self.timer is not None:
            try:
                self.unschedule(self.timer)
            except ValueError:
                # Called from scheduler, ignore it
                pass
            self.timer = None

        self.send("CAP", ["END"])
        self.negotiating = False

        # Call the hooks to resume connection
        self.call_event("link", "connected")

    def register(self, cap, params=None, replace=False):
        """Register that we support a specific CAP.

        :param cap:
            The capability to register support for

        :param params:
            The parameters to pass for the CAP (IRCv3 extension)

        :param replace:
            Replace existing CAP report, if present

        """
        if params is None:
            params = []

        if replace or cap not in self.supported:
            self.supported[cap] = params
        else:
            self.supported[cap].extend(params)

    def unregister(self, cap):
        """Unregister support for a specific CAP.

        :param cap:
            Capability to remove

        """
        self.supported.pop(cap, None)
