.. _Form_api:

.. module:: flyforms.core

Forms
-----

Class :py:class:`.Form` is the root class of FlyForms that provide the highest level API for data structures
validation and mapping. All user-defined forms must inherit this class.

Form class
~~~~~~~~~~

.. autoclass:: Form

    **Properties**

    .. autoattribute:: is_bound

    .. autoattribute:: is_valid

    **Attributes**

    .. py:attribute:: _raw_data

        Normal Python :code:`dict` contains all Form data (even unbind fields)

    .. py:attribute:: _fields

        Python :code:`set` contains all defined fields names

    .. py:attribute:: _meta

        Instance of :py:class:`.FormMetaOptions` contains Form meta information

    **Methods**

    .. automethod:: to_python

    .. automethod:: validate

    For more information about :py:meth:`.validate` method see :ref:`in_flight_validation`.


Defining Forms
~~~~~~~~~~~~~~

Forms defining is quite simply process. All you need is to make a subclass of :py:class:`.Form`
and define fields as class attributes.
If you need to extend Forms, inheritance is available.
New Form will contain all fields of the parent form as well as it's own.

.. literalinclude:: ../../examples/form_inheritance.py
   :language: python

By the way, multiple Forms inheritance is also possible. It will be done in full compliance with the Python MRO_:

.. literalinclude:: ../../examples/form_multiply_inheritance.py
   :language: python

.. _MRO: https://www.python.org/download/releases/2.3/mro/

Using Forms
~~~~~~~~~~~
Typical Forms usage schema looks like:

.. code-block:: python

    class MyForm(Form):
        # Your form definition

    if __name__ == '__main__':
        f = MyForm(**data)  # form instantiation
        if f.is_valid:
            # do something with form
        else:
            # handle form errors


.. note:: Verification form by :py:attr:`.is_valid` is a more generalized than :py:attr:`.is_bound`.
    In general, Form may be *bound* but *not valid*.
    Therefore, we recommend you to use :py:attr:`.is_valid` property for Form bound verification.

    For a better understanding of the internal structure of the :py:class:`.Form` class see :ref:`Low_levelAPI` section.

When Form instantiated, you can access bind data within form instance attributes:

.. code-block:: python

    class MyForm(Form):
        field = StringField()

    if __name__ == '__main__':
        f = MyForm(**data)  # form instantiation
        print(f.field)  # >> bound value will be printed

FlyForms :py:class:`.Field` API allow you to set default values for form fields. You can use it together with passing
:code:`required=False` to field constructor (for more information about :py:class:`.Field` API see :ref:`Fields_api`).
If you do not pass the value of not required field during form instantiation, you`ll got the default value:

.. code-block:: python

    class MyForm(Form):
        field = StringField(required=False, default="Hello!")

    if __name__ == '__main__':
        f = MyForm()  # form instantiation
        print(f.field)  # >> Hello!

But if you'll pass :code:`required=False` to field constructor without passing a default value,
you`ll got an unbound field:

.. code-block:: python

    class MyForm(Form):
        field = StringField(required=False)

    if __name__ == '__main__':
        f = MyForm()  # form instantiation
        print(f.field)  # >> <UnboundStringField(field, errors: {})>

By default, representation of unbound fields provided by :py:class:`.UnboundField`.


If you want to access all bound data, use :py:meth:`.to_python()` method that returns :code:`dict` which contains all bound data.
But if there are any errors, :py:class:`UnboundForm` exception will be raised.

.. autoclass:: UnboundForm

FlyForms also provides you to dump Form data into json string within the :py:meth:`.to_json()` method.


.. _in_flight_validation:

In flight data validation
~~~~~~~~~~~~~~~~~~~~~~~~~

If you already have defined Form and you want to just validate a data structure within that, you can use
:py:meth:`.Form.validate` class method.

**Goal**

The main goal is that no new objects will be created when you call :py:meth:`.Form.validate`.

**Usage**

.. literalinclude:: ../../examples/validate_schema_usage.py
   :language: python

Unbound fields rendering
~~~~~~~~~~~~~~~~~~~~~~~~

By default, all unbound fields are replaced with :py:class:`.UnboundField` instances.
You can customize it using :py:attr:`.FormMetaOptions.unbound_field_render` in :py:class:`.FormMetaOptions`
definition for your Form.

.. autoclass:: UnboundField


Forms customization
~~~~~~~~~~~~~~~~~~~

You can define an :code:`Meta` class in your Form definition to customize it`s behaviour.

**API**

.. autoclass:: FormMetaOptions

**Usage**

.. literalinclude:: ../../examples/meta_usage.py
   :language: python


.. note:: There is no inheritance of :code:`Meta` class.
    It`ll have an effect only in a form where it has been defined.
    **But** if you use :py:class:`.EmbeddedFormField` with form in which the :code:`Meta` class defined, it
    :py:attr:`.FormMetaOptions.skip_extra` attribute will be used to customize it binding process.


.. _Low_levelAPI:

Low-level API
~~~~~~~~~~~~~

.. warning:: This section provides information about core classes API of FlyForms. You should not use it, but understanding.
    It is necessary to extending and form behavior customization in some specific cases.

.. autoclass:: FormMeta

.. autoclass:: FormField

    .. automethod:: __get__

    .. automethod:: __set__


Form data manipulations
~~~~~~~~~~~~~~~~~~~~~~~

.. module:: flyforms.form

Since version 1.0.0 FlyForms provides you to load and dump your Form data to JSON format.
We decided to bring this functionality into separate functions, collected in module :py:mod:`flyforms.form`.
For JSON encoding and decoding we use :code:`json` module.
Eventually, the data cached in Form constitute an ordinary Python :code:`dict`, so we decided to avoid complicating.


.. autofunction:: to_json

.. autofunction:: from_json

.. autofunction:: validate_json