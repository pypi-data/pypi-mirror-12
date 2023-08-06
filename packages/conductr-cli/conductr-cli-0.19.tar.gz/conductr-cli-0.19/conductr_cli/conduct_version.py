from conductr_cli import __version__


def supported_api_versions():
    return ['1', '2']


def version():
    """`conduct version` command"""
    print(__version__)
    print('Supported API version(s): {}'.format(', '.join(supported_api_versions())))
