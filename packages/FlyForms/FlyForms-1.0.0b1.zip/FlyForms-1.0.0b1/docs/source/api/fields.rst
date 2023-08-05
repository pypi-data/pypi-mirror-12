
.. _Fields_api:

Fields
------

Fields represent a set of rules for data validation within set of :py:class:`.Validator` instances.
When you define your custom :py:class:`.Form` subclass you define Fields as its class attributes.
This is the most common usage of Fields, but nothing prevents you to use them standalone.

.. module:: flyforms.fields

Field class
~~~~~~~~~~~
.. autoclass:: Field(required=True, null=False, validators=(), default=UNSET)

    **Class attributes**

    .. py:attribute:: wrapper

        type which should be returned by :py:meth:`.bind` method default realization (may be :code:`None`)

    .. py:attribute:: value_types

        valid types of field value

    **Attributes**

    .. py:attribute:: required

        Boolean flag passed to constructor

    .. py:attribute:: default

        The default value for Field, which will be used when no data available to bind

        .. note:: You should specify :py:attr:`default` only together with :code:`required=False`, otherwise
            :py:attr:`default` value will be skipped

    .. py:attribute:: base_validators

        List of attached by processing construction arguments :code:`Validators`

    .. py:attribute:: custom_validators

        Iterable object contains :code:`custom_validators` passed to constructor

    **Property**

    .. autoattribute:: validators

    **Methods**

    .. automethod:: validate

    .. automethod:: bind

    **Hooks**

    .. automethod:: field_binding_hook

    .. automethod:: field_validation_hook


Builtin fields summary
~~~~~~~~~~~~~~~~~~~~~~

This section provides summary for all builtin Fields and API for its base classes.
For more information about each Field, see it`s API reference.

.. note:: Since version 1.0.0 inheritance model for builtin Fields has been changed.

+--------------------------------+----------------------------+----------------------------------+----------------------------+
|Field                           | Base class                 |            Reflected type        |       Bound value type     |
+================================+============================+==================================+============================+
| :py:class:`.StringField`       | :py:class:`.SelectField`   |  Python 2.x: :code:`basestring`  | Python 2.x :code:`unicode` |
|                                |                            |                                  |                            |
|                                |                            |  Python 3.x: :code:`str`         | Python 3.x: :code:`str`    |
+--------------------------------+                            +----------------------------------+----------------------------+
| :py:class:`.IntField`          |                            |                                :code:`int`                    |
+--------------------------------+                            +----------------------------------+----------------------------+
| :py:class:`.BooleanField`      |                            |                                :code:`bool`                   |
+--------------------------------+----------------------------+----------------------------------+----------------------------+
| :py:class:`.FloatField`        | :py:class:`.IntField`      | :code:`float`                    | :code:`float`              |
+--------------------------------+----------------------------+----------------------------------+----------------------------+
| :py:class:`.EmailField`        | :py:class:`.StringField`   |                    same with :py:class:`.StringField`         |
+--------------------------------+----------------------------+---------------------------------------------------------------+
| :py:class:`.Ip4Field`          | :py:class:`.StringField`   |                    same with :py:class:`.StringField`         |
+--------------------------------+----------------------------+----------------------------------+----------------------------+
| :py:class:`.ListField`         | :py:class:`.SequenceField` | :code:`Iterable`                 |  :code:`tuple`             |
+--------------------------------+                            |                                  |                            |
| :py:class:`.ArrayField`        |                            |                                  |                            |
+--------------------------------+----------------------------+----------------------------------+----------------------------+
| :py:class:`.DatetimeField`     | :py:class:`.Field`         |                    same with :py:class:`.StringField`         |
+--------------------------------+                            +----------------------------------+----------------------------+
| :py:class:`.DictField`         |                            | :code:`dict`                     | :py:class:`.FrozenDict`    |
+--------------------------------+                            +----------------------------------+----------------------------+
| :py:class:`.EmbeddedFormField` |                            | For more information see :ref:`EmbeddedForms`                 |
+--------------------------------+----------------------------+---------------------------------------------------------------+

.. autoclass:: SelectField

.. autoclass:: SequenceField


Builtin fields API
~~~~~~~~~~~~~~~~~~

.. autoclass:: StringField

.. autoclass:: EmailField

.. autoclass:: Ip4Field

.. autoclass:: IntField

.. autoclass:: FloatField

.. autoclass:: BooleanField

.. autoclass:: ListField

**Usage**

.. literalinclude:: ../../examples/list_field.py
   :language: python

.. autoclass:: ArrayField

**Usage**

.. literalinclude:: ../../examples/array_field.py
   :language: python

.. autoclass:: DatetimeField

.. autoclass:: DictField

**Usage**

.. literalinclude:: ../../examples/dict_field.py
   :language: python

**Nested DictField usage**

.. literalinclude:: ../../examples/nested_dict_fields.py
   :language: python


.. _EmbeddedForms:

Embedded Forms
~~~~~~~~~~~~~~

Since version 1.0.0 FlyForms provides mechanism of encapsulation one Form to an other within :py:class:`EmbeddedFormField`.

.. autoclass:: EmbeddedFormField

**Usage**

.. literalinclude:: ../../examples/embedded_form_field.py
   :language: python

Custom Fields
~~~~~~~~~~~~~

.. todo:: finish
