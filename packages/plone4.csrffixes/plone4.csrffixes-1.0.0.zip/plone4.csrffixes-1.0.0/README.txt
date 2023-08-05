plone4.csrffixes
================

The package aims to backport the auto CSRF implementation from Plone 5
to Plone 4.

The reason this is necessary is because there are a lot of CSRF problem
with the ZMI that Zope2 will never be able to fix.

Since the auto CSRF protection is overly aggressive, some tricky things
need to be done in order to apply this patch without any false positives.
I'm sure we'll miss things that need to continually be fixed.


Installation
============


Plone 4.3, 4.2, 4.1 and 4.0
---------------------------

add `plone4.csrffixes` to eggs list::

    eggs =
        ...
        plone4.csrffixes
        ...


add a new version pin for plone.protect, plone.keyring and plone.locking::

    [versions]
    ...
    plone.protect = 3.0.11
    plone.keyring = 3.0.1
    plone.locking = 2.0.8
    ...


Plone 4.0 and 4.1
-----------------

If lxml is not already included in your site, this package has a dependency
on lxml and will pull it in when installed.

We recommend pinning to version 2.3.6 of lxml.