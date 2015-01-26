#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var handlebars = require('handlebars');
var program = require('commander');
var fs = require('fs');
var pjson = require('../package.json');


function _emptyResourceCheckHelper(options) {
    if (this.methods || (this.description && this.parentUrl)) {
        return options.fn(this);
    }
}

function render(source, config, onSuccess, onError) {
    config = config || {};
    config.raml2MdVersion = pjson.version;

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

    raml2obj.parse(source, function(ramlObj) {
        ramlObj.config = config;

        var result;
        if (typeof config.template === 'string') {
            result = handlebars.compile(config.template)(ramlObj);
        } else {
            result = config.template(ramlObj);
        }

        if (config.processOutput) {
            config.processOutput(result, onSuccess, onError)
        } else {
            onSuccess(result);
        }
    }, onError);
}

function getDefaultConfig(mainTemplate, resourceTemplate) {
    if (typeof mainTemplate !== 'function') {
        mainTemplate = fs.readFileSync(mainTemplate || __dirname + '/template.handlebars', 'utf8');
    }
    if (typeof resourceTemplate !== 'function') {
        resourceTemplate = fs.readFileSync(resourceTemplate || __dirname + '/resource.handlebars', 'utf8');
    }

    return {
        template: mainTemplate,
        helpers: {
            emptyResourceCheck: _emptyResourceCheckHelper
        },
        partials: {
            resource: resourceTemplate
        },
        processOutput: function(data, onSuccess) {
            data = data.replace(/\n{3,}/g, '\n\n');
            onSuccess(data);
        }
    };
}

if (require.main === module) {
    program
        .usage('[options] [RAML input file]')
        .version(pjson.version)
        .option('-i, --input [input]', 'RAML input file')
        .option('-o, --output [output]', 'Markdown output file')
        .option('-t, --template [template]', 'Path to custom template.handlebars file')
        .option('-r, --resource [resource]', 'Path to custom resource.handlebars file')
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
    render(input, getDefaultConfig(program.template, program.resource), function(result) {
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
