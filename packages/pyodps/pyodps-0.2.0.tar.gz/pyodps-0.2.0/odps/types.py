#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

import re
import decimal as _decimal
from datetime import datetime as _datetime

import six

from . import utils
from . import compat


class Column(object):
    def __init__(self, name=None, typo=None, comment=None, label=None):
        self.name = name
        self.type = validate_data_type(typo)
        self.comment = comment
        self.label = label


class Partition(Column):
    pass


class PartitionSpec(object):
    def __init__(self, spec=None):
        self.kv = compat.OrderedDict()

        if spec is not None:
            splits = spec.split(',')
            for sp in splits:
                kv = sp.split('=')
                if len(kv) != 2:
                    raise ValueError('Invalid partition spec')

                k, v = kv[0].strip(), kv[1].strip()\
                    .replace('"', '').replace("'", '')

                if len(k) == 0 or len(v) == 0:
                    raise ValueError('Invalid partition spec')

                self.kv[k] = v

    def __setitem__(self, key, value):
        self.kv[key] = value

    def __getitem__(self, key):
        return self.kv[key]

    def __len__(self):
        return len(self.kv)

    @property
    def is_empty(self):
        return len(self) == 0

    @property
    def keys(self):
        return compat.lkeys(self.kv)

    def __contains__(self, key):
        return key in self.kv

    def __str__(self):
        return ','.join("%s='%s'" % (k, v) for k, v in six.iteritems(self.kv))


class Schema(object):
    def __init__(self, names, types):
        self._init(names, types)

    def _init(self, names, types):
        if not isinstance(names, list):
            names = list(names)
        self.names = names
        self.types = [validate_data_type(t) for t in types]

        self._name_indexes = dict((n, i) for i, n in enumerate(self.names))

        if len(self._name_indexes) < len(self.names):
            raise ValueError('Duplicate column names')

    def __repr__(self):
        return self._repr()

    def __len__(self):
        return len(self.names)

    def __contains__(self, name):
        return name in self._names_indexes

    def _repr(self):
        buf = six.StringIO()
        space = 2 * max(len(it) for it in self.names)
        for name, tp in zip(self.names, self.types):
            buf.write('\n{0}{1}'.format(name.ljust(space), repr(tp)))

        return 'odps.Schema {{{0}\n}}'.format(utils.indent(buf.getvalue(), 2))

    def __eq__(self, other):
        if not isinstance(other, Schema):
            return False
        return self.names == other.names and self.types == self.types

    def get_type(self, name):
        return self.types[self._name_indexes[name]]

    def append(self, name, typo):
        names = self.names + [name, ]
        types = self.types + [typo, ]
        return Schema(names, types)

    def extend(self, schema):
        names = self.names + schema.names
        types = self.types + schema.types
        return Schema(names, types)


class OdpsSchema(Schema):
    def __init__(self, columns=None, partitions=None):
        self._columns = columns
        self._partitions = partitions

        if self._columns:
            super(OdpsSchema, self).__init__(
                *compat.lzip(*[(c.name, c.type) for c in self._columns]))
        else:
            super(OdpsSchema, self).__init__([], [])

        if self._partitions:
            self._partition_schema = Schema(
                *compat.lzip(*[(c.name, c.type) for c in self._partitions]))
        else:
            self._partition_schema = Schema([], [])

    def __len__(self):
        return super(OdpsSchema, self).__len__() + len(self._partition_schema)

    def __contains__(self, name):
        return name in self or name in self._partition_schema

    def __eq__(self, other):
        if not isinstance(other, OdpsSchema):
            return False

        return super(OdpsSchema, self).__eq__(other) and \
            self._partition_schema == other._partition_schema

    def _repr(self):
        # TODO output ODPS info
        return super(OdpsSchema, self)._repr()

    @property
    def columns(self):
        partitions = self._partitions or []
        return self._columns + partitions

    def get_columns(self):
        return self._columns

    def get_partitions(self):
        return self._partitions

    def get_column(self, name):
        index = self._name_indexes.get(name)
        if index is None:
            raise ValueError('Column %s does not exists' % name)
        return self._columns[index]

    def get_partition(self, name):
        index = self._partition_schema._name_indexes.get(name)
        if index is None:
            raise ValueError('Partition %s does not exists' % name)
        return self._partitions[index]

    def is_partition(self, name):
        if isinstance(name, Partition):
            return True
        if isinstance(name, Column):
            name = name.name
        try:
            self.get_partition(name)
            return True
        except ValueError:
            return False

    def update(self, columns, partitions):
        self._columns = columns
        self._partitions = partitions

        names = map(lambda c: c.name, self._columns)
        types = map(lambda c: c.type, self._columns)

        self._init(names, types)
        if self._partitions:
            self._partition_schema = Schema(
                *compat.lzip(*[(c.name, c.type) for c in self._partitions]))
        else:
            self._partition_schema = Schema([], [])

    @classmethod
    def from_lists(cls, names, types, partition_names=None, partition_types=None):
        columns = [Column(name=name, typo=typo) for name, typo in zip(names, types)]
        if partition_names is not None and partition_types is not None:
            partitions = [Partition(name=name, typo=typo)
                          for name, typo in zip(partition_names, partition_types)]
        else:
            partitions = None
        return cls(columns=columns, partitions=partitions)


class Record(object):
    # set __slots__ to save memory in the situation that records' size may be quite large
    __slots__ = '_values', '_columns', '_name_indexes'

    def __init__(self, columns=None, schema=None, values=None):
        self._columns = columns or schema.columns
        if self._columns is None:
            raise ValueError('Either columns or schema should not be provided')

        self._values = [None, ] * len(self._columns)
        if values is not None:
            self._sets(values)
        self._name_indexes = dict((col.name, i) for i, col in enumerate(self._columns))

    def _exclude_partition_columns(self):
        return [col for col in self._columns if not isinstance(col, Partition)]

    def _get(self, i):
        return self._values[i]

    def _set(self, i, value):
        data_type = self._columns[i].type
        val = validate_value(value, data_type)
        self._values[i] = val

    get = _get  # to keep compatible
    set = _set  # to keep compatible

    def _sets(self, values):
        if len(values) != len(self._columns) and \
                        len(values) != len(self._exclude_partition_columns()):
            raise ValueError('The values set to records are against the schema, '
                             'expect len %s, got len %s' % (len(self._columns), len(values)))
        [self._set(i, value) for i, value in enumerate(values)]

    def __getitem__(self, item):
        if isinstance(item, six.string_types):
            return getattr(self, item)
        elif isinstance(item, (list, tuple)):
            return [self[it] for it in item]
        return self._values[item]

    def __setitem__(self, key, value):
        if isinstance(key, six.string_types):
            setattr(self, key, value)
        self._set(key, value)

    def __getattr__(self, item):
        if item == '_name_indexes':
            return object.__getattribute__(self, item)
        if hasattr(self, '_name_indexes') and item in self._name_indexes:
            i = self._name_indexes[item]
            return self._values[i]
        return object.__getattribute__(self, item)

    def __setattr__(self, key, value):
        if hasattr(self, '_name_indexes') and key in self._name_indexes:
            i = self._name_indexes[key]
            self._set(i, value)
        object.__setattr__(self, key, value)

    def get_by_name(self, name):
        return getattr(self, name)

    def set_by_name(self, name, value):
        return setattr(self, name, value)

    def __len__(self):
        return len(self._columns)

    def __contains__(self, item):
        return item in self._name_indexes

    def __iter__(self):
        for i, col in enumerate(self._columns):
            yield (col.name, self[i])

    @property
    def values(self):
        return self._values

    @property
    def n_columns(self):
        return len(self._columns)

    def get_columns_count(self):  # compatible
        return self.n_columns


class DataType(object):
    """
    Abstract data type
    """

    __slots__ = 'nullable',

    def __init__(self, nullable=True):
        self.nullable = nullable

    def __call__(self, nullable=True):
        return self._factory(nullable=nullable)

    def _factory(self, nullable=True):
        return type(self)(nullable=nullable)

    def __ne__(self, other):
        return not (self == other)

    def __eq__(self, other):
        return self._equals(other)

    def _equals(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        return isinstance(other, type(self)) and \
            (self.nullable == other.nullable)

    def __hash__(self):
        return hash(type(self))

    @property
    def name(self):
        return type(self).__name__.lower()

    def __repr__(self):
        if self.nullable:
            return self.name
        return '{0}[non-nullable]'.format(self.name)

    def __str__(self):
        return self.name.upper()

    def can_implicit_cast(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        return isinstance(self, type(other))

    def can_explicit_cast(self, other):
        return self.can_implicit_cast(other)

    @classmethod
    def validate_value(cls, val):
        # directly return True means without checking
        return True

    def _can_cast_or_throw(self, value, data_type):
        if not self.can_implicit_cast(data_type):
            raise ValueError('Cannot cast value(%s) from type(%s) to type(%s)' % (
                value, self, data_type))

    def cast_value(self, value, data_type):
        raise NotImplementedError


class OdpsPrimitive(DataType):
    __slots__ = ()


class Bigint(OdpsPrimitive):
    __slots__ = '_bounds',

    _bounds = (-9223372036854775808, 9223372036854775807)

    def can_implicit_cast(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        if isinstance(other, (Double, String, Decimal)):
            return True
        return super(Bigint, self).can_implicit_cast(other)

    @classmethod
    def validate_value(cls, val):
        smallest, largest = cls._bounds
        if smallest <= val <= largest:
            return True
        raise ValueError('InvalidData: Bigint(%s) out of range' % val)

    def cast_value(self, value, data_type):
        self._can_cast_or_throw(value, data_type)

        return int(value)


class Double(OdpsPrimitive):
    __slots__ = ()

    def can_implicit_cast(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        if isinstance(other, (Bigint, String, Decimal)):
            return True
        return super(Double, self).can_implicit_cast(other)

    def cast_value(self, value, data_type):
        self._can_cast_or_throw(value, data_type)

        return float(value)


class String(OdpsPrimitive):
    __slots__ = '_max_length',

    _max_length = 8 * 1024 * 1024  # 8M

    def can_implicit_cast(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        if isinstance(other, (Bigint, Double, Datetime, Decimal)):
            return True
        return super(String, self).can_implicit_cast(other)

    @classmethod
    def validate_value(cls, val):
        if len(val) <= cls._max_length:
            return True
        raise ValueError(
            "InvalidData: Length of string(%s) is more than %sM.'" %
            (val, cls._max_length / (1024 ** 2)))

    def cast_value(self, value, data_type):
        self._can_cast_or_throw(value, data_type)

        if isinstance(data_type, Datetime):
            return value.strftime('%Y-%m-%d %H:%M:%S')
        val = str(value)
        if isinstance(val, six.binary_type):
            val = val.decode('utf-8')
        return val


class Datetime(OdpsPrimitive):
    __slots__ = '_ticks_bound',

    _ticks_bound = (-6213579840.00, 2534022719.99)

    def can_implicit_cast(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        if isinstance(other, String):
            return True
        return super(Datetime, self).can_implicit_cast(other)

    @classmethod
    def validate_value(cls, val):
        timestamp = utils.to_timestamp(val)
        smallest, largest = cls._ticks_bound
        if smallest <= timestamp <= largest:
            return True
        raise ValueError('InvalidData: Datetime(%s) out of range' % val)

    def cast_value(self, value, data_type):
        self._can_cast_or_throw(value, data_type)

        if isinstance(data_type, String):
            return _datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
        return value


class Boolean(OdpsPrimitive):
    __slots__ = ()

    def cast_value(self, value, data_type):
        self._can_cast_or_throw(value, data_type)
        return value


class Decimal(OdpsPrimitive):
    __slots__ = '_max_int_len', '_max_scale'

    _max_int_len = 36
    _max_scale = 18

    def can_implicit_cast(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        if isinstance(other, (Bigint, Double, String)):
            return True
        return super(Decimal, self).can_implicit_cast(other)

    @classmethod
    def validate_value(cls, val):
        to_scale = _decimal.Decimal(str(10 * -cls._max_scale))
        scaled_val = val.quantize(to_scale, _decimal.ROUND_HALF_UP)
        int_len = len(str(scaled_val)) - cls._max_scale - 1
        if int_len > cls._max_int_len:
            raise ValueError(
                'decimal value %s overflow, max integer digit number is %s.' %
                (val, cls._max_int_len))
        return True

    def cast_value(self, value, data_type):
        self._can_cast_or_throw(value, data_type)

        return _decimal.Decimal(value)


class Array(DataType):
    __slots__ = 'nullable', 'value_type'

    def __init__(self, value_type, nullable=True):
        super(Array, self).__init__(nullable=nullable)
        value_type = validate_data_type(value_type)
        if value_type not in (bigint, double, string, boolean, decimal):
            raise ValueError('Invalid value type: %s' % repr(value_type))
        self.value_type = value_type

    @property
    def name(self):
        return '{0}<{1}>'.format(type(self).__name__.lower(),
                                 self.value_type.name)

    def __hash__(self):
        return hash(type(self)) * hash(type(self.value_type))

    def _equals(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        return DataType._equals(self, other) and \
            self.value_type == other.value_type

    def can_implicit_cast(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        return isinstance(other, Array) and \
            self.value_type == other.value_type and \
            self.nullable == other.nullable

    def cast_value(self, value, data_type):
        self._can_cast_or_throw(value, data_type)
        return value


class Map(DataType):
    __slots__ = 'nullable', 'key_type', 'value_type'

    def __init__(self, key_type, value_type, nullable=True):
        super(Map, self).__init__(nullable=nullable)
        key_type = validate_data_type(key_type)
        if key_type not in (bigint, string):
            raise ValueError('Invalid key type: %s' % repr(key_type))
        value_type = validate_data_type(value_type)
        if value_type not in (bigint, double, string):
            raise ValueError('Invalid value type: %s' % repr(value_type))
        self.key_type = key_type
        self.value_type = value_type

    @property
    def name(self):
        return '{0}<{1},{2}>'.format(type(self).__name__.lower(),
                                     self.key_type.name,
                                     self.value_type.name)

    def __hash__(self):
        return hash(type(self)) * \
               hash(type(self.key_type)) * \
               hash(type(self.value_type))

    def _equals(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        return DataType._equals(self, other) and \
            self.key_type == other.key_type and \
            self.value_type == other.value_type

    def can_implicit_cast(self, other):
        if isinstance(other, six.string_types):
            other = validate_data_type(other)

        return isinstance(other, Map) and \
            self.key_type == other.key_type and \
            self.value_type == other.value_type and \
            self.nullable == other.nullable

    def cast_value(self, value, data_type):
        self._can_cast_or_throw(value, data_type)
        return value


bigint = Bigint()
double = Double()
string = String()
datetime = Datetime()
boolean = Boolean()
decimal = Decimal()

_odps_primitive_data_types = dict(
    [(t.name, t) for t in (
        bigint, double, string, datetime, boolean, decimal
    )]
)

ARRAY_RE = re.compile(r'^array<([^>]+)>$', re.IGNORECASE)
MAP_RE = re.compile(r'^map<([^,]+),([^>]+)>$', re.IGNORECASE)


def validate_data_type(data_type):
    if isinstance(data_type, DataType):
        return data_type

    if isinstance(data_type, six.string_types):
        data_type = data_type.lower()
        if data_type in _odps_primitive_data_types:
            return _odps_primitive_data_types[data_type]

        array_match = ARRAY_RE.match(data_type)
        if array_match:
            value_type = array_match.group(1)
            return Array(value_type)

        map_match = MAP_RE.match(data_type)
        if map_match:
            key_type = map_match.group(1).strip()
            value_type = map_match.group(2).strip()
            return Map(key_type, value_type)

    raise ValueError('Invalid data type: %s' % repr(data_type))


_odps_primitive_to_builtin_types = {
    bigint: six.integer_types,
    double: float,
    string: six.string_types,
    datetime: _datetime,
    boolean: bool,
    decimal: _decimal.Decimal
}


def _infer_primitive_data_type(value):
    for data_type, builtin_types in six.iteritems(_odps_primitive_to_builtin_types):
        if isinstance(value, builtin_types):
            return data_type


def _validate_primitive_value(value, data_type):
    if isinstance(value, bytearray):
        value = str(value)
    if value is None:
        return None

    builtin_types = _odps_primitive_to_builtin_types[data_type]
    if isinstance(value, builtin_types):
        return data_type.cast_value(value, data_type)

    inferred_data_type = _infer_primitive_data_type(value)
    if inferred_data_type is None:
        raise ValueError(
            'Unknown value type, cannot infer from value: %s, type: %s' % (value, type(value)))

    return data_type.cast_value(value, inferred_data_type)


def validate_value(value, data_type):
    if data_type in _odps_primitive_to_builtin_types:
        res = _validate_primitive_value(value, data_type)
    elif isinstance(data_type, Array):
        if not isinstance(value, list):
            raise ValueError('Array data type requires `list`, instead of %s' % value)
        element_data_type = data_type.value_type
        res = [_validate_primitive_value(element, element_data_type)
               for element in value]
    elif isinstance(data_type, Map):
        if not isinstance(value, dict):
            raise ValueError('Map data type requires `dict`, instead of %s' % value)
        key_data_type = data_type.key_type
        value_data_type = data_type.value_type

        convert = lambda k, v: (_validate_primitive_value(k, key_data_type),
                                _validate_primitive_value(v, value_data_type))
        res = compat.OrderedDict(convert(k, v) for k, v in six.iteritems(value))
    else:
        raise ValueError('Unknown data type: %s' % data_type)

    data_type.validate_value(res)
    return res
