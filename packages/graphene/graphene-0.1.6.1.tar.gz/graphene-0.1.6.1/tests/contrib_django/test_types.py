from py.test import raises
from collections import namedtuple
from pytest import raises
from graphene.relay.fields import (
    GlobalIDField
)
from graphene.core.fields import (
    Field,
    StringField,
    IntField
)
from graphql.core.type import (
    GraphQLObjectType,
    GraphQLInterfaceType
)

from graphene import Schema
from graphene.contrib.django.types import (
    DjangoNode,
    DjangoInterface
)

from .models import Reporter, Article

from tests.utils import assert_equal_lists


class Character(DjangoInterface):
    '''Character description'''
    class Meta:
        model = Reporter


class Human(DjangoNode):
    '''Human description'''

    pub_date = IntField()

    def get_node(self, id):
        pass

    class Meta:
        model = Article

schema = Schema()


def test_django_interface():
    assert DjangoNode._meta.interface is True


def test_pseudo_interface():
    object_type = Character.internal_type(schema)
    assert Character._meta.interface is True
    assert isinstance(object_type, GraphQLInterfaceType)
    assert Character._meta.model == Reporter
    assert_equal_lists(
        object_type.get_fields().keys(),
        ['articles', 'firstName', 'lastName', 'email', 'pets', 'id']
    )


def test_djangonode_idfield():
    idfield = DjangoNode._meta.fields_map['id']
    assert isinstance(idfield, GlobalIDField)


def test_node_idfield():
    idfield = Human._meta.fields_map['id']
    assert isinstance(idfield, GlobalIDField)


def test_node_replacedfield():
    idfield = Human._meta.fields_map['pub_date']
    assert isinstance(idfield, IntField)


def test_interface_resolve_type():
    resolve_type = Character.resolve_type(schema, Human(object()))
    assert isinstance(resolve_type, GraphQLObjectType)


def test_object_type():
    object_type = Human.internal_type(schema)
    fields_map = Human._meta.fields_map
    assert Human._meta.interface is False
    assert isinstance(object_type, GraphQLObjectType)
    assert_equal_lists(
        object_type.get_fields().keys(),
        ['headline', 'id', 'reporter', 'pubDate']
    )
    # assert object_type.get_fields() == {
    #     'headline': fields_map['headline'].internal_field(schema),
    #     'id': fields_map['id'].internal_field(schema),
    #     'reporter': fields_map['reporter'].internal_field(schema),
    #     'pubDate': fields_map['pub_date'].internal_field(schema),
    # }
    assert DjangoNode.internal_type(schema) in object_type.get_interfaces()


def test_node_notinterface():
    assert Human._meta.interface is False
    assert DjangoNode in Human._meta.interfaces
