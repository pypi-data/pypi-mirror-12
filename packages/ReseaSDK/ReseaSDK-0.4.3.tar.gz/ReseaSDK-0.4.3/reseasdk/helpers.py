"""

Useful functions

"""
import os
import shlex
import subprocess
import sys
import yaml
import jinja2
from termcolor import colored, cprint


def error(msg):
    """Prints an error message and terminate the program."""
    sys.exit(colored('Resea SDK: {}'.format(msg), 'red'))


def notice(msg):
    """Prints an notice."""
    cprint('Resea SDK: {}'.format(msg), 'yellow')


def info(msg):
    """Prints an informational message."""
    cprint(msg, 'blue')


def _generating(cmd, target):
    """Returns log message for generating something."""

    return '  {}{}{}'.format(colored(cmd, 'magenta'),
                             (' ' * (16 - len(cmd))),
                             target)


def generating(cmd, target):
    """Prints a 'GEN somthing' message. """
    print(_generating(cmd, target))


def exec_cmd(cmd, ignore_failure=False, cwd=None):
    """Executes a command and returns output.

    cmd can be a list (argv) or str. If cmd is str, it will be
    converted by shltex.split().

    If ignore_failure is True, it returns a empty string
    when an error occurred during executing a command instead
    of raising an exception.

    If cwd is not None, it executes the command in the directory.

    >>> exec_cmd('echo hello!')
    'hello!\\n'
    >>> exec_cmd('./bin/sh -c "pwd"', cwd="/")
    '/\\n'
    >>> exec_cmd('exit 1', ignore_failure=True)
    ''
    >>> exec_cmd('this_command_does_not_exist')
    Traceback (most recent call last):
     ...
    FileNotFoundError: [Errno 2] No such file or directory: \
'this_command_does_not_exist'
    """

    if isinstance(cmd, str):
        cmd = shlex.split(cmd)

    if cwd is not None:
        old_cwd = os.getcwd()
        os.chdir(cwd)

    try:
        output = subprocess.check_output(cmd)
    except Exception as e:
        if ignore_failure:
            return ''
        else:
            raise e
    else:
        return output.decode('utf-8')
    finally:
        if cwd is not None:
            os.chdir(old_cwd)


def import_module(module):
    """Returns a module.

    For example, if you do import_module('foo.bar.baz'), it returns
    the 'baz' module instead of 'foo'.
    """
    m = __import__(module)
    for x in module.split('.'):
        m = getattr(m, x)
    return m


def render(tmpl, vars):
    """Renders a template by jinja2."""
    return jinja2.Environment(
        trim_blocks=True,
        lstrip_blocks=True).from_string(tmpl).render(vars)


def load_yaml(path, validator=None):
    """Loads a yaml file."""
    yml = yaml.safe_load(open(path))
    if validator is not None:
        validator(yml)
    return yml


def dict_to_strdict(d):
    for k, v in d.items():
        if isinstance(v, (list, tuple)):
            d[k] = " ".join(v)
        if isinstance(v, bool):
            d[k] = repr(v)
        elif isinstance(v, dict):
            d[k] = "dict_to_strdict: error: '{}' is dict".format(k)  # FIXME
    return d
