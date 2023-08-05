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

.. code-block:: python

    from flyforms import Form, EmailField, StringField
        LoginForm(Form):
            email = EmailField()
            password = StringField(
                min_length=8,
                regex=r"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])",
                max_length=64
            )

When you create a form, you define the fields by the defining class variables for :py:class:`.Form` subclass
which are instantiations of the fields.
In this example, we have defined the authorization form consists of two fields which represent user email and password.


Extending Forms
~~~~~~~~~~~~~~~

As a normal Python object Forms have inheritance. So, if you need to extend your form you can easily do it:


.. code-block:: python

    class RegistrationForm(LoginForm):

        first_name = StringField(
            regex=r"^[A-Z].*$",
            min_length=3,
            max_length=64
        )
        last_name = StringField(
            regex=r"^[A-Z].*$",
            min_length=3,
            max_length=64
        )

Via subclassing, :class:`RegistrationForm` has all fields defined in :class:`LoginForm` and it's own.
So you easily share common fields between forms.


Using Forms
~~~~~~~~~~~

Using a Forms is as simple as their definition. Let's see an usage example for :class:`LoginForm` we defined earlier:

.. code-block:: python

    if __name__ == '__main__':
        form = LoginForm(
            email="qwerty@gmail.com",
            password="Qwerty_#123"
        )

        print(form.is_bound)  # >>> True
        print(form.is_valid)  # >>> True
        print(form.errors)  # >>> {}

        print(form.password)  # >>> Qwerty_#123
        print(form.email)  # >>> qwerty@gmail.com

First, we instantiate the :py:class:`.Form`, providing it with data.
While instantiation given data pass validation using defined fields validators.
By the way, all the fields in the form are required, by default. You need to pass *required=False* to field's
constructor if you want to discard it.


If the :py:class:`.Form` is submitted with wrong data, we get the following:

.. code-block:: python

    if __name__ == '__main__':
        reg_f = RegistrationForm(
            first_name="John",
            email="qwerty@gmail.com",
            password="Qwerty_#123"
        )

        print(reg_f.is_bound)  # >>> False
        print(reg_f.is_valid)  # >>> False
        print(reg_f.errors)  # >>> {'last_name': 'Field is required.'}

Want more?
~~~~~~~~~~

See :ref:`api-reference` and :ref:`advanced_usage`.