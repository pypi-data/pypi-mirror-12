from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from ripozo.resources.fields.common import StringField, IntegerField
from ripozo.exceptions import NotFoundException

from ripozo_sqlalchemy import AlchemyManager, ScopedSessionHandler

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import unittest2


Base = declarative_base(create_engine('sqlite:///:memory:', echo=True))
session = sessionmaker()()


class Person(Base):
    __tablename__ = 'person'
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)

Base.metadata.create_all()


class PersonManager(AlchemyManager):
    session = session
    model = Person
    paginate_by = 10
    fields = ('id', 'first_name', 'last_name')


class TestAlchemyManager(unittest2.TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', echo=True)

    @property
    def manager(self):
        session_handler = ScopedSessionHandler(self.engine)
        return PersonManager(session_handler)

    @property
    def all_person_models(self):
        return session.query(Person).all()

    def get_person_model_by_id(self, person_id):
        to_return = session.query(Person).get(person_id)
        if to_return is None:
            raise NotFoundException
        return to_return

    @property
    def does_not_exist_exception(self):
        return NotFoundException

    def test_get_field_type(self):
        manager = self.manager
        self.assertIsInstance(manager.get_field_type('first_name'), StringField)
        self.assertIsInstance(manager.get_field_type('last_name'), StringField)
        self.assertIsInstance(manager.get_field_type('id'), IntegerField)
