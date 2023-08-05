# Colored terminal output for Python's logging module.
#
# Author: Peter Odding <peter@peterodding.com>
# Last Change: October 14, 2015
# URL: https://coloredlogs.readthedocs.org

"""Colored terminal output for Python's :mod:`logging` module."""

# Semi-standard module versioning.
__version__ = '2.0'

# Standard library modules.
import copy
import logging
import os
import re
import socket
import sys
import time

# External dependencies.
from humanfriendly.terminal import ansi_wrap, connected_to_terminal

# The logging handler attached to the root logger (initialized by install()).
root_handler = None

# In coloredlogs 1.0 the coloredlogs.ansi_text() function was moved to
# humanfriendly.ansi_wrap(). Because the function signature remained the
# same the following alias enables us to preserve backwards compatibility.
ansi_text = ansi_wrap


def install(level=logging.INFO, **kw):
    """
    Install a :py:class:`ColoredStreamHandler` for the root logger.

    :param level: The logging level to filter on (defaults to :py:data:`logging.INFO`).
    :param kw: Optional keyword arguments for :py:class:`ColoredStreamHandler`.

    Calling this function multiple times will never install more than one
    handler.
    """
    global root_handler
    if not root_handler:
        # Create the root handler.
        root_handler = ColoredStreamHandler(level=level, **kw)
        # Install the root handler.
        root_logger = logging.getLogger()
        root_logger.setLevel(logging.NOTSET)
        root_logger.addHandler(root_handler)


# TODO Move these functions into ColoredStreamHandler?


def increase_verbosity():
    """
    Increase the verbosity of the root handler by one defined level.

    Understands custom logging levels like defined by my ``verboselogs``
    module.
    """
    defined_levels = find_defined_levels()
    current_index = defined_levels.index(get_level())
    selected_index = max(0, current_index - 1)
    set_level(defined_levels[selected_index])


def decrease_verbosity():
    """
    Decrease the verbosity of the root handler by one defined level.

    Understands custom logging levels like defined by my ``verboselogs``
    module.
    """
    defined_levels = find_defined_levels()
    current_index = defined_levels.index(get_level())
    selected_index = min(current_index + 1, len(defined_levels) - 1)
    set_level(defined_levels[selected_index])


def is_verbose():
    """
    Check whether the log level of the root handler is set to a verbose level.

    :returns: ``True`` if the root handler is verbose, ``False`` if not.
    """
    return get_level() < logging.INFO


def get_level():
    """
    Get the logging level of the root handler.

    :returns: The logging level of the root handler (an integer).
    """
    install()
    return root_handler.level


def set_level(level):
    """
    Set the logging level of the root handler.

    :param level: The logging level to filter on (an integer).
    """
    install()
    root_handler.level = level


def find_defined_levels():
    """
    Find the defined logging levels.

    :returns: A list of integers (sorted in ascending order).
    """
    defined_levels = set()
    for name in dir(logging):
        if name.isupper():
            value = getattr(logging, name)
            if isinstance(value, int):
                defined_levels.add(value)
    return sorted(defined_levels)


class ColoredStreamHandler(logging.StreamHandler):

    """
    Enables colored terminal output for Python's :py:mod:`logging` module.

    The :py:class:`ColoredStreamHandler` class enables colored terminal output
    for a logger created with Python's :py:mod:`logging` module. The log
    handler formats log messages including timestamps, logger names and
    severity levels. It uses `ANSI escape sequences`_ to highlight timestamps
    and debug messages in green and error and warning messages in red. The
    handler does not use ANSI escape sequences when output redirection applies,
    for example when the standard error stream is being redirected to a file.
    Here's an example of its use::

        # Create a logger object.
        import logging
        logger = logging.getLogger('your-module')

        # Initialize coloredlogs.
        import coloredlogs
        coloredlogs.install()
        coloredlogs.set_level(logging.DEBUG)

        # Some examples.
        logger.debug("this is a debugging message")
        logger.info("this is an informational message")
        logger.warn("this is a warning message")
        logger.error("this is an error message")
        logger.fatal("this is a fatal message")
        logger.critical("this is a critical message")

    .. _ANSI escape sequences: http://en.wikipedia.org/wiki/ANSI_escape_code#Colors
    """

    default_severity_to_style = {
        'DEBUG': dict(color='green'),
        'INFO': dict(),
        'VERBOSE': dict(color='blue'),
        'WARNING': dict(color='yellow'),
        'ERROR': dict(color='red'),
        'CRITICAL': dict(color='red', bold=True),
    }

    def __init__(self, stream=sys.stderr, level=logging.NOTSET, isatty=None,
                 show_name=True, show_severity=True, show_timestamps=True,
                 show_hostname=True, use_chroot=True, severity_to_style=None):
        """Initialize a :class:`ColoredStreamHandler` object."""
        logging.StreamHandler.__init__(self, stream)
        self.level = level
        self.show_timestamps = show_timestamps
        self.show_hostname = show_hostname
        self.show_name = show_name
        self.show_severity = show_severity
        self.severity_to_style = self.default_severity_to_style.copy()
        if severity_to_style:
            self.severity_to_style.update(severity_to_style)
        self.isatty = connected_to_terminal(stream) if isatty is None else isatty
        if show_hostname:
            chroot_file = '/etc/debian_chroot'
            if use_chroot and os.path.isfile(chroot_file):
                with open(chroot_file) as handle:
                    self.hostname = handle.read().strip()
            else:
                self.hostname = re.sub(r'\.local$', '', socket.gethostname())
        if show_name:
            self.pid = os.getpid()

    def emit(self, record):
        """
        Emit a formatted log record to the configured stream.

        Called by the :py:mod:`logging` module for each log record. Formats the
        log message and passes it onto :py:func:`logging.StreamHandler.emit()`.
        """
        # If the message doesn't need to be rendered we take a shortcut.
        if record.levelno < self.level:
            return
        # Make sure the message is a string.
        message = record.msg
        try:
            if not isinstance(message, basestring):
                message = unicode(message)
        except NameError:
            if not isinstance(message, str):
                message = str(message)
        # Colorize the log message text.
        severity = record.levelname
        if severity in self.severity_to_style:
            message = self.wrap_style(text=message, **self.severity_to_style[severity])
        # Compose the formatted log message as:
        #   timestamp hostname name severity message
        # Everything except the message text is optional.
        parts = []
        if self.show_timestamps:
            parts.append(self.wrap_style(text=self.render_timestamp(record.created), color='green'))
        if self.show_hostname:
            parts.append(self.wrap_style(text=self.hostname, color='magenta'))
        if self.show_name:
            parts.append(self.wrap_style(text=self.render_name(record.name), color='blue'))
        if self.show_severity:
            parts.append(self.wrap_style(text=severity, color='black', bold=True))
        parts.append(message)
        message = ' '.join(parts)
        # Copy the original record so we don't break other handlers.
        record = copy.copy(record)
        record.msg = message
        # Use the built-in stream handler to handle output.
        logging.StreamHandler.emit(self, record)

    def render_timestamp(self, created):
        """
        Format the time stamp of the log record.

        Receives the time when the LogRecord was created (as returned by
        :py:func:`time.time()`). By default this returns a string in the format
        ``YYYY-MM-DD HH:MM:SS``.

        Subclasses can override this method to customize date/time formatting.
        """
        return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(created))

    def render_name(self, name):
        """
        Format the name of the logger.

        Receives the name of the logger used to log the call. By default this
        returns a string in the format ``NAME[PID]`` (where PID is the process
        ID reported by :py:func:`os.getpid()`).

        Subclasses can override this method to customize logger name formatting.
        """
        return '%s[%s]' % (name, self.pid)

    def wrap_style(self, text, **kw):
        """Wrapper for :py:func:`ansi_text()` that's disabled when ``isatty=False``."""
        return ansi_wrap(text, **kw) if self.isatty else text
