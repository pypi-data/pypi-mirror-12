from collections import OrderedDict
from functools import partial
from graphql.core.type.definition import GraphQLInterfaceType
from ..utils.get_declared_fields import get_declared_fields
from ..utils.make_default_resolver import make_default_resolver
from ..utils.weak_ref_holder import WeakRefHolder
from ..utils.yank_potential_fields import yank_potential_fields


class InterfaceMeta(type):
    def __new__(mcs, name, bases, attrs):
        if attrs.pop('abstract', False):
            return super(InterfaceMeta, mcs).__new__(mcs, name, bases, attrs)

        class_ref = WeakRefHolder()
        declared_fields = get_declared_fields(name, yank_potential_fields(attrs))
        interface = GraphQLInterfaceType(
            name,
            fields=partial(mcs._build_field_map, class_ref, declared_fields),
            description=attrs.get('__doc__'),
        )

        mcs._register(interface, declared_fields)
        cls = super(InterfaceMeta, mcs).__new__(mcs, name, bases, attrs)
        cls.T = interface
        cls._registry = mcs._get_registry()
        class_ref.set(cls)

        return cls

    @staticmethod
    def _register(object_type, declared_fields):
        raise NotImplementedError('_register must be implemented in the sub-metaclass')

    @staticmethod
    def _get_registry():
        raise NotImplementedError('_get_registry must be implemented in the sub-metaclass')

    @staticmethod
    def _build_field_map(class_ref, fields):
        cls = class_ref.get()
        if not cls:
            return

        instance = cls()
        registry = cls._registry

        field_map = OrderedDict()

        for field_attr_name, field in fields:
            interface_resolve_fn = (
                field.resolver or
                getattr(instance, 'resolve_{}'.format(field_attr_name), None)
            )

            if interface_resolve_fn:
                field._interface_resolver = interface_resolve_fn

            resolve_fn = interface_resolve_fn or make_default_resolver(field_attr_name)

            field_map[field.name] = field.to_field(registry, resolve_fn)

        return field_map
