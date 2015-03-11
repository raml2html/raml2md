#!/usr/bin/env node

'use strict';

var raml2obj = require('raml2obj');
var program = require('commander');
var fs = require('fs');
var pjson = require('../package.json');

var nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });


function render(source, config, onSuccess, onError) {
    config = config || {};
    config.raml2MdVersion = pjson.version;

    raml2obj.parse(source, function(ramlObj) {
        ramlObj.config = config;

        var result = nunjucks.render(config.template, ramlObj);

        if (config.processOutput) {
            config.processOutput(result, onSuccess, onError)
        } else {
            onSuccess(result);
        }
    }, onError);
}

function getDefaultConfig(mainTemplate) {
    if (typeof mainTemplate !== 'function') {
        mainTemplate = mainTemplate || 'lib/template.nunjucks';
    }

    return {
        template: mainTemplate,
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
    render(input, getDefaultConfig(program.template), function(result) {
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
