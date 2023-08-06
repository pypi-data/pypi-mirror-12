import io
import time
import unittest

import mock
from binstar_build_client.worker.utils.timeout import read_with_timeout

class MockProcess(object):
    def __init__(self, *args, **kwargs):
        self.pid = 1
        self.ct = 0
        self.sleep_time = kwargs.get('sleep_time', 0.1)
        self.limit_lines = kwargs.get('limit_lines', 10)

    def readline(self, n=0):
        if self.ct >= self.limit_lines:
            return b''
        time.sleep(self.sleep_time)
        self.ct += 1
        return b'ping'

    def kill(self):
        return

    def wait(self):
        return

class TestReadWithTimeout(unittest.TestCase):
    def test_good_build(self):
        """
        reads a process that takes 3s to complete, with 60s timeout
        """
        pings = 3
        p0 = MockProcess(limit_lines=pings)
        output = io.BytesIO()
        read_with_timeout(p0, output)
        self.assertEqual(pings, output.getvalue().count(b'ping'))

    def test_iotimeout_build_1(self):
        """
        reads a process that takes 1.5s to complete, with 0.5s timeout
        """
        pings = 3
        p0 = MockProcess(limit_lines=pings, sleep_time=3)
        output = io.BytesIO()
        read_with_timeout(p0, output, iotimeout=0.5)
        out = output.getvalue()
        self.assertIn(b'iotimeout', out)


    def test_timeout_build(self):
        pings = 3
        p0 = MockProcess(limit_lines=pings, sleep_time=1)
        output = io.BytesIO()
        read_with_timeout(p0, output, timeout=0.5)
        out = output.getvalue()
        self.assertIn(b'\nTimeout', out)

    def test_user_terminated_build(self):

        def terminate(count=[]):
            count.append(None)
            return len(count) >= 3
        pings = 30
        p0 = MockProcess(limit_lines=pings, sleep_time=1)
        output = io.BytesIO()
        read_with_timeout(p0, output, build_was_stopped_by_user=terminate)
        out = output.getvalue()
        self.assertIn(b'User requested', out)

if __name__ == '__main__':
    unittest.main()
