.. _version_1_0_0:

Version 1.0.0
-------------
Not yet released

Release notes
^^^^^^^^^^^^^
This is the first logically completed and stable working version of FlyForms.
We held a global refactoring and code optimization and add many new features.
Unfortunately, this version is fully incompatible with previous releases. So if you have used the library before,
you will have to rewrite the some your code. You can see list of all incompatible changes below.
And we hope to get feedback about the new release on BitBucket_.

New features
^^^^^^^^^^^^
* new class :py:class:`.FormMetaOptions` that provides customization of :py:class:`.Form` instances behaviour
* new field :py:class:`.EmbeddedFormField` that provide to encapsulate one :py:class:`.Form` instance into the other
* new fields inheritance model changed (for more information see :ref:`Fields_api`)
* new core exception class: :py:class:`.UnboundForm`
* new customization model for unbound form fields (see :py:class:`.UnboundField` and :py:class:`.FormMetaOptions`)
* Field :py:attr:`validators` is generator now, not a :code:`chain`
* documentation improvement and refactoring

Incompatible changes
^^^^^^^^^^^^^^^^^^^^
* new module :code:`flyforms.core`
* classes :py:class:`.Field`, :py:class:`.Form`, :py:class:`.FormMeta` and descriptor :py:class:`.FormField` were moved to :code:`flyforms.core`
* property :py:attr:`SimpleValidator.positive_case` was removed; use :py:attr:`.SimpleValidator.validation_case` instead
* property :py:attr:`Form.data` was removed; use :py:meth:`.Form.to_python()` method instead
* validator :py:class:`TypedValidator` was renamed to :py:class:`.TypeValidator`
* validators :py:class:`ItemTypedValidator` and :py:class:`JsonItemTypedValidator`  were removed; use :py:class:`.TypeValidator`
* methods :py:meth:`Validator.validate()` and :py:meth:`Validator.is_valid()` were removed
* attribute :py:attr:`Form.raw_data` was changed to private :py:attr:`.Form._raw_data`
* method :py:meth:`Field.is_valid` was removed
* behavior of method :py:meth:`.Form.to_python()` has been changed


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