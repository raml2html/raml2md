#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var pjson = require('./package.json');
var nunjucks = require('nunjucks');
var Q = require('q');

module.exports = {
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

  var env = nunjucks.configure(config.templatesPath, {autoescape: false});

  return raml2obj.parse(source).then(function(ramlObj) {
    ramlObj.config = config;

    return Q.fcall(function() {
      var result = env.render(config.template, ramlObj);
      if (config.processOutput) {
        return config.processOutput(result);
      }

      return result;
    });
  });
}

function getDefaultConfig(mainTemplate, templatesPath) {
  if (!mainTemplate) {
    mainTemplate = './lib/template.nunjucks';

    // When using the default template, make sure that Nunjucks isn't
    // using the working directory since that might be anything
    templatesPath = __dirname;
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
