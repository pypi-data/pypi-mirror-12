Markdown Bugzilla Extension
---------------------------

.. image:: https://img.shields.io/travis/atodorov/Markdown-Bugzilla-Extension/master.svg
   :target: https://travis-ci.org/atodorov/Markdown-Bugzilla-Extension
   :alt: Build status


This is Markdown extension for faster linking to Bugzilla bugs::

    md = Markdown(extensions=['mdbz'], 
                  extension_configs={
                    'mdbz' : {
                        'bugzillaURL' : 'http://bugzilla.example.com/%s'
                    }
                  }
                )

    md = Markdown(extensions=['mdbz.rhbz'])


then strings of the form `[bz#123]` will become links to the specified bug number.
The `mdbz.rhbz` extension is preconfigured for Red Hat's Bugzilla and
supports the `[rhbz#123]` syntax instead.


Contributing
============

Source code and issue tracker are at https://github.com/atodorov/Markdown-Bugzilla-Extension
