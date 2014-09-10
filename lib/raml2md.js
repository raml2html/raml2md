#!/usr/bin/env node

'use strict';

var raml2html = require('raml2html');
var program = require('commander');
var fs = require('fs');

function _getConfig() {
    return {
        'template': require('./template.handlebars'),
        'partials': {
            'resource': require('./resource.handlebars')
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
    raml2html.render(input, _getConfig(), function(result) {
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
