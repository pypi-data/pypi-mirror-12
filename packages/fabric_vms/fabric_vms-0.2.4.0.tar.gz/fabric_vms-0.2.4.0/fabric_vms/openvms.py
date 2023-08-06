#!/bin/env python
# -*- coding: UTF-8 -*-
"""
Helper classes for using fabric with OpenVMS hosts

It is assumed that remote host has SSH.COM's SSH2 service running. Due to the
differences between SSH2 and OpenSSH, the following paramiko settings are
forced:

  - look_for_keys = False (via `env.no_keys = True`)
  - allow_agent = False (via `env.no_agent = True`)
"""

from __future__ import print_function

import cStringIO
import functools
import random
import re
import string
from collections import namedtuple
from os import getcwd, path

import fabric
import fabric.context_managers
from fabric.api import (abort, get as api_get, hide,
                        put as api_put, settings)
from fabric.contrib.console import confirm
from fabric.network import needs_host, ssh_config
from fabric.operations import (_execute as _operations_execute,
                               _prefix_commands as operations_prefix_commands)
from fabric.state import env, output
from fabric.utils import puts


__all__ = (
           'cd',
           'cluster_nodes',
           'exists',
           'get',
           '_get_path',  # REMOVE THIS
           'get_shadowset_members',
           'ls',
           'lsof',
           'print_file',
           'put',
           'queue_job',
           'run',
           'run_script',
           'run_clusterwide',
           'run_script_clusterwide',
           'safe_run'
)

env.setdefault('temp_dir', 'TCPIP$SSH_HOME')  # Default temporary file folder
env.setdefault('terminal_width', None)  # Default terminal width is 80 columns


class queue_job(object):

    def get_entry_details(self):
        with settings(hide('everything')):
            all_jobs = run('SHOW QUEUE /BATCH /ALL | SEA SYS$PIPE %s' %
                           self.name)
        entries = {line.split()[0]: None for line
                   in all_jobs.splitlines()
                   if self.name in line.upper()}

        def find_start_params(lines, tag):
            for (lineno, line) in enumerate(lines):
                if tag.lower() in line.lower():
                    return lineno

        for entry_id in entries:
            with settings(hide('everything')):
                this_entry = run('SHOW ENTRY {} /FULL'.format(entry_id))
                this_entry = this_entry.splitlines()
                this_name = this_entry[-1].split()[1][1:]
                this_param = ''.join(
                    [line.strip() for line in
                     this_entry[find_start_params(this_entry, 'submitted'):-1]
                     ]
                )
                this_param = this_param.split('/')[1:]
                entries[entry_id] = {'name': this_name,
                                     'params': this_param}
        return entries

    def resubmit_job(self, entry_id=None):
        """ Resubmits previously stopped queue job """
        # Start all entries if no entry_id was specified
        entries_for_resubmission = [entry_id] if entry_id else self.entries
        for entry in entries_for_resubmission:
            run('SUBMIT {} /{}'.format(
                self.entries[entry]['name'],
                '/'.join(self.entries[entry]['params'])
            ))

    def __init__(self, name):
        self.name = name.upper()
        self.entries = self.get_entry_details()

    def __str__(self):
        return "Job name {}, entry number(s) {}".format(self.name,
                                                        self.entries)

    def stop_ob(self):
        """ Looks for the entry number of a job and kills it """
        for entry_id in self.entries:
            run('DELETE /ENTRY={}'.format(entry_id))


@needs_host
def _check_if_using_the_correct_account():
    # Ensure that the user we use to log in has the right credentials
    # OpenVMS' SSH2 doesn't handle well the connections where both a wrong
    # pkey and a valid password are given with paramiko under the hoods.
    # This is an issue with paramiko as of 1.16 (see related Issue#519)
    if 'user' in ssh_config(env.host_string) and 'user' in env:
        if ssh_config(env.host_string)['user'].upper() != env.user.upper():
            # Avoid using private keys if user doesn't match env.user
            env.use_ssh_config = False
    else:
        env.use_ssh_config = False


def _prefix_commands(command, which):
    """
    Overrides fabric.operations._prefix_commands
    Required for overriding 'cd' context manager
    """
    if which == 'local':
        return operations_prefix_commands(command, which)

    prefixes = list(env.command_prefixes)
    if env.cwd:
        prefixes.insert(0, 'SET DEFAULT {}'.format(env.cwd))
    glue = " ; "
    prefix = (glue.join(prefixes) + glue) if prefixes else ""
    return prefix + command


def cd(folder):
    return fabric.context_managers._setenv({'cwd': folder})


def _execute_openvms(f):
    """
    Execute a command on a OpenVMS host and set the status according to
    the value of $SEVERITY.
        - If $SEVERITY is odd, everything went fine --> return status=0
        - If $SEVERITY is even, there was a failure --> return status=1

        Severity of Error Conditions

        Value Symbol        Severity     Response
          0  STS$K_WARNING  Warning      Execution continues,
                                         unpredictable results
          1  STS$K_SUCCESS  Success      Execution continues
                                         expected results
          2  STS$K_ERROR    Error        Execution continues
                                         erroneous results
          3  STS$K_INFO     Information  Execution continues,
                                         informational message
          4  STS$K_SEVERE   Severe error Execution terminates, no output
          5  Reserved
          6  Reserved
          7  Reserved

    (https://groups.google.com/forum/#!topic/comp.os.vms/dSeJtsqWXM4)
    """
    @functools.wraps(f)
    def _wrapper(*args, **kwargs):
        wrapped_kwargs = kwargs.copy()
        wrapped_kwargs['command'] = 'PIPE %s%s ; WRITE SYS$OUTPUT $SEVERITY' \
            % ('SET TERMINAL /WIDTH={} & '.format(env.terminal_width)
               if env.terminal_width else '',
               kwargs['command'])
        # Required setting for OpenVMS:
        # ret_codes = [-1] since there's no return code coming back.
        # Return code will be handled asking for $SEVERITY after each command.
        with settings(hide('everything'),
                      ok_ret_codes=[-1]):
            stdout, result_stderr, _ = f(*args, **wrapped_kwargs)
        stdout = stdout.splitlines()

        # last line will have the severity code, in case it's even all is OK
        return ('\n'.join(stdout[:-1]),
                result_stderr,
                1 - int(stdout[-1]) % 2)
    return _wrapper


@_execute_openvms
def _execute(*args, **kwargs):
    return _operations_execute(*args, **kwargs)


def _override_prefix_commands(f):
    """ Decorator for customised 'cd' context manager """
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        fabric.operations._prefix_commands = _prefix_commands
        return f(*args, **kwargs)
    return wrapper


def _override_execute(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        fabric.operations._execute = _execute
        return f(*args, **kwargs)
    return wrapper


@_override_prefix_commands
def _common_overrides(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        _check_if_using_the_correct_account()
        with settings(use_shell=False, no_keys=True, no_agent=True):
            return f(*args, **kwargs)
    return wrapper


@_override_execute
@_common_overrides
def run(*args, **kwargs):
    """
        wrapper overriding fabric.operations.run

        Required for OpenVMS hosts:
        - no_agent and no_keys due to SSH2
        - use_shell=False (assuming GNV isn't installed) due to DCL shell
    """
    # stderr always returns nothing in OpenVMS
    with hide('stderr' if output.running else 'running'):
        _result = fabric.operations.run(*args, **kwargs)
    if output.stdout and _result.stdout:
        _pretty_print(_result.stdout)
    return _result


def _pretty_print(content, header=None, show_prefix=False):
    """
        Print the output of a command with a SYSTEM [out] prefix
        Optionally adds a header string with a [run] prefix
        Optionally shows/hides the [hostname] prefix
    """
    if header and output.running:
        puts('run: {}'.format(header), show_prefix=env.output_prefix)
    if content and output.stdout:
        for line in content.splitlines():
            puts('out: {}'.format(line), show_prefix=env.output_prefix)


def safe_run(command):
    """ Calls run and prompts whether or not to continue in case of error """
    with settings(warn_only=True):
        result = run(command)
    if result.failed and not confirm("Last command failed. Continue anyway? ",
                                     default=False):
        abort("Aborting at user request.")
    return result


@needs_host
def exists(remote_file):
    sftp_session = fabric.sftp.SFTP(env.host_string)
    return sftp_session.exists(remote_file)


def _get_path(remote_path):
    """ Split an OpenVMS file name into its path, name and version number """
    if ':' in remote_path:  # is an absolute remote path
        (remote_path, remote_name) = remote_path.split(':')
        remote_path = '/{}'.format(remote_path)
    else:
        (remote_path, remote_name) = ('', remote_path)

    if ']' in remote_name:  # directory was specified
        (remote_dir, remote_name) = remote_name.split(']')
        remote_path = '{0}{1}{2}'.format(
            remote_path.rstrip('/') if remote_path else '',
            '/' if remote_path else '',
            remote_dir[1:]  # remote trailing '['
        )
    if ';' in remote_name:  # name contains version number
        (remote_name, remote_version) = remote_name.split(';')
    else:
        remote_version = '0'

    return (remote_path, remote_name, remote_version)


@_common_overrides
def put(local_path=None, remote_path=None, use_glob=True):
    """
    Overrides operations.put, taking care of whether the remote_path is
    relative or absolute for remote OpenVMS host.
    Bear in mind that SFTP server runs as a detached process and some logical
    names are missing, (i.e. sys$login, sys$scratch) unless defined for OTHER
    (see http://bit.ly/1JSN5mB).
    local_path might be a filename or a file object.
    """

    (remote_path, remote_name, _) = _get_path(remote_path or env.temp_dir)
    if isinstance(local_path, str):
        local_path = path.abspath(local_path)

    with cd(remote_path):  # put does honor cd
        return api_put(local_path=local_path,
                       remote_path=remote_name,
                       use_glob=use_glob,
                       use_sudo=False,  # override all other parameters
                       mirror_local_mode=False,
                       mode=None,
                       temp_dir="")


@_common_overrides
def get(remote_path, local_path=None, delete_after=False):
    """
     Overrides operations.get, taking care of whether the remote_path is
    relative or absolute for remote OpenVMS host and file versioning.

     If no version number is specified, only last version is downloaded.

     Bear in mind that SFTP server runs as a detached process and some logical
    names are missing, (i.e. sys$login, sys$scratch) unless defined for OTHER
    (see http://bit.ly/1JSN5mB).

    Parameters:
    - remote_path: string contanining the remote filespec to be downloaded
    - local_path: might be a filename or a file object
    - delete_after: delete the remote file after successful retrieval

    Returns: Iterable with the API get result for each file
    """
    remote_path = remote_path.split(';')[0]  # ignore version numbers
    successfully_downloaded = []
    if not local_path:
        local_path = getcwd()  # by default download to current directory
    if isinstance(local_path, str):
        local_path = path.abspath(local_path)

    # (remote_path, remote_name, _) = _get_path(remote_path)
    with hide('everything'):
        files_to_get = ls(remote_path)

    if not isinstance(local_path, str) and len(files_to_get) > 1:
        puts('Only one file can be downloaded to a file object at a time!')
        return

    for pending_file in files_to_get:
        # only last version (max) will be downloaded
        last_version = max(files_to_get[pending_file])
        remote_file = '{};{}'.format('/'.join(pending_file),
                                     last_version)
        result = api_get(remote_path=remote_file,
                         local_path=local_path,
                         use_sudo=False,  # override this, useless here
                         temp_dir="")  # same as line above
        if result.succeeded:
            if isinstance(local_path, str):
                result.local_path = local_path if path.isdir(local_path) \
                                    else '/'.join([local_path,
                                                   pending_file[1]])
            successfully_downloaded.extend(result)
            if delete_after:
                run('DELETE {};{}'.format(remote_path, last_version))

    return successfully_downloaded

        # # with cd(pending_file[0]):  # remote path
        # #     return api_get(remote_name,
        # #                    local_path=local_path,
        # #                    use_sudo=False,  # override this, useless here
        # #                    temp_dir="")  # same as line above
        #     if delete_after:
        #         run('DELETE {};0'.format(remote_name))


def print_file(remote_filename):
    """
    Gets and returns the content of a remote file.
    Do this instead of call type in order to avoid console width issues.
    """
    temp_file = cStringIO.StringIO()
    with hide('everything'):
        get(remote_path=remote_filename,
            local_path=temp_file)
    temp_file.seek(0)
    content = temp_file.read()
    temp_file.close()
    if output.stdout:
        _pretty_print(
            content,
            header='Showing contents of file {}:'.format(remote_filename)
        )
        return content

def ls(remote_path=None):
    """
    Handler for run('DIR %s' % remote_folder) taking care of file versioning.

    Parameters:
     - remote_path: Path on the remote host, defaults to 'SYS$LOGIN'

    Returns:
     list of tuples (file_path, file_name, file_version)
    """
    outcome = {}
    ls_res = run('DIR /NOHEADING /NOTRAILING /BRIEF /NOSIZE /NODATE %s' %
                 (remote_path or 'SYS$LOGIN'))
    for remote_file in ls_res.splitlines():
        (rem_path, rem_name, rem_vers) = _get_path(remote_file)
        if (rem_path, rem_name) in outcome:
            outcome[(rem_path, rem_name)].append(int(rem_vers))
        else:
            outcome[(rem_path, rem_name)] = [int(rem_vers)]
    return outcome

def lsof(drive_id):
    """
    Return a named tuple with the open files, None if nothing's open
    Empty values in tuples are filled in with NLA0: (usually the file name is
    not obtained when not enough priviledges)
    """
    out_file = '{0}:{1}.DAT'.format(
        env.temp_dir,
        ''.join(random.SystemRandom().choice(string.ascii_uppercase +
                                             string.digits)
                for _ in range(8))
    )
    _result = cStringIO.StringIO()

    with hide('everything'):
        run("SHOW DEVICE {} /FILES /NOSYSTEM /BRIEF /OUTPUT={}".format(
            drive_id, out_file))

        get(remote_path=out_file,
            local_path=_result)
        run('DELETE /NOLOG {}.'.format(out_file))
        _result.seek(0)

    open_files = [line.strip() for line in _result.readlines() if line.strip()]
    _result.close()
    if len(open_files) > 1:
        file_object = namedtuple('Open_File',
                                 re.split('_{2,}',
                                          open_files[1].replace(' ', '_')))
        thing = []
        for open_file in open_files[2:]:
            # Uncommon but process names may contain spaces
            file_tuple = open_file.split()
            n = len(file_tuple) - len(file_object._fields)
            if n > 0:
                file_tuple = [' '.join(file_tuple[0:n+1])] + file_tuple[n+1:]
            if n < 0:
                file_tuple.append(['NLA0:']*abs(n))
            thing.append(file_object._make(file_tuple))
        return thing


def run_clusterwide(cmd_list, sysman_command=False):
    """
        Run a list of commands clusterwide with SYSMAN
        If the command is a SYSMAN command (and doesn't need a trailing "DO"),
        set sysman_command to True)
    """
    if not isinstance(cmd_list, list):
        cmd_list = [cmd_list]
    # Create a temporary file with commands surrounded by set e/c and exit"
    cmd_file = cStringIO.StringIO()

    for cmd in cmd_list:
        _pretty_print(header='Running clusterwide: {}'.format(cmd),
                      content=None)
    cmd_file.write('SET ENVIRONMENT /NODE=({})\n'.format(
                   ','.join(cluster_nodes())))
    for cmd in cmd_list:
        cmd_file.write('{}{}\n'.format('' if sysman_command else 'DO ',
                                       cmd))
    cmd_file.write('EXIT\n')

    # Runs SYSMAN and call the temporary file
    result = run_script_clusterwide(cmd_file)
    # Close the file object
    cmd_file.close()

    return result


def run_script_clusterwide(sysman_script):
    """ Run a script clusterwide by invoking SYSMAN """
    return run_script(dcl_script=sysman_script,
                      prefix='MCR SYSMAN')


def run_script(dcl_script, prefix=None):
    """ Run a script remotely """
    # dcl_script may be a filename, or a file-like object
    # first we need to upload the script file to the remote host
    is_fabric_script = not isinstance(dcl_script, str)
    if is_fabric_script:
        script_filename = '{}FABRIC_TEMP.TMP'.format(env.temp_dir)
    else:
        script_filename = path.basename(dcl_script)

    with hide('running'):
        put(dcl_script, script_filename)

    # then we run the script file
    with hide('running' if is_fabric_script else 'stderr'):
        result = run('{}@{}'.format('%s ' % prefix if prefix else '',
                                    script_filename))
    # Remove the temporary script file
    with settings(hide('everything')):
        run('DELETE /NOLOG {};*'.format(script_filename))
    return result


def get_shadowset_members(shadowset='dsa0:'):
    """ Returns an array with the members of a shadowset """
    members = run('SHOW DEVICE {} /BRIEF | SEA SYS$PIPE ShadowSetMember'.
                  format(shadowset))
    return [member.split()[0] for member in members.splitlines()]


def cluster_nodes():
    """ Returns an array with the nodes of the cluster """
    nodes = []
    with hide('everything'):
        for line in run('SHOW CLUSTER').splitlines():
            if line and "MEMBER " in line:
                nodes.append(line.split('|')[1].strip())
    return nodes
