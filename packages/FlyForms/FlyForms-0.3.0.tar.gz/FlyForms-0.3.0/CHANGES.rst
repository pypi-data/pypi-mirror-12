Version 1.0.0
-------------
Not yet released


Version 0.3.0
-------------
Released 20.10.2015

* new basic :code:`Fields`: :py:class:`.DatetimeField` and :py:class:`.DictField`
* property :code:`SimpleValidator.positive_case` was renamed to :code:`validation_case` in :py:class:`.SimpleValidator`
* property :code:`SimpleValidator.positive_case` was deprecated and will be removed in v1.0.0
* new method :code:`to_python()` in :py:class:`.Form`
* property :code:`Form.data` was deprecated and will be removed in v1.0.0 use :code:`to_python()` method
* other minor improvements

Version 0.2.0
-------------
Released 19.10.2015

* issue tracker is available on BitBucket_
* new method for :py:meth:`.Field.bind` which returns an *immutable bound* value
* new basic :code:`Fields`: :py:class:`.ListField` and :py:class:`.ArrayField`
* new :code:`Validators`: :py:class:`.ItemTypedValidator` and :py:class:`.JsonItemTypedValidator`
* methods :py:meth:`.Field.validate` and :py:meth:`.Field.is_valid` were deprecated and will be removed in v1.0.0
* core descriptor :py:class:`.FormField` now uses :py:meth:`.Field.bind` instead :py:meth:`.Field.validate`
* new module :py:mod:`.flyforms.common`
* other minor improvements

Version 0.1.1
-------------
Released 14.10.2015.

FlyForms:

* bug with :code:`default` argument for :py:class:`.Field` instances fixed
* source tarball added to distribution in addition to wheel

Documentation:

* new section :ref:`api-reference` instead just API
* section *Advanced usage* removed
* other minor improvements

Version 0.1.0
-------------
Released 12.10.2015.

* Initial release.

.. _BitBucket: https://bitbucket.org/ShabashP/flyforms/issues