******************
prettyrecord
******************

prettyrecord allows you to define your data structures in declarative way,
similar to SQLAlchemy's declarative_base or Django's models. To achieve the goal,
prettyrecord uses Python's descriptor and metaclass mechanisms.

Usage
-----

- to define new structure, subclass Record or derived class and fill with fields, eg.::

    from prettyrecord import Record


    class DummyRecord(Record, some_trait=False):
        field1 = Field(required=True, default_value='')
        field2 = Field(default_value=0)
        field3 = ListField(constraint=lambda value: -5 < value < 5)


    dr = DummyRecord(field1='foo', field3=[-2, 3, 1, 0, 4)
    print(dr.field1)          # shows 'foo'
    print(dr.__some_trait__)  # shows 'False'

- to define new field, subclass Field, RecordField, ListField or derived class, eg.::

    from prettyrecord import Field


    class Integer(Field):
        def normalize(self, value):
            value = super(Integer, self).normalize(value)
            return int(value)

- to change creation process of your structures, subclass MetaRecord and define new base class for them, eg.::

    from prettyrecord.record import Record, MetaRecord


    class MetaMyRecord(MetaRecord):
        def __new__(mcs, name, bases, attrs, **kwargs):
            # your code here - remember to call super().__new__

        def __init__(cls, name, bases, attrs, **kwargs):
            # your code here - remember to call super().__init__


    class MyRecord(Record, metaclass=MetaMyRecord):
        pass

