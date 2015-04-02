#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var program = require('commander');
var fs = require('fs');
var pjson = require('../package.json');
var nunjucks = require('nunjucks');
var Q = require('q');

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

function getDefaultConfig(mainTemplate) {
  var templatesPath = null;

  if (!mainTemplate) {
    mainTemplate = 'template.nunjucks';
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
  program
    .usage('[options] [RAML input file]')
    .version(pjson.version)
    .option('-i, --input [input]', 'RAML input file')
    .option('-o, --output [output]', 'Markdown output file')
    .option('-t, --template [template]', 'Path to custom template.nunjucks file')
    .parse(process.argv);

  var input = program.input;

  if (!input) {
    if (program.args.length !== 1) {
      console.error('Error: You need to specify the RAML input file');
      program.help();
      process.exit(1);
    }

    input = program.args[0];
  }

  // Start the rendering process
  render(input, getDefaultConfig(program.template)).then(function(result) {
    if (program.output) {
      fs.writeFileSync(program.output, result);
    } else {
      // Simply output to console
      process.stdout.write(result);
      process.exit(0);
    }
  }, function(error) {
    console.log('Error parsing: ' + error);
    process.exit(1);
  });
}

module.exports.getDefaultConfig = getDefaultConfig;
module.exports.render = render;
