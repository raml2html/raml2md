#!/usr/bin/env node

'use strict';

var path = require('path');
var raml2obj = require('raml2obj');
var pjson = require('./package.json');
var nunjucks = require('nunjucks');
var Q = require('q');

exports = module.exports = {
  getDefaultConfig: getDefaultConfig,
  render: render
};

/*
 The config object can contain the following keys and values:
 template: url to the main template (required)
 templatesPath: a folder containing the templates (optional, by default it's relative to your working directory)
 processOutput: function that takes data, return a promise (optional)
 */
function render(source, config) {
  config = config || {};
  config.raml2MdVersion = pjson.version;

  nunjucks.configure(config.templatesPath, {watch: false});

  return raml2obj.parse(source).then(function(ramlObj) {
    ramlObj.config = config;

    return Q.fcall(function() {
      var result = nunjucks.render(config.template, ramlObj);
      if (config.processOutput) {
        return config.processOutput(result);
      }

      return result;
    });
  });
}

function getDefaultConfig(mainTemplate, templatesPath) {
  if (!mainTemplate) {
    // When using the default templates, use raml2md's lib folder as the templates path
    mainTemplate = 'template.nunjucks';
    templatesPath = path.join(__dirname, 'lib');
  }

  return {
    template: mainTemplate,
    templatesPath: templatesPath,
    processOutput: function(data) {
      return data.replace(/\n{3,}/g, '\n\n');
    }
  };
}

if (require.main === module) {
  console.log('This script is meant to be used as a library. You probably want to run bin/raml2md if you\'re looking for a CLI.');
  process.exit(1);
}
