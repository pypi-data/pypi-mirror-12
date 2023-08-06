"""
    flask_transfer
    ~~~~~~~~~~~~~~
    Provides hooks for validating, preprocessing and postprocessing file
    uploads.
"""

from .exc import UploadError
from .transfer import Transfer
from . import validators


__version__ = "0.1.0"
__author__ = 'Alec Reiter'
