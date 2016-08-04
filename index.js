#!/usr/bin/env node

'use strict';

const raml2obj = require('raml2obj');
const pjson = require('./package.json');
const nunjucks = require('nunjucks');

/*
 The config object can contain the following keys and values:
 template: url to the main template (required)
 templatesPath: a folder containing the templates (optional, by default it's relative to your working directory)
 processOutput: function that takes data, return a promise (optional)
 */
function render(source, config) {
  const env = nunjucks.configure(config.templatesPath, { autoescape: false });

  config = config || {};
  config.raml2MdVersion = pjson.version;

  return raml2obj.parse(source).then((ramlObj) => {
    ramlObj.config = config;

    return new Promise((resolve) => {
      const result = env.render(config.template, ramlObj);
      if (config.processOutput) {
        resolve(config.processOutput(result));
      }

      return resolve(result);
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
    templatesPath,
    processOutput(data) {
      return data.replace(/\n{3,}/g, '\n\n');
    },
  };
}

if (require.main === module) {
  console.log('This script is meant to be used as a library. You probably want to run bin/raml2md if you\'re looking for a CLI.');
  process.exit(1);
}

module.exports = {
  getDefaultConfig,
  render,
};
