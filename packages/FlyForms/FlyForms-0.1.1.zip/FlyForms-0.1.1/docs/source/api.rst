.. _api-reference:

FlyForms reference
==================

.. _Form_api:

Forms
-----

:py:class:`.Form` is the root class of FlyForms that provide the highest level API for
validation and mapping of data structures. All user-defined forms must inherit this class.

.. module:: flyforms.form


Form class
~~~~~~~~~~

.. class:: Form

    Base class for all user-defined Forms

    **Construction**

    .. automethod:: __init__

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


Defining Forms
~~~~~~~~~~~~~~

Forms defining is quite simply process. All you need to do is to make a subclass of :py:class:`.Form`
and define fields as class attributes.
If you need to extend Forms, inheritance is available. New Form will contain all fields of the parent form as well as it's own.


Using Forms
~~~~~~~~~~~

.. todo:: Write usage


In flight data validation
-------------------------

If you already have defined Form and you want to just validate some data structure via it you can use
:py:func:`validate_schema` function from :py:mod:`flyforms.form` module.

Usage
~~~~~

.. todo:: Write usage


Signature for validate_schema
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. autofunction:: validate_schema


Fields
------

Fields represent a set of rules to data validation via set of :py:class:`.Validator` instances. When you define yours
custom :py:class:`.Form` you define Fields as its class attributes.
This is the most common usage of Fields, but nothing prevents you to use them standalone.

.. module:: flyforms.fields

Field class
~~~~~~~~~~~
.. class:: Field

    **Construction**

    .. automethod:: __init__

    **Methods**

    .. automethod:: validate

    .. automethod:: is_valid

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

UNSET value
~~~~~~~~~~~~

.. py:data:: UNSET

    frequently used constant, it is a reflection of unidentified values

Basic Fields
~~~~~~~~~~~~


StringField
^^^^^^^^^^^
.. autoclass:: StringField

    .. automethod:: __init__


EmailField
^^^^^^^^^^
.. autoclass:: EmailField

    .. automethod:: __init__


IntField
^^^^^^^^

.. autoclass:: IntField

    .. automethod:: __init__


FloatField
^^^^^^^^^^

.. autoclass:: FloatField

    .. automethod:: __init__


BooleanField
^^^^^^^^^^^^

.. autoclass:: BooleanField

    .. automethod:: __init__


Ip4Field
^^^^^^^^

.. autoclass:: Ip4Field

    .. automethod:: __init__

Custom Fields
~~~~~~~~~~~~~

Sometimes, it is necessary to design custom fields for validation of some special data structures.
If you want do this, you should design your custom subclass of the :py:class:`.Field`.


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

    .. automethod:: __init__


EntryValidator
^^^^^^^^^^^^^^
.. autoclass:: EntryValidator

    .. automethod:: __init__


MinValueValidator
^^^^^^^^^^^^^^^^^
.. autoclass:: MinValueValidator

    .. automethod:: __init__


MaxValueValidator
^^^^^^^^^^^^^^^^^
.. autoclass:: MaxValueValidator

    .. automethod:: __init__


MinLengthValidator
^^^^^^^^^^^^^^^^^^
.. autoclass:: MinLengthValidator

    .. automethod:: __init__


MaxLengthValidator
^^^^^^^^^^^^^^^^^^
.. autoclass:: MaxLengthValidator

    .. automethod:: __init__


RegexValidator
^^^^^^^^^^^^^^
.. autoclass:: RegexValidator

    .. automethod:: __init__


EmailValidator
^^^^^^^^^^^^^^
.. autoclass:: EmailValidator


Ip4AddressValidator
^^^^^^^^^^^^^^^^^^^
.. autoclass:: Ip4AddressValidator

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