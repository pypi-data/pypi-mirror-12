# Author: Christian Brodbeck <christianbrodbeck@nyu.edu>
"""Fix up surfer.Brain"""
from distutils.version import LooseVersion
import sys

# surfer imports, revert to standard logging
first_import = 'surfer' not in sys.modules
import surfer
if first_import:
    from ..mne_fixes import reset_logger
    reset_logger(surfer.utils.logger)
from surfer import Brain as SurferBrain
from ._brain_mixin import BrainMixin


def assert_can_save_movies():
    if LooseVersion(surfer.__version__) < LooseVersion('0.6'):
        raise ImportError("Saving movies requires PySurfer 0.6")


class Brain(BrainMixin, SurferBrain):

    def __init__(self, unit, *args, **kwargs):
        BrainMixin.__init__(self, unit)
        SurferBrain.__init__(self, *args, **kwargs)
