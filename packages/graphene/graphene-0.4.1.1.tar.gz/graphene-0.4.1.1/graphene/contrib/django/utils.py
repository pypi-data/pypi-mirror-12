from django.db import models
from django.db.models.manager import Manager
from django.db.models.query import QuerySet

from ...utils import LazyMap


def get_type_for_model(schema, model):
    schema = schema
    types = schema.types.values()
    for _type in types:
        type_model = hasattr(_type, '_meta') and getattr(
            _type._meta, 'model', None)
        if model == type_model:
            return _type


def get_reverse_fields(model):
    for name, attr in model.__dict__.items():
        related = getattr(attr, 'related', None)
        if isinstance(related, models.ManyToOneRel):
            yield related


def lazy_map(value, func):
    if isinstance(value, Manager):
        value = value.get_queryset()
    if isinstance(value, QuerySet):
        return LazyMap(value, func)
    return value
