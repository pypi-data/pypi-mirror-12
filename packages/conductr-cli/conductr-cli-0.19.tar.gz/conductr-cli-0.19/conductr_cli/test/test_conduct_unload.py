from conductr_cli.test.cli_test_case import CliTestCase, strip_margin, as_error
from conductr_cli import conduct_unload
from conductr_cli.http import DEFAULT_HTTP_TIMEOUT

try:
    from unittest.mock import patch, MagicMock  # 3.3 and beyond
except ImportError:
    from mock import patch, MagicMock


class TestConductUnloadCommand(CliTestCase):

    @property
    def default_response(self):
        return strip_margin("""|{
                               |  "bundleId": "45e0c477d3e5ea92aa8d85c0d8f3e25c"
                               |}
                               |""")

    default_args = {
        'ip': '127.0.0.1',
        'port': 9005,
        'api_version': '1',
        'verbose': False,
        'cli_parameters': '',
        'bundle': '45e0c477d3e5ea92aa8d85c0d8f3e25c'
    }

    default_url = 'http://127.0.0.1:9005/bundles/45e0c477d3e5ea92aa8d85c0d8f3e25c'

    output_template = """|Bundle unload request sent.
                         |Print ConductR info with: conduct info{params}
                         |"""

    def default_output(self, params=''):
        return strip_margin(self.output_template.format(**{'params': params}))

    def test_success(self):
        http_method = self.respond_with(200, self.default_response)
        stdout = MagicMock()

        with patch('requests.delete', http_method), patch('sys.stdout', stdout):
            conduct_unload.unload(MagicMock(**self.default_args))

        http_method.assert_called_with(self.default_url, timeout=DEFAULT_HTTP_TIMEOUT)

        self.assertEqual(self.default_output(), self.output(stdout))

    def test_success_verbose(self):
        http_method = self.respond_with(200, self.default_response)
        stdout = MagicMock()

        with patch('requests.delete', http_method), patch('sys.stdout', stdout):
            args = self.default_args.copy()
            args.update({'verbose': True})
            conduct_unload.unload(MagicMock(**args))

        http_method.assert_called_with(self.default_url, timeout=DEFAULT_HTTP_TIMEOUT)

        self.assertEqual(self.default_response + self.default_output(), self.output(stdout))

    def test_success_with_configuration(self):
        http_method = self.respond_with(200, self.default_response)
        stdout = MagicMock()

        cli_parameters = ' --ip 127.0.1.1 --port 9006'
        with patch('requests.delete', http_method), patch('sys.stdout', stdout):
            args = self.default_args.copy()
            args.update({'cli_parameters': cli_parameters})
            conduct_unload.unload(MagicMock(**args))

        http_method.assert_called_with(self.default_url, timeout=DEFAULT_HTTP_TIMEOUT)

        self.assertEqual(
            self.default_output(params=cli_parameters),
            self.output(stdout))

    def test_failure(self):
        http_method = self.respond_with(404)
        stderr = MagicMock()

        with patch('requests.delete', http_method), patch('sys.stderr', stderr):
            conduct_unload.unload(MagicMock(**self.default_args))

        http_method.assert_called_with(self.default_url, timeout=DEFAULT_HTTP_TIMEOUT)

        self.assertEqual(
            as_error(strip_margin("""|Error: 404 Not Found
                                     |""")),
            self.output(stderr))

    def test_failure_invalid_address(self):
        http_method = self.raise_connection_error('test reason', self.default_url)
        stderr = MagicMock()

        with patch('requests.delete', http_method), patch('sys.stderr', stderr):
            conduct_unload.unload(MagicMock(**self.default_args))

        http_method.assert_called_with(self.default_url, timeout=DEFAULT_HTTP_TIMEOUT)

        self.assertEqual(
            self.default_connection_error.format(self.default_url),
            self.output(stderr))
