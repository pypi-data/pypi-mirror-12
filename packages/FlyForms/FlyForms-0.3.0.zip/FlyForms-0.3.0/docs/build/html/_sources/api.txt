.. _api-reference:

FlyForms reference
==================

.. _Form_api:

.. module:: flyforms.form

Forms
-----

:py:class:`.Form` is the root class of FlyForms that provide the highest level API for
validation and mapping of data structures. All user-defined forms must inherit this class.

Form class
~~~~~~~~~~

.. autoclass:: Form

    .. note:: Even if you do not pass some keys in :code:`kwargs`, you can use instance attributes, but will receive
              :py:data:`.UNSET` value

    **Properties**

    .. autoattribute:: is_bound

    .. autoattribute:: is_valid

    .. autoattribute:: data

    **Attributes**

    .. py:attribute:: raw_data

        Normal Python :code:`dict` contains all Form data (even :py:data:`.UNSET` values)

    .. py:attribute:: _fields

        Python :code:`set` contains all defined fields names

    **Methods**

    .. automethod:: to_python


Defining Forms
~~~~~~~~~~~~~~

Forms defining is quite simply process. All you need to do is to make a subclass of :py:class:`.Form`
and define fields as class attributes.
If you need to extend Forms, inheritance is available. New Form will contain all fields of the parent form as well as it's own.


Using Forms
~~~~~~~~~~~

.. literalinclude:: ../../examples/forms_usage.py
   :language: python


In flight data validation
-------------------------

If you already have defined Form and you want to just validate some data structure via it you can use
:py:func:`validate_schema` function from :py:mod:`flyforms.form` module.

.. autofunction:: validate_schema

**Usage**

.. literalinclude:: ../../examples/validate_schema_usage.py
   :language: python


Fields
------

Fields represent a set of rules to data validation via set of :py:class:`.Validator` instances. When you define yours
custom :py:class:`.Form` you define Fields as its class attributes.
This is the most common usage of Fields, but nothing prevents you to use them standalone.

.. module:: flyforms.fields

Field class
~~~~~~~~~~~
.. autoclass:: Field

    **Methods**

    .. automethod:: validate

    .. automethod:: is_valid

    .. automethod:: bind

        .. versionadded:: 0.2.0


    **Attributes**

    .. py:attribute:: required

        Boolean flag passed to constructor

    .. py:attribute:: default

        The default value for Field (passed to constructor value or :py:data:`.UNSET`)

    .. py:attribute:: base_validators

        List of attached by processing construction arguments :code:`Validators`

    .. py:attribute:: custom_validators

        Iterable object contains :code:`custom_validators` passed to constructor

    **Property**

    .. autoattribute:: validators


Basic Fields
~~~~~~~~~~~~

StringField
^^^^^^^^^^^
.. autoclass:: StringField


EmailField
^^^^^^^^^^
.. autoclass:: EmailField


IntField
^^^^^^^^

.. autoclass:: IntField


FloatField
^^^^^^^^^^

.. autoclass:: FloatField


BooleanField
^^^^^^^^^^^^

.. autoclass:: BooleanField


Ip4Field
^^^^^^^^

.. autoclass:: Ip4Field


DatetimeField
^^^^^^^^^^^^^

.. autoclass:: DatetimeField


Schema Field
~~~~~~~~~~~~

Schema Fields is a set of rules to validation data structures such as lists, dicts.

ListField
^^^^^^^^^

**API**

.. autoclass:: ListField

**Usage**

.. literalinclude:: ../../examples/list_field.py
   :language: python

ArrayField
^^^^^^^^^^

**API**

.. autoclass:: ArrayField


**Usage**

.. literalinclude:: ../../examples/array_field.py
   :language: python

DictField
^^^^^^^^^

**API**

.. autoclass:: DictField

**Usage**

.. literalinclude:: ../../examples/dict_field.py
   :language: python

**Embedded DictFields**

.. literalinclude:: ../../examples/embedded_dict_fields.py
   :language: python


Custom Fields
~~~~~~~~~~~~~

Sometimes, it is necessary to design custom fields for validation of some special data structures.
If you want do this, you should design your custom subclass of the :py:class:`.Field`.

.. literalinclude:: ../../examples/custom_fields.py
   :language: python

Validators
----------
.. module:: flyforms.validators


Validators validate given value via their internal logic. If value is invalid :py:class:`.ValidationError`
will be raised.

ValidationError
~~~~~~~~~~~~~~~

.. autoclass:: ValidationError


Builtin validators
~~~~~~~~~~~~~~~~~~

RequiredValidator
^^^^^^^^^^^^^^^^^
.. autoclass:: RequiredValidator


TypedValidator
^^^^^^^^^^^^^^
.. autoclass:: TypedValidator


EntryValidator
^^^^^^^^^^^^^^
.. autoclass:: EntryValidator


MinValueValidator
^^^^^^^^^^^^^^^^^
.. autoclass:: MinValueValidator


MaxValueValidator
^^^^^^^^^^^^^^^^^
.. autoclass:: MaxValueValidator


MinLengthValidator
^^^^^^^^^^^^^^^^^^
.. autoclass:: MinLengthValidator


MaxLengthValidator
^^^^^^^^^^^^^^^^^^
.. autoclass:: MaxLengthValidator


RegexValidator
^^^^^^^^^^^^^^
.. autoclass:: RegexValidator


EmailValidator
^^^^^^^^^^^^^^
.. autoclass:: EmailValidator


Ip4AddressValidator
^^^^^^^^^^^^^^^^^^^
.. autoclass:: Ip4AddressValidator


ItemTypedValidator
^^^^^^^^^^^^^^^^^^

.. autoclass:: ItemTypedValidator


JsonItemTypedValidator
^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: JsonItemTypedValidator


Custom Validators
~~~~~~~~~~~~~~~~~

If you need to make additional data validation you can use your custom validators.
There is one requirement: **validator should be an initialized and callable object**.
If you want, you can use and extend one of this classes: :py:class:`.Validator` or :py:class:`.SimpleValidator`.


Validator class
^^^^^^^^^^^^^^^

.. class:: Validator

    This the base class for all Fields.

    .. automethod:: validate

    .. automethod:: is_valid

SimpleValidator class
^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: SimpleValidator


Common module
-------------

.. module:: flyforms.common

This module contains frequently used in FlyForms constants and classes

.. py:data:: UNSET

    Frequently used constant, it is a reflection of unidentified values

.. py:data:: jsonify_types

    Supported types for JSON encoding and decoding operations

.. py:function:: is_set(value)

    Checks is given value is not :py:data:`.UNSET`

.. autoclass:: FrozenDict
