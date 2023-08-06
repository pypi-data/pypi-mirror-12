#!/usr/bin/env python3
# Copyright © 2015 Andrew Wilcox and Elizabeth Myers.
# All rights reserved.
# This file is part of the PyIRC 3 project. See LICENSE in the root directory
# for licensing information.


"""Enumeration of IRC server features and extensions.

ISUPPORT is a non-standard but widely supported IRC extension that is used to
advertise what a server supports to a client. Whilst non-standard, most
servers follow a standard format for many parameters.

"""

from copy import deepcopy
from functools import lru_cache
from logging import getLogger


from PyIRC.signal import event
from PyIRC.auxparse import isupport_parse
from PyIRC.extensions import BaseExtension
from PyIRC.numerics import Numerics


_logger = getLogger(__name__)  # pylint: disable=invalid-name


class ISupport(BaseExtension):

    """Parse ISUPPORT attributes into useful things.

    Parsing is done according to the semantics defined by
    :py:class:`~PyIRC.auxparse.isupport_parse``.

    This extension adds ``base.isupport`` as itself as an alias for
    ``get_extension("ISupport").``.

    :ivar supported:
        Parsed ISUPPORT data from the server. Do note that because ISUPPORT is
        technically non-standard, users should be prepared for data that does
        not conform to any implied standard.

    """

    defaults = {
        "PREFIX": ['o', 'v', '@', '+'],
        "CHANTYPES": '#&!+',  # Old channel types
        "NICKLEN": "8",  # Old servers
        "CASEMAPPING": "RFC1459",  # The (Shipped) Gold Standard
        "CHANMODES": ['b', 'k', 'l', 'imnstp'],  # Old modes
    }
    """Defaults until overridden, for old server compat."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.base.isupport = self

        # State
        self.supported = deepcopy(self.defaults)

    @lru_cache(maxsize=16)
    def get(self, string):
        """Get an ISUPPORT string.

        Returns False if not found, True for keyless values, and the value
        for keyed values.

        The following values are guaranteed to be present:

        - CHANTYPES (value is a string)
        - PREFIX (value is of format "(modes)symbols for modes")
        - CASEMAPPING (ascii or rfc1459)
        - NICKLEN (value is a number, but stored as a string)
        - CHANMODES (list of values enumerating modes into four distinct
          classes, respectively: list modes, modes that send a parameter, modes
          that send a parameter only when set, and parameterless modes)

        :param string:
            ISUPPORT string to look up.

        """
        if string not in self.supported:
            return False

        value = self.supported[string]
        return True if value is None else value

    @event("link", "disconnected")
    def close(self, _):
        """Reset ISUPPORT state since we are disconnected."""
        self.supported.clear()

    @event("commands", Numerics.RPL_ISUPPORT)
    def isupport(self, _, line):
        """Handle ISUPPORT event."""
        # To differentiate between really old ircd servers
        # (RPL_BOUNCE=005 on those)
        if not line.params[-1].endswith('server'):
            _logger.warning("Really old IRC server detected!")
            _logger.warning("It's probably fine but things might break.")
            return

        values = isupport_parse(line.params[1:-1])
        if 'CASEMAPPING' in values:
            self.case_change()

        self.supported.update(values)

        self.get.cache_clear()
