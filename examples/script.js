'use strict';

/*
 Example of using raml2md as a script.
 */

var raml2md = require('../lib/raml2md');

// raml2md.render() needs a config object with at least a `template` property (a url to a Nunjucks template).
// Instead of creating this config object ourselves, we can just ask for raml2md.getDefaultConfig():
var config = raml2md.getDefaultConfig();

raml2md.render(__dirname + '/example.raml', config).then(function(result) {
  console.log(result);
}, function(error) {
  console.log('error! ', error);
});
