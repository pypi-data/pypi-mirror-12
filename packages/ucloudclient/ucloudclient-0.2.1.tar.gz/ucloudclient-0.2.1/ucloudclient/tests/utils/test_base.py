import mock
from testtools import TestCase

from ucloudclient.utils import base
from ucloudclient import client


class HTTPClientTest(TestCase):
    @mock.patch('ucloudclient.utils.base.HTTPClient')
    def test_contextmanager(self, mock_http_client):
        client.Client('base_url', 'public_key', 'private_key')
        assert mock_http_client.called

    def test_url(self):
        cs = base.HTTPClient(base_url='test_url')
        self.assertIsNone(cs.debug)
        self.assertIsNone(cs.timing)
        self.assertEqual("test_url", cs.base_url)
