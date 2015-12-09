2.4.0 - December 9, 2015
- Update third party dependencies
- Use AirBnb ESLint package
- Fixed linter errors

2.3.0 - July 16, 2015
- Update third party dependencies
- Nunjucks 1.3.0 makes working with relative template includes a lot easier, use like this:
  {% include "./resource.nunjucks" %}
- Fixed bug where multiple instances of raml2md would share the Nunjucks config,
  even if one of them needed to use a different templatePath
- Removed the templatePath option from the CLI since relative templates now work as expected

2.2.0 - July 10, 2015
- Added a templatesPath option to the command line interface (#8)

2.1.0 - May 22, 2015
- Split the library from the command line program

2.0.1 - March 20, 2015
- Fixed help text for the -t option
- Added templatesPath property to the config object

2.0.0 - March 20, 2015
- Using a promise based API, please see README for updated usage example
- Using Nunjucks instead of Handlebars

1.0.0 - January 26, 2015
- Finalized API, in line with raml2html
- Added resource-level descriptions
- Hiding empty resources
- No longer depends on raml2html, using raml2obj directly

0.4.1 - September 10, 2014
- Reinstated raml2md-as-a-library functionality

0.4.0 - September 10, 2014
- Greatly simplified the code by calling raml2html's methods

0.3.0 - July 16, 2014
- Render securedBy info
- Clean extra newlines in output
- Improvements in rendering of methods and top level documentation

0.2.0 - July 10, 2014
- Synchronised code changes with raml2html

0.1.0 - June 12, 2014
- Initial release
