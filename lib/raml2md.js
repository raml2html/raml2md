#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var handlebars = require('handlebars');
var program = require('commander');
var fs = require('fs');
var pjson = require('../package.json');

function _render(ramlObj, config, onSuccess) {
    // Register handlebar helpers
    for (var helperName in config.helpers) {
        if (config.helpers.hasOwnProperty(helperName)) {
            handlebars.registerHelper(helperName, config.helpers[helperName]);
        }
    }

    // Register handlebar partials
    for (var partialName in config.partials) {
        if (config.partials.hasOwnProperty(partialName)) {
            handlebars.registerPartial(partialName, config.partials[partialName]);
        }
    }

    var result = config.template(ramlObj).replace(/\n{3,}/g, '\n\n');
    onSuccess(result);
}

function parseWithConfig(source, config, onSuccess, onError) {
    raml2obj.parse(source, function(ramlObj) {
        ramlObj.config = config;
        ramlObj.config.raml2HtmlVersion = pjson.version;
        _render(ramlObj, config, onSuccess);
    }, onError);
}

function getDefaultConfig() {
    return {
        'template': require('./template.handlebars'),
        'partials': {
            'resource': require('./resource.handlebars')
        }
    };
}

function parse(source, onSuccess, onError) {
    parseWithConfig(source, getDefaultConfig(), onSuccess, onError);
}


if (require.main === module) {
    program
        .usage('[options] [RAML input file]')
        .option('-i, --input [input]', 'RAML input file')
        .option('-o, --output [output]', 'Markdown output file')
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

    // Start the parsing process
    parse(input, function(result) {
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


module.exports.parse = parse;
module.exports.parseWithConfig = parseWithConfig;
module.exports.getDefaultConfig = getDefaultConfig;
