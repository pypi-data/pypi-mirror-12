humboldt.cmfbibliographyat
==========================

.. contents::

Requirements
------------

* Products.CMFBibliography 1.0.0 or higher                                     
* optional: Products.ATBiblioStyles


SFX server integration (OpenURL support)
----------------------------------------

The module provides a propertysheet ``portal_properties`` ->
``cmfbibliographyat`` where you can enable the SFX server integration support
(``SFX integration`` property). The ``Metaresolver URL`` property allows you to
specify a meta-resolver (e.g. http://worldcatlibraries.org/registry/gateway'). 


Syndication support
-------------------
``humboldt.cmfbibliographyat`` supports syndication out-of-the-box. 

Prequisites:
++++++++++++

- enable the ``syndication`` action in ``portal_actions`` -> ``object`` -> ``syndication`` by
  toggling the ``Visible`` checkbox
- visit the ``Syndication`` tab of your bibliographic folder and enable syndication

Using syndication support
+++++++++++++++++++++++++

- add ``@@atom.xml`` or ``@@rss.xml`` to the URL of your bibliographic folder

- there is also a document action ``Feed`` pointing you a feed URL generator
  where you can choose the feed format (ATOM, RDF, RSS) (and bibliographic
  style if available).

- an optional request parameter ``style`` can be set to 
  ``simple``, ``full``:::

        http://example.org/plone/bib_folder/@@atom.xml?style=full

  In addition we support rendering of bibliographic references in different
  styles through the (optionally installed) add-on ATBiblioStyles. Feed entries
  can be styled by specifying the **internal** style name like 

    * stl_default
    * stl_minimal
    * stl_chicago
    * stl_harvard
    * stl_mla
    * stl_apa
    * stl_ecosciences

  Example::

        http://example.org/plone/bib_folder/@@atom.xml?style=stl_apa

Credits
-------
``humboldt.cmfbibliographyat`` is funded by the Humboldt University of Berlin

License
-------
``humboldt.cmfbibliographyat`` is published under the GNU Publice License V2 (GPL) 

Author
------

| Andreas Jung
| ZOPYX Ltd. & Co. KG
| Charlottenstr. 37/1
| D-72070 Tuebingen, Germany
| E-Mail: info@zopyx.com
| Web: http://www.zopyx.com



Changelog
=========

0.2.5.3
-------
- remove PKG-INFO from version control
- remove document_relateditems from templates

0.2.5.2
-------
- correctly declare template directory

0.2.5.1
-------
- change external name of profile

0.2.5
-----
- fixed actionicons from Products.CMFBibliographyAT
- added dependencies to Products.CMFBibliographyAT

0.2.4
-----
- fixed pagetemplate for bibentry_view when no toc where set + improved representation
- fixed skin registration: now humboldt.theme stays undamaged

0.2.3
-----
- removed description of table of contents schemaextension field
- added (Default) workflow to content types

0.2.2
-----
- added IBibLayer BrowserLayer for schemaextensions
- locales

0.2.1
-----
- added to own svn
- added schemaextender for Products.CMFBibliographyAT bibliographicitem (table of contents)

0.2.0 (2009-03-19)
------------------

- minor updated for CMFBibAT 1.0.0 release
- various fixes

0.1.6.4 (2010-02-16)
--------------------
- fixed feed names

0.1.6.3 (2010-01-26)
--------------------
- changed query string generation for OpenURL

0.1.6 (2010-01-25)
------------------
- changed meta resolver URL 

0.1.5 (2009-16-18)
------------------
- added UI for feed URL generation
- changed URL for 'Feed' action to @@feeds

0.1.4 (2009-16-17)
------------------
- improved feed integration and parameter handling
- (optional integration with Products.ATBiblioStyles (on the syndication
  level)

0.1.3 (2009-16-12)
------------------
- BibReferenceEntry adapter now respects a custom request parameter 'detail_view'
  providing additional information about bibliographic items.

0.1.2 (2009-16-12)
------------------
- added documentation action point to the @@atom.xml view

0.1.1 (2009-16-12)
------------------
- including a basic HTML view for syndicated bibliography entries

0.1.0 (2009-16-12)
------------------

- SFX server integration
- per reference-type specific identifiers
- added Products.fatsyndication and Products.basesyndication as new dependency
- added adapter for CMFBibAT related types for integration with base-/fatsyndication




