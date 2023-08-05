from pexpect import spawn, EOF, TIMEOUT
from os import chdir, path, fdopen
import sys


class HitchCommandLineException(Exception):
    pass


class ExpectedTextNotShown(HitchCommandLineException):
    def __init__(self, expected, shown):
        super(ExpectedTextNotShown, self).__init__((
            "ACTUAL:\n\n{}\n\nEXPECTED:\n\n{}\n"
        ).format(shown, expected))


class WrongExitCode(HitchCommandLineException):
    def __init__(self, output, expected_code, actual_code):
        super(WrongExitCode, self).__init__((
            "{}\nReturn code should have been {}, but was {}."
        ).format(output, expected_code, actual_code))


class DidNotExitBeforeTimeout(HitchCommandLineException):
    def __init__(self, timeout, output):
        super(DidNotExitBeforeTimeout, self).__init__((
            "Timed out after: {} secs\nOUTPUT:\n\n{}\n"
        ).format(timeout, output))


class BadExitCode(HitchCommandLineException):
    def __init__(self, exit_code):
        super(BadExitCode, self).__init__((
            "Bad exit code '{}' specified in step. Should be an integer or 'any'."
        ).format(exit_code))



class CommandLineStepLibrary(object):
    """A package of steps which can be used to test command line applications."""

    def __init__(self, default_timeout=45):
        self.default_timeout = default_timeout

    def cd(self, directory):
        """Change directory to 'directory'."""
        chdir(directory)

    def run(self, command, args=None):
        """Run application."""
        import sys
        args = [] if args is None else args
        self.process = spawn(command, args=args)
        if sys.stdout.isatty():
            self.process.logfile = sys.stdout.buffer
        else:
            self.process.logfile = sys.stdout

    def expect(self, text=None, timeout=None):
        """Expect 'text' to appear."""
        if timeout is None:
            timeout = self.default_timeout
        try:
            self.process.expect(text, timeout=timeout)
        except EOF:
            raise ExpectedTextNotShown(text, self._output())
        except TIMEOUT:
            raise ExpectedTextNotShown(text, self._output())

    def send_control(self, letter):
        """Send Ctrl-[letter] to the application."""
        self.process.sendcontrol(letter)

    def send_line(self, line):
        """Send a line of text to the application."""
        self.process.sendline(line)

    def send_signal(self, signal_name):
        """Send a UNIX signal - e.g. SIGTERM, SIGINT."""
        NAMES_TO_SIGNAL_DICT = dict((n, getattr(signal, n)) \
          for n in dir(signal) if n.startswith('SIG') and '_' not in n )
        if signal_name.upper() not in NAMES_TO_SIGNAL_DICT:
            raise RuntimeError(
                "Signal {} not recognized. Use one of {}".format(
                    signal_name,
                    ", ".join(NAMES_TO_SIGNAL_DICT.keys())
                )
            )
        self.process.kill(NAMES_TO_SIGNAL_DICT[signal_name])

    def _output(self):
        return "\n".join(str(self.process.before).split('\\r\\n'))

    def show_output(self):
        print(self._output())

    def finish(self, with_code=0, timeout=None):
        """Exit and expect a code 'with_code' after timeout seconds."""
        if timeout is None:
            timeout = self.default_timeout
        try:
            self.process.expect(EOF, timeout=timeout)
            self.process.close()
            if with_code != "any":
                try:
                    integer_code = int(with_code)
                except ValueError:
                    raise BadExitCode(with_code)
                if integer_code != self.process.exitstatus:
                    raise WrongExitCode(self._output(), with_code, self.process.exitstatus)
        except TIMEOUT:
            self.process.close()
            raise DidNotExitBeforeTimeout(timeout, self._output())

    def exit(self, with_code=0, timeout=None):
        """Exit and expect a code 'with_code' after timeout seconds. (DEPRECATED)"""
        if timeout is None:
            timeout = self.default_timeout
        try:
            self.process.expect(EOF, timeout=timeout)
            self.process.close()
            if with_code != self.process.exitstatus:
                raise WrongExitCode(self._output(), with_code, self.process.exitstatus)
        except TIMEOUT:
            self.process.close()
            raise DidNotExitBeforeTimeout(timeout, self._output())

    def exit_with_any_code(self, timeout=None):
        """Expect an exit and don't care what kind of code. (DEPRECATED)"""
        if timeout is None:
            timeout = self.default_timeout
        try:
            self.process.expect(EOF, timeout=timeout)
        except TIMEOUT:
            raise DidNotExitBeforeTimeout(timeout, self._output())
        self.process.close()
