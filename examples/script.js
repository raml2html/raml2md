#!/usr/bin/env node

'use strict';

/*
 Example of using raml2md as a script.
 Run this as `node script.js`
 */

const raml2md = require('..');
const path = require('path');
const ramlFile = path.join(__dirname, 'example.raml');

// raml2md.render() needs a config object with at least a `template` property (a url to a Nunjucks template).
// Instead of creating this config object ourselves, we can just ask for raml2md.getDefaultConfig():
const config1 = raml2md.getDefaultConfig();

raml2md.render(ramlFile, config1).then((result) => {
  console.log('1: ', result.length);
}, (error) => {
  console.log('error 1 ', error);
});

const config2 = raml2md.getDefaultConfig('./custom-template-test/template.nunjucks', __dirname);

raml2md.render(ramlFile, config2).then((result) => {
  console.log('2: ', result.trim().length);
}, (error) => {
  console.log('error 2 ', error);
});

const config3 = raml2md.getDefaultConfig();
config3.processOutput = function () {
  return 'A';
};

raml2md.render(ramlFile, config3).then((result) => {
  console.log('3: ', result.length);
}, (error) => {
  console.log('error 3 ', error);
});
