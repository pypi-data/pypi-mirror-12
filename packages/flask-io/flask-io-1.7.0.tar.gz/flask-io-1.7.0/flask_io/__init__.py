# Make marshmallow's functions and classes importable from flask-io
from marshmallow import pre_load, pre_dump, post_load, post_dump, Schema, ValidationError
from marshmallow.utils import missing

from .io import FlaskIO
from .utils import Error

__version__ = '1.7.0'
__author__ = 'Vinicius Chiele'
__license__ = 'MIT'
