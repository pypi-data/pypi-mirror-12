===========
Dict Tool
===========

Dict Tool provides an easy to get value from nested dict. Typical usage
often looks like this::

    #!/usr/bin/env python

    from dicttool import dget

    a = {'kikodo': {'age': 21}}
    print dget(a, 'kikodo.age')
