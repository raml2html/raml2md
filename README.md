# RAML to Markdown

A simple RAML to Markdown documentation generator, written for Node.js. 
Check [raml2html](https://github.com/kevinrenskers/raml2html) for a RAML to HTML generator.


## Install
```
npm i -g raml2md
```


## Usage
As a command line script:

```
raml2md example.raml > example.md
raml2md -i example.raml -o example.md
```

As a library:

```
var raml2md = require('raml2md');

// Using the default templates:
// source can either be a filename, file contents (string) or parsed RAML object
var config = raml2md.getDefaultConfig(); 
raml2md.render(source, config, onSuccess, onError);

// Using your own templates:
// config should be an object with at least an `template` property
raml2md.render(source, config, onSuccess, onError);
```


## Contribute
raml2md is an open source project and your contribution is very much appreciated.

1. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
2. Fork the repository on Github and make your changes on the develop branch (or branch off of it).
   Please retain the code style that is used in the project.
3. Add an example of the new feature to example.raml (if applicable)
4. Send a pull request (with the develop branch as the target).

A big thank you goes out to everyone who helped with the project, the [contributors](https://github.com/kevinrenskers/raml2md/graphs/contributors)
and everyone who took the time to report issues and give feedback.


## To do
This project is in an early stage. The generated Markdown is missing a lot of details but should be very usable
for README's, for example.


## License
raml2md is available under the MIT license. See the LICENSE file for more info.
