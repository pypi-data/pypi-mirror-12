# dj-livesettings

Django app that provides possibility to add settings that can be changed in DB.

Getting Started
===============

1. Add 'livesettings' to INSTALLED_APPS
2. Set LIVESETTINGS_CACHE_TIME in settings.py
3. Add livesettings in /admin/livesettings/

Typical Usage
=============

    # in settings.py
    FOO = 'foo'

    # in foo.py
    from livesettings.api import live_settings
    print(live_settings.FOO)
    # >>> 'foo'

    # if in admin we add livesetting FOO with value bar
    print(live_settigns.FOO)
    # >>> 'bar'
