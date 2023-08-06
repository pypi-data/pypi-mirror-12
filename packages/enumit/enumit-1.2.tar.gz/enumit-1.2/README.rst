enumit
======
Enumeration library for python.

Basic Usage
-----------
::

    from enumit import Enum


    class Status(Enum):
        APPROVED = Enum.Field('approved')
        DENIED = Enum.Field('denied', 'Denied')

    >> Status.APPROVED
    >> approved

    >> Status['approved']
    >> Approved

    >> Status.choices()
    >> [('approved', 'Approved'), ('denied', 'Denied')]

    >> Status.values()
    >> ['approved', 'denied']

    >> Status.names()
    >> ['Approved', 'Denied']

    >> 'approved' in Status
    >> True
