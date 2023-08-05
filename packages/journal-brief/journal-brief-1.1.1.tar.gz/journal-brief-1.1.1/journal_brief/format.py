"""
Copyright (c) 2015 Tim Waugh <tim@cyberelk.net>

## This program is free software; you can redistribute it and/or modify
## it under the terms of the GNU General Public License as published by
## the Free Software Foundation; either version 2 of the License, or
## (at your option) any later version.

## This program is distributed in the hope that it will be useful,
## but WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU General Public License for more details.

## You should have received a copy of the GNU General Public License
## along with this program; if not, write to the Free Software
## Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
"""

from collections import defaultdict
import datetime
import json
import logging
from systemd import journal
import uuid


log = logging.getLogger(__name__)
FORMATTERS = {}


def list_formatters():
    return list(FORMATTERS.keys())


def get_formatter(name, *args, **kwargs):
    """
    Get a new formatter instance by name
    """
    return FORMATTERS[name](*args, **kwargs)


class RegisteredFormatter(type):
    """
    Metaclass for EntryFormatter, registering for use with get_formatter()
    """
    def __new__(meta, name, bases, class_dict):
        cls = type.__new__(meta, name, bases, class_dict)
        FORMATTERS[class_dict['FORMAT_NAME']] = cls
        return cls


class EntryFormatter(object, metaclass=RegisteredFormatter):
    """
    Only display MESSAGE field
    """

    FORMAT_NAME = 'cat'  # for use with get_formatter()

    # Filter rules for journal entries to be processed by this entry
    # formatter, or None for the rules listed in the configuration
    # file.
    FILTER_INCLUSIONS = None
    FILTER_EXCLUSIONS = None

    def format(self, entry):
        """
        Format a single entry.

        :param entry: dict, entry to format
        :return: str, formatted entry including any newline required
        """
        return entry['MESSAGE'] + '\n'

    def flush(self):
        """
        Return any closing formatting required.

        This is called when there are no more
        entries to format and can be used to
        eg. display analysis of the logs.
        """
        return ''


class ShortEntryFormatter(EntryFormatter):
    """
    Output like a log file
    """

    FORMAT_NAME = 'short'
    FORMAT = '{__REALTIME_TIMESTAMP} {_HOSTNAME} {SYSLOG_IDENTIFIER}: {MESSAGE}\n'
    TIMESTAMP_FORMAT = '%b %d %T'

    def format_timestamp(self, entry, field):
        """
        Convert entry field from datetime.datetime instance to string

        Uses strftime() and TIMESTAMP_FORMAT
        """

        if field in entry:
            dt = entry[field]
            entry[field] = dt.strftime(self.TIMESTAMP_FORMAT)

    def format(self, entry):
        """
        Format a journal entry using FORMAT

        :param entry: dict, journal entry
        :return: str, formatted string
        """

        self.format_timestamp(entry, '__REALTIME_TIMESTAMP')

        if '_HOSTNAME' not in entry:
            entry['_HOSTNAME'] = 'localhost'

        if 'SYSLOG_IDENTIFIER' not in entry:
            entry['SYSLOG_IDENTIFIER'] = entry.get('_COMM', '?')

        if '_PID' in entry:
            entry['SYSLOG_IDENTIFIER'] += '[{0}]'.format(entry['_PID'])
        elif 'SYSLOG_PID' in entry:
            entry['SYSLOG_IDENTIFIER'] += '[{0}]'.format(entry['SYSLOG_PID'])

        return self.FORMAT.format(**entry)


class JSONEntryFormatter(EntryFormatter):
    """
    JSON format
    """

    FORMAT_NAME = 'json'
    JSON_DUMPS_KWARGS = {}

    def format(self, entry):
        serializable = {}
        for field, value in entry.items():
            if isinstance(value, uuid.UUID):
                log.debug("Converting %s", field)
                value = str(value)
            elif isinstance(value, datetime.timedelta):
                log.debug("Converting %s", field)
                value = value.total_seconds()
            elif isinstance(value, datetime.datetime):
                log.debug("Converting %s", field)
                value = value.strftime("%c")
            elif isinstance(value, journal.Monotonic):
                log.debug("Converting %s", field)
                value = value.timestamp.total_seconds()
            elif isinstance(value, bytes):
                log.debug("Converting %s", field)
                value = value.decode()

            serializable[field] = value

        log.debug("%r", serializable)
        return json.dumps(serializable, **self.JSON_DUMPS_KWARGS) + '\n'


class JSONPrettyEntryFormatter(JSONEntryFormatter):
    """
    Pretty JSON format
    """

    FORMAT_NAME = 'json-pretty'
    JSON_DUMPS_KWARGS = {'indent': 8}


class RebootFormatter(EntryFormatter):
    """
    Display a message on each reboot

    Only shows reboots between entries that are to be shown.
    """

    FORMAT_NAME = 'reboot'

    def __init__(self, *args, **kwargs):
        super(RebootFormatter, self).__init__(*args, **kwargs)
        self.this_boot_id = None

    def format(self, entry):
        try:
            boot_id = entry['_BOOT_ID']
        except KeyError:
            return ''
        else:
            reboot = (self.this_boot_id is not None and
                      self.this_boot_id != boot_id)
            self.this_boot_id = boot_id

            if reboot:
                return '-- Reboot --\n'

        return ''


class LoginFormatter(EntryFormatter):
    """
    Show a summary of login sessions
    """

    FORMAT_NAME = "login"
    FILTER_INCLUSIONS = [
        {
            # New session
            'PRIORITY': 'info',
            'MESSAGE_ID': ['8d45620c1a4348dbb17410da57c60c66'],
            '_COMM': ['systemd-logind'],
        },
    ]

    def __init__(self, *args, **kwargs):
        super(LoginFormatter, self).__init__(*args, **kwargs)
        self.login = defaultdict(int)

    def format(self, entry):
        if 'USER_ID' not in entry:
            return

        self.login[entry['USER_ID']] += 1
        return ''

    def flush(self):
        if not self.login:
            return ''

        ret = '\nUser logins:\n\n'
        logins = list(self.login.items())
        logins.sort()
        for user, count in logins:
            ret += '{count:>5} x {user}\n'.format(user=user, count=count)

        return ret
