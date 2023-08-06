Introduction
============
What it does:

* installs uwosh.requirements
* installs top_level_navigation portal actions
* installs audience_navigation portal actions
* installs titan_services portal actions
* adds only_show_body_view for a Page content type so you can only show the contents of the page
* patches the zope last resort error handler to display something much nicer for ugly errors

Compatibility
-------------

Works with Plone 4.3.

Error Reporting
---------------

You can append '/@@reported-errors' onto any url and see the current list of errors that have happened
on the zeo client. Technically, you could get different numbers depending on what client you use since I
store these values in memory and once a server is restarted, the count is also restarted.

The referrer url will not always be able to be retrieved.

Use http://validator.w3.org/checklink to do a thorough check on links and make sure you select the
"Check linked documents recursively" option so it will traverse the whole site for you returning
a listing of errors.
