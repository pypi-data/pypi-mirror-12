"""
API and command-line support for human-readable Eliot messages.
"""

from __future__ import unicode_literals

from datetime import datetime
from sys import stdin, stdout, argv
from ._bytesjson import loads
from ._message import (
    TIMESTAMP_FIELD, TASK_UUID_FIELD, TASK_LEVEL_FIELD, MESSAGE_TYPE_FIELD,
)
from ._action import ACTION_TYPE_FIELD, ACTION_STATUS_FIELD

from six import text_type as unicode, PY2, PY3
if PY3:
    # Ensure binary stdin, since we expect specifically UTF-8 encoded
    # messages, not platform-encoding messages.
    stdin = stdin.buffer


def pretty_format(message):
    """
    Convert a message dictionary into a human-readable string.

    @param message: Message to parse, as dictionary.

    @return: Unicode string.
    """
    skip = {TIMESTAMP_FIELD, TASK_UUID_FIELD, TASK_LEVEL_FIELD,
            MESSAGE_TYPE_FIELD, ACTION_TYPE_FIELD, ACTION_STATUS_FIELD}

    def add_field(previous, key, value):
        value = unicode(value).rstrip("\n")
        # Reindent second line and later to match up with first line's
        # indentation:
        lines = value.split("\n")
        indent = " " * (2 + len(key) + 2)  # lines are "  <key>: <value>"
        value = "\n".join([lines[0]] + [indent + l for l in lines[1:]])
        return "  %s: %s\n" % (key, value)

    remaining = ""
    for field in [ACTION_TYPE_FIELD, MESSAGE_TYPE_FIELD, ACTION_STATUS_FIELD]:
        if field in message:
            remaining += add_field(remaining, field, message[field])
    for (key, value) in sorted(message.items()):
        if key not in skip:
            remaining += add_field(remaining, key, value)

    level = "/" + "/".join(map(unicode, message[TASK_LEVEL_FIELD]))
    return "%s -> %s\n%sZ\n%s" % (
        message[TASK_UUID_FIELD],
        level,
        # If we were returning or storing the datetime we'd want to use an
        # explicit timezone instead of a naive datetime, but since we're
        # just using it for formatting we needn't bother.
        datetime.utcfromtimestamp(message[TIMESTAMP_FIELD]).isoformat(
            sep=str(" ")),
        remaining,
    )


_CLI_HELP = """\
Usage: cat messages | eliot-prettyprint

Convert Eliot messages into more readable format.

Reads JSON lines from stdin, write out pretty-printed results on stdout.
"""


def _main():
    """
    Command-line program that reads in JSON from stdin and writes out
    pretty-printed messages to stdout.
    """
    if argv[1:]:
        stdout.write(_CLI_HELP)
        raise SystemExit()
    for line in stdin:
        message = loads(line)
        result = pretty_format(message) + "\n"
        if PY2:
            result = result.encode("utf-8")
        stdout.write(result)


__all__ = ["pretty_format"]
