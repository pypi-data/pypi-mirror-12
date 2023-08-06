import graphene
from graphene import resolve_only_args, relay

from .data import (
    get_faction,
    get_ship,
    get_rebels,
    get_empire,
    create_ship,
)

schema = graphene.Schema(name='Starwars Relay Schema')


class Ship(relay.Node):
    '''A ship in the Star Wars saga'''
    name = graphene.StringField(description='The name of the ship.')

    @classmethod
    def get_node(cls, id):
        return get_ship(id)


class Faction(relay.Node):
    '''A faction in the Star Wars saga'''
    name = graphene.StringField(description='The name of the faction.')
    ships = relay.ConnectionField(
        Ship, description='The ships used by the faction.')

    @resolve_only_args
    def resolve_ships(self, **args):
        # Transform the instance ship_ids into real instances
        return [get_ship(ship_id) for ship_id in self.ships]

    @classmethod
    def get_node(cls, id):
        return get_faction(id)


class IntroduceShip(relay.ClientIDMutation):
    class Input:
        ship_name = graphene.StringField(required=True)
        faction_id = graphene.StringField(required=True)

    ship = graphene.Field(Ship)
    faction = graphene.Field(Faction)

    @classmethod
    def mutate_and_get_payload(cls, input, info):
        ship_name = input.get('ship_name')
        faction_id = input.get('faction_id')
        ship = create_ship(ship_name, faction_id)
        faction = get_faction(faction_id)
        return IntroduceShip(ship=ship, faction=faction)


class Query(graphene.ObjectType):
    rebels = graphene.Field(Faction)
    empire = graphene.Field(Faction)
    node = relay.NodeField()

    @resolve_only_args
    def resolve_rebels(self):
        return get_rebels()

    @resolve_only_args
    def resolve_empire(self):
        return get_empire()


class Mutation(graphene.ObjectType):
    introduce_ship = graphene.Field(IntroduceShip)


schema.query = Query
schema.mutation = Mutation
