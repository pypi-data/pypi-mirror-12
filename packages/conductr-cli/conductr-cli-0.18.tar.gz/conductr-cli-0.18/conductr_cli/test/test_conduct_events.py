from unittest import TestCase
from conductr_cli.test.cli_test_case import CliTestCase, strip_margin
from conductr_cli import conduct_events

try:
    from unittest.mock import patch, MagicMock  # 3.3 and beyond
except ImportError:
    from mock import patch, MagicMock


class TestConductEventsCommand(TestCase, CliTestCase):

    default_args = {
        'ip': '127.0.0.1',
        'port': '9005',
        'api_version': '1.0',
        'bundle': 'ab8f513',
        'lines': 1,
        'date': True,
        'utc': True
    }

    default_url = 'http://127.0.0.1:9005/bundles/ab8f513/events?count=1'

    def test_no_events(self):
        http_method = self.respond_with(text='{}')
        stdout = MagicMock()

        with patch('requests.get', http_method), patch('sys.stdout', stdout):
            conduct_events.events(MagicMock(**self.default_args))

        http_method.assert_called_with(self.default_url)
        self.assertEqual(
            strip_margin("""|TIME  EVENT  DESC
                            |"""),
            self.output(stdout))

    def test_multiple_events(self):
        http_method = self.respond_with(text="""[
            {
                "timestamp":"2015-08-24T01:16:22.327Z",
                "event":"conductr.loadScheduler.loadBundleRequested",
                "description":"Load bundle requested: requestId=cba938cd-860e-41a4-9cbe-2c677feaca20, bundleName=visualizer"
            },
            {
                "timestamp":"2015-08-24T01:16:25.327Z",
                "event":"conductr.loadExecutor.bundleWritten",
                "description":"Bundle written: requestId=cba938cd-860e-41a4-9cbe-2c677feaca20, bundleName=visualizer"
            }
        ]""")
        stdout = MagicMock()

        with patch('requests.get', http_method), patch('sys.stdout', stdout):
            conduct_events.events(MagicMock(**self.default_args))

        http_method.assert_called_with(self.default_url)
        self.assertEqual(
            strip_margin("""|TIME                  EVENT                                       DESC
                            |2015-08-24T01:16:22Z  conductr.loadScheduler.loadBundleRequested  Load bundle requested: requestId=cba938cd-860e-41a4-9cbe-2c677feaca20, bundleName=visualizer
                            |2015-08-24T01:16:25Z  conductr.loadExecutor.bundleWritten         Bundle written: requestId=cba938cd-860e-41a4-9cbe-2c677feaca20, bundleName=visualizer
                            |"""),
            self.output(stdout))

    def test_failure_invalid_address(self):
        http_method = self.raise_connection_error('test reason', self.default_url)
        stderr = MagicMock()

        with patch('requests.get', http_method), patch('sys.stderr', stderr):
            conduct_events.events(MagicMock(**self.default_args))

        http_method.assert_called_with(self.default_url)
        self.assertEqual(
            self.default_connection_error.format(self.default_url),
            self.output(stderr))
