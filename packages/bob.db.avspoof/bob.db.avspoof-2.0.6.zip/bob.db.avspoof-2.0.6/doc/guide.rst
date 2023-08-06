.. vim: set fileencoding=utf-8 :
.. @author: Pavel Korshunov <Pavel.Korshunov@idiap.ch>
.. @date:   Wed Nov  11 14:05:22 CET 2015

==============
 User's Guide
==============

This package contains access API and description of the AVspoof_ database interfaces.
It includes Bob_-compliant methods for using the database directly from python with our certified protocols.

The Database Interfaces
-----------------------

The :py:class:`bob.db.avspoof.verification.Database` implements the standard biometric anti-spoofing interface for Bob's databases defined in :py:class:`antispoofing.utils.db.Database`.

The :py:class:`bob.db.avspoof.spoofing.Database` implements the standard biometric verification interface for Bob's databases defined in :py:class:`bob.db.verification.utils.Database` and described in :ref:`commons`.


.. _bob: https://www.idiap.ch/software/bob
.. _avspoof: https://www.idiap.ch/dataset/avspoof

