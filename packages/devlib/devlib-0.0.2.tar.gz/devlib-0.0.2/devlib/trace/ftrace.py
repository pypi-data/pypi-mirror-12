#    Copyright 2015 ARM Limited
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

from __future__ import division
import os
import time
import subprocess

from devlib.trace import TraceCollector
from devlib.host import PACKAGE_BIN_DIRECTORY
from devlib.exception import TargetError, HostError
from devlib.utils.misc import check_output, which


TRACE_MARKER_START = 'TRACE_MARKER_START'
TRACE_MARKER_STOP = 'TRACE_MARKER_STOP'
OUTPUT_TRACE_FILE = 'trace.dat'
DEFAULT_EVENTS = [
    'cpu_frequency',
    'cpu_idle',
    'sched_migrate_task',
    'sched_process_exec',
    'sched_process_fork',
    'sched_stat_iowait',
    'sched_switch',
    'sched_wakeup',
    'sched_wakeup_new',
]
TIMEOUT = 180


class FtraceCollector(TraceCollector):

    def __init__(self, target,
                 events=None,
                 buffer_size=None,
                 buffer_size_step=1000,
                 buffer_size_file='/sys/kernel/debug/tracing/buffer_size_kb',
                 marker_file='/sys/kernel/debug/tracing/trace_marker',
                 automark=True,
                 autoreport=True,
                 autoview=False,
                 no_install=False,
                 ):
        super(FtraceCollector, self).__init__(target)
        self.events = events if events is not None else DEFAULT_EVENTS
        self.buffer_size = buffer_size
        self.buffer_size_step = buffer_size_step
        self.buffer_size_file = buffer_size_file
        self.marker_file = marker_file
        self.automark = automark
        self.autoreport = autoreport
        self.autoview = autoview
        self.target_output_file = os.path.join(self.target.working_directory, OUTPUT_TRACE_FILE)
        self.target_binary = None
        self.host_binary = None
        self.start_time = None
        self.stop_time = None
        self.event_string = _build_trace_events(self.events)
        self._reset_needed = True

        self.host_binary = which('trace-cmd')
        self.kernelshark = which('kernelshark')

        if not self.target.is_rooted:
            raise TargetError('trace-cmd instrument cannot be used on an unrooted device.')
        if self.autoreport and self.host_binary is None:
            raise HostError('trace-cmd binary must be installed on the host if autoreport=True.')
        if self.autoview and self.kernelshark is None:
            raise HostError('kernelshark binary must be installed on the host if autoview=True.')
        if not no_install:
            host_file = os.path.join(PACKAGE_BIN_DIRECTORY, self.target.abi, 'trace-cmd')
            self.target_binary = self.target.install(host_file)
        else:
            if not self.target.is_installed('trace-cmd'):
                raise TargetError('No trace-cmd found on device and no_install=True is specified.')
            self.target_binary = 'trace-cmd'

    def reset(self):
        if self.buffer_size:
            self._set_buffer_size()
        self.target.execute('{} reset'.format(self.target_binary), as_root=True, timeout=TIMEOUT)
        self._reset_needed = False

    def start(self):
        self.start_time = time.time()
        if self._reset_needed:
            self.reset()
        if self.automark:
            self.mark_start()
        self.target.execute('{} start {}'.format(self.target_binary, self.event_string), as_root=True)

    def stop(self):
        self.stop_time = time.time()
        if self.automark:
            self.mark_stop()
        self.target.execute('{} stop'.format(self.target_binary), timeout=TIMEOUT, as_root=True)
        self._reset_needed = True

    def get_trace(self, outfile):
        if os.path.isdir(outfile):
            outfile = os.path.join(outfile, os.path.dirname(self.target_output_file))
        self.target.execute('{} extract -o {}'.format(self.target_binary, self.target_output_file),
                            timeout=TIMEOUT, as_root=True)

        # The size of trace.dat will depend on how long trace-cmd was running.
        # Therefore timout for the pull command must also be adjusted
        # accordingly.
        pull_timeout = self.stop_time - self.start_time
        self.target.pull(self.target_output_file, outfile, timeout=pull_timeout)
        if not os.path.isfile(outfile):
            self.logger.warning('Binary trace not pulled from device.')
        else:
            if self.autoreport:
                textfile = os.path.splitext(outfile)[0] + '.txt'
                self.report(outfile, textfile)
            if self.autoview:
                self.view(outfile)

    def report(self, binfile, destfile):
        # To get the output of trace.dat, trace-cmd must be installed
        # This is done host-side because the generated file is very large
        try:
            command = '{} report {} > {}'.format(self.host_binary, binfile, destfile)
            self.logger.debug(command)
            process = subprocess.Popen(command, stderr=subprocess.PIPE, shell=True)
            _, error = process.communicate()
            if process.returncode:
                raise TargetError('trace-cmd returned non-zero exit code {}'.format(process.returncode))
            if error:
                # logged at debug level, as trace-cmd always outputs some
                # errors that seem benign.
                self.logger.debug(error)
            if os.path.isfile(destfile):
                self.logger.debug('Verifying traces.')
                with open(destfile) as fh:
                    for line in fh:
                        if 'EVENTS DROPPED' in line:
                            self.logger.warning('Dropped events detected.')
                            break
                    else:
                        self.logger.debug('Trace verified.')
            else:
                self.logger.warning('Could not generate trace.txt.')
        except OSError:
            raise HostError('Could not find trace-cmd. Please make sure it is installed and is in PATH.')

    def view(self, binfile):
        check_output('{} {}'.format(self.kernelshark, binfile), shell=True)

    def teardown(self):
        self.target.remove(self.target.path.join(self.target.working_directory, OUTPUT_TRACE_FILE))

    def mark_start(self):
        self.target.write_value(self.marker_file, TRACE_MARKER_START, verify=False)

    def mark_stop(self):
        self.target.write_value(self.marker_file, TRACE_MARKER_STOP, verify=False)

    def _set_buffer_size(self):
        target_buffer_size = self.buffer_size
        attempt_buffer_size = target_buffer_size
        buffer_size = 0
        floor = 1000 if target_buffer_size > 1000 else target_buffer_size
        while attempt_buffer_size >= floor:
            self.target.write_value(self.buffer_size_file, attempt_buffer_size, verify=False)
            buffer_size = self.target.read_int(self.buffer_size_file)
            if buffer_size == attempt_buffer_size:
                break
            else:
                attempt_buffer_size -= self.buffer_size_step
        if buffer_size == target_buffer_size:
            return
        while attempt_buffer_size < target_buffer_size:
            attempt_buffer_size += self.buffer_size_step
            self.target.write_value(self.buffer_size_file, attempt_buffer_size, verify=False)
            buffer_size = self.target.read_int(self.buffer_size_file)
            if attempt_buffer_size != buffer_size:
                message = 'Failed to set trace buffer size to {}, value set was {}'
                self.logger.warning(message.format(target_buffer_size, buffer_size))
                break


def _build_trace_events(events):
    event_string = ' '.join(['-e {}'.format(e) for e in events])
    return event_string

