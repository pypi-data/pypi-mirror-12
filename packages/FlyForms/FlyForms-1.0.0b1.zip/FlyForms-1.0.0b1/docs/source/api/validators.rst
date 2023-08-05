Validators
----------
.. module:: flyforms.validators


Generally, Validator is a callable object that validates given value with it`s internal logic.
If value is not valid :py:class:`.ValidationError` will be raised.

.. autoclass:: ValidationError

Validator class
~~~~~~~~~~~~~~~

All builtin Validators inherit :py:class:`.Validator` or it`s subclass :py:class:`.SimpleValidator`.

.. autoclass:: Validator

.. autoclass:: SimpleValidator

Builtin validators API
~~~~~~~~~~~~~~~~~~~~~~

.. autoclass:: RequiredValidator

.. autoclass:: TypeValidator

.. autoclass:: EntryValidator

.. autoclass:: MinValueValidator

.. autoclass:: MaxValueValidator

.. autoclass:: MinLengthValidator

.. autoclass:: MaxLengthValidator

.. autoclass:: RegexValidator

.. autoclass:: EmailValidator

.. autoclass:: Ip4AddressValidator
