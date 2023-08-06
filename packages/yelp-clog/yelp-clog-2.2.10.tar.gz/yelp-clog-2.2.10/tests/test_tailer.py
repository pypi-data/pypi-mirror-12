# -*- coding: utf-8 -*-
from builtins import range
from builtins import str

import codecs
import itertools
import os
import shutil
import socket
import tempfile
import time

import pytest
import mock
from testifycompat import setup_teardown
from testifycompat import assert_equal

from clog import readers, loggers
from testing import sandbox


TEST_STREAM_PREFIX = 'tmp_clog_package_unittest_'


def get_nonce_str(num_bytes=16):
    return codecs.encode(os.urandom(num_bytes), 'hex_codec').decode('ascii')


def wait_on_lines(tailer, num_lines=10, timeout=15, delay=0.1):
    """Tail the scribe service, get `num_lines` from stream `stream`."""
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            return list(itertools.islice(iter(tailer), num_lines))
        except socket.error:
            time.sleep(0.1)


@pytest.mark.acceptance_suite
class TestStreamTailerAcceptance(object):


    @setup_teardown
    def setup_sandbox(self):
        scribe_logdir = tempfile.mkdtemp()
        self.stream = TEST_STREAM_PREFIX + get_nonce_str(8)
        scribed_port = sandbox.find_open_port()
        tailer_port = sandbox.find_open_port()

        log_path = os.path.join(scribe_logdir,
                                '%s/%s_current' % (self.stream, self.stream))

        self.tailer = readers.StreamTailer(
                self.stream,
                add_newlines=False,
                automagic_recovery=False,
                timeout=0.2,
                host='localhost',
                port=tailer_port)

        self.logger = loggers.ScribeLogger('localhost', scribed_port, 10)

        with sandbox.scribed_sandbox(scribed_port, scribe_logdir):
            with sandbox.tailer_sandbox(tailer_port, log_path):
                yield
        shutil.rmtree(scribe_logdir)

    def test_log_and_tail(self):
        nonce = get_nonce_str()
        num_lines, read_lines = 10, 8
        lines = ["%s %d" % (nonce, i) for i in range(num_lines)]
        for line in lines:
            self.logger.log_line(self.stream, line)

        encoded_lines = [line.encode('utf8') for line in lines]
        result = wait_on_lines(self.tailer, read_lines)
        assert_equal(result, encoded_lines[:read_lines])

    def test_unicode(self):
        eszett_str = get_nonce_str() + " " + u'\xdf'
        assert isinstance(eszett_str, str)

        for _ in range(10):
            self.logger.log_line(self.stream, eszett_str)

        eszett_str_utf8 = eszett_str.encode('utf-8')

        lines = wait_on_lines(self.tailer, 1)
        assert_equal(lines, [eszett_str_utf8])

    def test_tail_lines(self):
        tailer = readers.StreamTailer(
                self.stream,
                add_newlines=False,
                automagic_recovery=False,
                timeout=0.2,
                host='localhost',
                port=1234,
                use_kafka=True,
                lines=2)
        assert tailer._stream == self.stream + ' 2'


def test_find_tail_host():
    assert readers.find_tail_host('fakehost') == 'fakehost'


def get_settings_side_effect(*args, **kwargs):
    if args[0] == 'DEFAULT_SCRIBE_TAIL_HOST':
        return 'scribe.local.yelpcorp.com'
    elif args[0] == 'HOST_TO_TAIL_HOST':
        return {'scribe.local.yelpcorp.com': 'local'}
    elif args[0] == 'REGION_TO_TAIL_HOST':
        return {'region1': 'tail-host1.prod.yelpcorp.com'}
    elif args[0] == 'ECOSYSTEM_TO_TAIL_HOST':
        return {'eco1': 'tail-host2.dev.yelpcorp.com'}


@mock.patch('clog.readers.get_settings')
@mock.patch('clog.readers.get_ecosystem_from_file')
@mock.patch('clog.readers.get_region_from_file')
def test_find_tail_host_prod(mock_region, mock_ecosystem, mock_settings):
    mock_ecosystem.return_value = 'prod'
    mock_region.return_value = 'region1'
    mock_settings.side_effect = get_settings_side_effect
    assert readers.find_tail_host() == readers.find_tail_host('scribe.local.yelpcorp.com') == 'tail-host1.prod.yelpcorp.com'


@mock.patch('clog.readers.get_settings')
@mock.patch('clog.readers.get_ecosystem_from_file')
def test_find_tail_host_devb(mock_ecosystem, mock_settings):
    mock_ecosystem.return_value = 'eco1'
    mock_settings.side_effect = get_settings_side_effect
    assert readers.find_tail_host() == readers.find_tail_host('scribe.local.yelpcorp.com') == 'tail-host2.dev.yelpcorp.com'
