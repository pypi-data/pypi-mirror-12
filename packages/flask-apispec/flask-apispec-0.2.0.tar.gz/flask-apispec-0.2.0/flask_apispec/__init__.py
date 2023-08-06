# -*- coding: utf-8 -*-

__version__ = '0.2.0'

from flask_apispec.views import ResourceMeta
from flask_apispec.extension import FlaskApiSpec
from flask_apispec.annotations import doc, wrap_with, use_kwargs, marshal_with
from flask_apispec.utils import Ref

__all__ = [
    'doc',
    'wrap_with',
    'use_kwargs',
    'marshal_with',
    'ResourceMeta',
    'FlaskApiSpec',
    'Ref',
]
