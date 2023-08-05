Version 0.2.0
-------------
Not yet released

* issue tracker is available on BitBucket_
* new method for :py:meth:`.Field.bind` which returns an *immutable bound* value
* new basic :code:`Fields`: :py:class:`.ListField` and :py:class:`.ArrayField`
* new :code:`Validators`: :py:class:`.ItemTypedValidator` and :py:class:`.JsonItemTypedValidator`
* Methods :py:meth:`.Field.validate` and :py:meth:`.Field.is_valid` were deprecated and will be removed in v1.0.0
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