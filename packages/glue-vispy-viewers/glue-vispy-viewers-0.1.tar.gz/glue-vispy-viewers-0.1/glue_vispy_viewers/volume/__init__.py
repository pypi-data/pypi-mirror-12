__author__ = 'penny'


def setup():
    from .vol_glue_viewer import GlueVispyViewer
    from glue.config import qt_client
    qt_client.add(GlueVispyViewer)