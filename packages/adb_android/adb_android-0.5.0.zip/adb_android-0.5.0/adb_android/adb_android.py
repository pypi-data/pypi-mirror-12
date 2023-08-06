import os
import tempfile
import var as v
from subprocess import check_output, CalledProcessError

def push(src, dest):
    """Pushes files and folders to device."""
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_PUSH, src, dest ]
    return exec_command(adb_full_cmd)

def pull(src, dest):
    """Pulls files and folders to device."""
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_PULL, src, dest ]
    return exec_command(adb_full_cmd)

def devices(opt_l=''):
    """Provides list of available devices"""
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_DEVICES, opt_l ]
    return exec_command(adb_full_cmd)

def shell(subcommand):
    """Executes subcommand in adb shell

    accepts string as "subcommand" argument
    example: "adb shell cat filename.txt"

    """
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_SHELL, subcommand ]
    return exec_command(adb_full_cmd)

def install(apk, opt_r='', opt_s='', opt_l='', opt_d='', opt_t=''):
    """Installs apk on device.

    options:
        -r: replace existing application
        -s: install application on sdcard
        -l: forward lock application
        -d: reinstall existing apk
        -t: allow test packages

    """
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_INSTALL, opt_r, opt_s, \
    opt_l, opt_d, opt_t, apk ]
    return exec_command(adb_full_cmd)

def uninstall(apk, opt_k=''):
    """Uninstalls apk from device.

    options:
        -k: keep the data and cache directories

    """
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_UNINSTALL, apk, opt_k ]
    return exec_command(adb_full_cmd)

def getserialno():
    '''Gets serial number for all online devices

    args:
        n/a

    returns:
        String device serial number

    '''
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_GETSERIALNO ]
    return exec_command(adb_full_cmd)

def wait_for_device():
    '''Waits until device is online

    args:
        n/a

    returns:
        0 if command has been executed successfully.
    '''
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_WAITFORDEVICE ]
    return exec_command(adb_full_cmd)

def start_server():
    '''Start adb server daemon

    args:
        n/a

    returns:
        0 if command has been executed successfully.
    '''
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_START_SERVER ]
    return exec_command(adb_full_cmd)

def kill_server():
    '''Stops adb server daemon

    args:
        n/a

    returns:
        0 if command has been executed successfully.
    '''
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_KILL_SERVER ]
    return exec_command(adb_full_cmd)

def get_state():
    '''Gets current state of device connected per adb

    args:
        n/a

    returns:
        0 if command has been executed successfully.
    '''
    adb_full_cmd = [ v.ADB_COMMAND_PREFIX, v.ADB_COMMAND_GET_STATE ]
    return exec_command(adb_full_cmd)

def exec_command(adb_full_cmd):
    """Executes adb command and handles result code.

    Based on adb command execution result returns
    True (0) or False (!=0).

    """
    if adb_full_cmd is not None:
        try:
            t = tempfile.TemporaryFile()
            #removes empty list elements if func argument hasn't been used
            final_adb_full_cmd = []
            for e in adb_full_cmd:
                if e != '':
                    final_adb_full_cmd.append(e)
            print('\n*** executing ' + ' '.join(adb_full_cmd) + ' ' \
            + 'command')
            output = check_output(final_adb_full_cmd, stderr=t)
            result = 0, output
        except CalledProcessError as e:
            t.seek(0)
            result = e.returncode, t.read()
        print('\n' + result[1])
        return result
    else:
        return False
