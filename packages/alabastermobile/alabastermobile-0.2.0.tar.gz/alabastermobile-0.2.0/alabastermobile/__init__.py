import os

from alabastermobile import _version as version

__version__ = version.__version__

def get_path():
    """
    Shortcut for users whose theme is next to their conf.py.
    """
    # Theme directory is defined as our parent directory
    return os.path.abspath(os.path.dirname(os.path.dirname(__file__)))


def update_context(app, pagename, templatename, context, doctree):
    context['alabastermobile_version'] = version.__version__

def setup(app):
    app.connect('html-page-context', update_context)
    return {'version': version.__version__,
            'parallel_read_safe': True}
