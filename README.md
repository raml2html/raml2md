# RAML to Markdown

[![NPM version](http://img.shields.io/npm/v/raml2md.svg)](https://www.npmjs.org/package/raml2md)
[![js-standard-style](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat)](https://github.com/airbnb/javascript)

A simple RAML to Markdown documentation generator, written for Node.js.
Check [raml2html](https://github.com/kevinrenskers/raml2html) for a RAML to HTML generator.


## Install
```
npm i -g raml2md
```


## Usage

### As a command line script
```
raml2md example.raml > example.md
raml2md -i example.raml -o example.md
raml2md -t examples/custom-template-test/template.nunjucks -i examples/example.raml -o example.md
```

### As a library

#### Using the default templates
```
var raml2md = require('raml2md');
var config = raml2md.getDefaultConfig();

// source can either be a filename, file contents (string) or parsed RAML object.
// Returns a promise.
raml2md.render(source, config).then(function(result) {
  // Save the result to a file or do something else with the result
}, function(error) {
  // Output error
});
```

#### Using your own Nunjucks templates
```
var raml2md = require('raml2md');
var config = raml2md.getDefaultConfig('my-custom-template.nunjucks', __dirname);
raml2md.render(source, config).then(...);
```

#### Custom pre-processing
```
var raml2md = require('raml2md');
var config = raml2md.getDefaultConfig();

config.processOutput = function(data) {
  // Do whatever you want here and return the modified data. 
  // The default implementation:
  return data.replace(/\n{3,}/g, '\n\n');
};

raml2md.render(source, config).then(...);

```

If you want to use a different template language, you're better off directly using [raml2obj](https://github.com/kevinrenskers/raml2obj).


## Contribute
raml2md is an open source project and your contribution is very much appreciated.

1. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
2. Fork the repository on Github and make your changes on the **develop** branch (or branch off of it).  
   Please retain the [code style](https://github.com/airbnb/javascript) that is used in the project and `npm run lint` before committing.
3. Add an example of the new feature to example.raml (if applicable)
4. Send a pull request (with the develop branch as the target).

A big thank you goes out to everyone who helped with the project, the [contributors](https://github.com/kevinrenskers/raml2md/graphs/contributors)
and everyone who took the time to report issues and give feedback.


## License
raml2md is available under the MIT license. See the LICENSE file for more info.
