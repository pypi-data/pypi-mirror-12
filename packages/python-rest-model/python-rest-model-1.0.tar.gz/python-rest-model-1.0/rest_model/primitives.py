"""Implements the building blocks of data types using Descriptor protocol."""


class Descriptor:
    def __init__(self, name=None):
        self._name = name

    def __set__(self, instance, value):
        instance.__dict__[self._name] = value


class Typed(Descriptor):
    _expected_type = type(None)

    def __set__(self, instance, value):
        if not isinstance(value, self._expected_type):
            raise TypeError("expected {}".format(self._expected_type))
        super().__set__(instance, value)


class Integer(Typed):
    _expected_type = int


class Float(Typed):
    _expected_type = float


class String(Typed):
    _expected_type = str


class List(Typed):
    _expected_type = list


class Positive(Descriptor):
    def __set__(self, instance, value):
        if value < 0:
            raise TypeError("Expected value to be >= 0")
        super().__set__(instance, value)
