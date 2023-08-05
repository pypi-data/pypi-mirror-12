Introduction to FlyForms
========================

Concept
-------

There are main concepts of FlyForms. It based on

* **Validators** that check certain properties of the obtained data.
* **Fields** represent a set of rules to data validation via set of :py:class:`.Validator` instances.
* **Form** is the core container of FlyForms. Forms represent a collection of :py:class:`.Field` instances.

.. _quickstart:

Quickstart
----------

Defining Forms
~~~~~~~~~~~~~~

Let's define our first form right away:

.. literalinclude:: ../../examples/quickstart.py
    :lines: 3-13


When you create a form, you define the fields by the defining class variables for :py:class:`.Form` subclass
which are instantiations of the fields.
In this example, we have defined the authorization form consists of two fields which represent user email and password.


Extending Forms
~~~~~~~~~~~~~~~

As a normal Python object Forms have inheritance. So, if you need to extend your form you can easily do it:


.. literalinclude:: ../../examples/quickstart.py
    :lines: 16-28

Via subclassing, :class:`RegistrationForm` has all fields defined in :class:`LoginForm` and it's own.
So you easily share common fields between forms.


Using Forms
~~~~~~~~~~~

Using a Forms is as simple as their definition. Let's see an usage example for :class:`LoginForm` we defined earlier:

.. literalinclude:: ../../examples/quickstart.py
    :lines: 32-42

First, we instantiate the :py:class:`.Form`, providing it with data.
While instantiation given data pass validation using defined fields validators.
By the way, all the fields in the form are required, by default. You need to pass *required=False* to field's
constructor if you want to discard it.


If the :py:class:`.Form` is submitted with wrong data, we get the following:

.. literalinclude:: ../../examples/quickstart.py

.. .. :lines: 31,46-54

Further reading
---------------

For more information about FlyForms see :ref:`api-reference`.