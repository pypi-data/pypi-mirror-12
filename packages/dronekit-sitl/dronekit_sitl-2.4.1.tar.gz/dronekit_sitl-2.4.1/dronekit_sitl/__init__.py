#!/usr/bin/python

from __future__ import print_function
import re
import sys
import os
import subprocess
import string
import time
import json
import tarfile
import sys
import urllib
import urllib2
import os
import json
import shutil
import atexit
import select
import psutil
from subprocess import Popen, PIPE
from os.path import expanduser
from threading import Thread
from Queue import Queue, Empty
import dronekit

sitl_host = 'http://d3jdmgrrydviou.cloudfront.net'
sitl_target = os.path.normpath(expanduser('~/.dronekit/sitl'))

def kill(proc_pid):
    process = psutil.Process(proc_pid)
    for proc in process.children(recursive=True):
        try:
            proc.kill()
        except psutil.NoSuchProcess:
            pass
    try:
        process.kill()
    except psutil.NoSuchProcess:
        pass

class NonBlockingStreamReader:
    def __init__(self, stream):
        '''
        stream: the stream to read from.
                Usually a process' stdout or stderr.
        '''

        self._s = stream
        self._q = Queue()

        def _populateQueue(stream, queue):
            '''
            Collect lines from 'stream' and put them in 'quque'.
            '''

            while True:
                line = stream.readline()
                if line:
                    queue.put(line)
                else:
                    break

        self._t = Thread(target = _populateQueue,
                         args = (self._s, self._q))
        self._t.daemon = True
        self._t.start() #start collecting lines from the stream

    def readline(self, timeout = None):
        try:
            return self._q.get(block = timeout is not None,
                               timeout = timeout)
        except Empty:
            return None

class UnexpectedEndOfStream(Exception):
    pass

def version_list():
    sitl_list = '{}/versions.json'.format(sitl_host)

    req = urllib2.Request(sitl_list, headers={'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'})
    raw = urllib2.urlopen(req).read()
    versions = json.loads(raw)
    return versions

def download(system, version, target, verbose=False):
    sitl_file = "{}/{}/sitl-{}-v{}.tar.gz".format(sitl_host, system, target, version)

    if not os.path.isdir(sitl_target + '/' + system + '-' + version):
        if verbose:
            print("Downloading SITL from %s" % sitl_file)

        if not os.path.isdir(sitl_target):
            os.makedirs(sitl_target)

        testfile = urllib.URLopener()
        testfile.retrieve(sitl_file, sitl_target + '/sitl.tar.gz')

        tar = tarfile.open(sitl_target + '/sitl.tar.gz')
        tar.extractall(path=sitl_target + '/' + system + '-' + version)
        tar.close()

        if verbose:
            print('Extracted.')
    else:
        if verbose:
            print("SITL already Downloaded.")

class SITL():
    def __init__(self, system, version):
        self.system = system
        self.version = version
        self.p = None

    def download(self, target=None, verbose=False):
        if target == None:
            target = detect_target()

        return download(self.system, self.version, target, verbose=verbose)

    def launch(self, args, auto_download=True, verbose=False, await_ready=False, restart=False, local=False):
        if self.p and self.poll() == None:
            if not restart:
                raise ChildProcessError('SITL is already running, please use .stop() to kill it')
            self.stop()

        if auto_download:
            self.download()

        elfname = {
            "copter": "ArduCopter.elf",
            "plane": "ArduPlane.elf",
            "rover": "APMrover2.elf",
            "solo": "ArduCopter.elf",
        }

        if local:
            wd = os.getcwd()
        else:
            wd = os.path.join(sitl_target, self.system + '-' + self.version)

        if not local:
            args = [os.path.join('.', elfname[self.system])] + args
        else:
            args = [os.path.join('.', args[0])] + args[1:]

        # Load the binary for primitive feature detection.
        elf = open(os.path.join(wd, args[0]), 'rb').read()

        # pysim is required for earlier SITL builds
        # lacking --home or --model params.
        need_sim = not '--home' in elf or not '--model' in elf
        self.using_sim = need_sim

        # Run pysim
        if need_sim:
            import argparse
            parser = argparse.ArgumentParser(usage=argparse.SUPPRESS)
            parser.add_argument('-I')
            parser.add_argument('--home')
            parser.add_argument('--rate')
            parser.add_argument('--model')
            parser.add_argument('-C', action='store_true')
            def noop(*args, **kwargs):
                pass

            parser.error = noop
            out = parser.parse_known_args(args[1:])
            if out == None:
                print('Warning! Couldn\'t recognize arguments passed to legacy SITL.', file=sys.stderr)
            else:
                res, rest = out

                # Fixup actual args.
                args = [args[0]]
                if res.I:
                    args += ['-I' + res.I]
                if res.C:
                    args += ['-C']

                # Legacy name for quad is +
                if res.model == 'quad':
                    res.model = '+'

                # pysim args
                print('Note: Starting pysim for legacy SITL.')
                simargs = [sys.executable, os.path.join(os.path.dirname(__file__), 'pysim/sim_wrapper.py'),
                           '--simin=127.0.0.1:5502', '--simout=127.0.0.1:5501', '--fgout=127.0.0.1:5503',
                           '--home='+res.home, '--frame='+res.model]
                psim = Popen(simargs, cwd=wd, shell=sys.platform == 'win32')

                def cleanup_sim():
                    try:
                        kill(psim.pid)
                    except:
                        pass
                atexit.register(cleanup_sim)

                if verbose:
                    print('Pysim:', ' '.join((simargs)))

        if verbose:
            print('Execute:', ' '.join((args)))

        # # Change CPU core affinity.
        # # TODO change affinity on osx/linux
        # if sys.platform == 'win32':
        #     # 0x14 = 0b1110 = all cores except cpu 1
        #     sitl = Popen(['start', '/affinity', '14', '/realtime', '/b', '/wait'] + sitl_args, shell=True, stdout=PIPE, stderr=PIPE)
        # else:
        #     sitl = Popen(sitl_args, stdout=PIPE, stderr=PIPE)

        # Attempt to delete eeprom.bin
        try:
            os.remove(os.path.join(wd, 'eeprom.bin'))
        except:
            pass

        p = Popen(args, cwd=wd, shell=sys.platform == 'win32', stdout=PIPE, stderr=PIPE)
        self.p = p

        def cleanup():
            try:
                kill(p.pid)
            except:
                pass
        atexit.register(cleanup)

        self.stdout = NonBlockingStreamReader(p.stdout)
        self.stderr = NonBlockingStreamReader(p.stderr)

        # Run dronekit
        if need_sim:
            time.sleep(0.5)
            vehicle = dronekit.connect('tcp:127.0.0.1:5760')
            for line in open(os.path.join(os.path.dirname(__file__), 'defaults.parm')):
                if re.match(r'^\s*#', line):
                    continue
                try:
                    pname, pvalue = line.split()
                    vehicle.parameters.set(pname, float(pvalue), retries=0)
                except Exception as e:
                    import traceback
                    traceback.print_exc()
            vehicle.flush()
            vehicle.close()

        if await_ready:
            self.block_until_ready(verbose=verbose)

    def poll(self):
        return self.p.poll()

    def stop(self):
        kill(self.p.pid)
        while self.p.poll() == None:
            time.sleep(1.0/10.0)

    def block_until_ready(self, verbose=False):
        # Block until "Waiting for connection . . ."
        while self.poll() == None:
            line = self.stdout.readline(0.01)
            if line and verbose:
                sys.stdout.write(line)
            if line and 'Waiting for connection' in line:
                break

            line = self.stderr.readline(0.01)
            if line and verbose:
                sys.stderr.write(line)

        return self.poll()

    def complete(self, verbose=False):
        while True:
            alive = self.poll()

            out = self.stdout.readline(0.01)
            if out and verbose:
                sys.stdout.write(out)

            err = self.stderr.readline(0.01)
            if err and verbose:
                sys.stderr.write(err)

            if not out and not err and alive != None:
                break

def launch(system, version, args):
    return SITL(system, version, args)

def detect_target():
    if sys.platform == 'darwin':
        return 'osx'
    if sys.platform == 'win32':
        return 'win'
    return 'linux'

def reset():
    # delete local sitl installations
    try:
        shutil.rmtree(sitl_target + '/')
    except:
        pass
    print('SITL directory cleared.')

def main(args=None):
    if args == None:
        args = sys.argv[1:]

        if sys.platform == 'win32':
            # Powershell will munge commas as separate arguments
            # which conflicts with how the --home parameter is sent.
            # We opt to just fix this rather than laboriously restructure
            # existing documentation.
            i = 0
            while i < len(args):
                if args[i].startswith('--home'):
                    if args[i] == '--home':
                        args[i] = '--home='
                    i += 1
                    while i < len(args):
                        if re.match(r'[\-+0-9.,]+', args[i]):
                            args[i-1] += ',' + args[i]
                            args[i-1] = re.sub(r'=,', '=', args[i-1])
                            args.pop(i)
                        else:
                            i += 1
                else:
                    i += 1

    # Defaults stabilizes SITL emulation.
    # https://github.com/dronekit/dronekit-sitl/issues/34
    if not any(x.startswith('--home') for x in args):
        args.append('--home=-35.363261,149.165230,584,353')
    if not any(x.startswith('--model') for x in args):
        args.append('--model=quad')

    system = 'copter'
    target = detect_target()
    version = '3.2.1'
    local = False

    if len(args) > 0 and args[0] == '--list':
        versions = version_list()
        for system in [system for system, v in versions.iteritems()]:
            keys = [k for k, v in versions[system].iteritems()]
            keys.sort()
            for k in keys:
                print(system + '-' + k)
        sys.exit(0)

    if len(args) > 0 and args[0] == '--help':
        print('You can look up help for a particular vehicle, e.g.:', file=sys.stderr)
        print('  dronekit-sitl copter --help')
        print('  dronekit-sitl plane-3.3 --help')
        sys.exit(1)

    if len(args) > 0 and args[0] == '--reset':
        reset()
        sys.exit(0)

    if len(args) > 0 and args[0] == '--local':
        local = True

    if len(args) < 1 or not re.match(r'^(copter|plane|solo|rover)(-v?.+)?', args[0]) and not local:
        print('Please specify one of:', file=sys.stderr)
        print('  dronekit-sitl --list', file=sys.stderr)
        print('  dronekit-sitl --reset', file=sys.stderr)
        print('  dronekit-sitl <copter(-version)>', file=sys.stderr)
        print('  dronekit-sitl <plane(-version)>', file=sys.stderr)
        print('  dronekit-sitl <rover(-version)>', file=sys.stderr)
        print('  dronekit-sitl <solo(-version)>', file=sys.stderr)
        sys.exit(1)

    if re.match(r'^copter-v?(.+)', args[0]):
        system = 'copter'
        version = re.match(r'^copter-v?(.+)', args[0]).group(1)
    if re.match(r'^plane-v?(.+)', args[0]):
        system = 'plane'
        version = re.match(r'^plane-v?(.+)', args[0]).group(1)
    if re.match(r'^solo-v?(.+)', args[0]):
        system = 'solo'
        version = re.match(r'^solo-v?(.+)', args[0]).group(1)
    if re.match(r'^rover-v?(.+)', args[0]):
        system = 'rover'
        version = re.match(r'^rover-v?(.+)', args[0]).group(1)
    args = args[1:]

    print('os: %s, apm: %s, release: %s' % (target, system, version))

    sitl = SITL(system, version)
    if not local:
        sitl.download(target, verbose=True)

    sitl.launch(args, verbose=True, local=local)
    # sitl.block_until_ready(verbose=True)
    code = sitl.complete(verbose=True)

    if code != 0:
        sys.exit(code)
