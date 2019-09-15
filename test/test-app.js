/*global describe, before, it, require, __dirname*/

const path = require('path');
const helpers = require('yeoman-test');
const os = require('os');
const util = require('../lib/utils.js');
const exec = require('child_process').exec;
const assert = require('yeoman-assert');

// Global vars
let build_error_code = 0;
let build_error_msg = '';
let build_error_stdout = '';

/**
 * Test basic file generation,
 * including that from brei-assemble-structure, brei-assemble-helpers, brei-sass-boilerplate.
 */
// describe('Main Generator', function () {
// 	'use strict';
//
// 	before(function mainGenerator(done) {
// 		var tdir = path.join(os.tmpdir(), './temp');
// 		this.timeout(120000);
//
// 		console.log('\nRunning a generator with npm install. This might take a while...\n\n');
//
// 		helpers.run(path.join(__dirname, '../generators/new'))
// 			.inDir(tdir)
// 			.withOptions({
// 				'skip-install': false
// 			})
// 			.withPrompts({
// 				'deployDirectory': 'web'
// 			})
// 			.on('end', function () {
// 				console.log('\nRunning npm run build and npm run deploy');
// 				console.log('------------');
// 				console.log('Buckle up, this might take 45 - 60 seconds\n');
//
// 				exec('npm run build && npm run deploy', {
// 					cwd: tdir
// 				}, function (error, stdout, stderr) {
// 					if (error !== null) {
// 						if (error.code !== null) {
// 							if ('0' !== error.code.toString()) {
// 								build_error_code = error.code;
// 								build_error_msg = error.message;
// 								build_error_stdout = stdout;
// 							}
// 						}
// 					}
//
// 					done();
// 				});
// 			});
// 	});
//
// 	it('Build finished with an error code of 0', function () {
//
// 		if ('0' !== build_error_code.toString()) {
// 			console.log('\n\n -- ERROR --\n');
// 			console.error(build_error_msg);
// 			console.log(build_error_stdout);
// 			console.log('\n -- /ERROR --\n\n');
// 		}
//
// 		assert.textEqual('0', build_error_code.toString());
// 	});
//
// 	it('Standard project setup was created with all files and folders we expect', function () {
//
// 		var tdir = path.join(os.tmpdir(), './temp/');
// 		util._test_brei_npm_built_files(tdir);
//
// 	});
//
// });

describe('Check Generator Files', function () {
	'use strict';

	it('Generator self check', function () {
		var dir = path.join(__dirname, '../');
		util._test_brei_generator_files(dir);
	});
});

// Atomic Generators
describe('Template Sub-Generator', function () {
	'use strict';
	util._test_sub_generators('template');
});

describe('Organism Sub-Generator - ', function () {
	'use strict';
	util._test_sub_generators('organism');
});

describe('Molecule Sub-Generator - ', function () {
	'use strict';
	util._test_sub_generators('molecule');
});

describe('Atom Sub-Generator - ', function () {
	'use strict';
	util._test_sub_generators('atom');
});

// Legacy Generators
describe('Module (Legacy) Sub-Generator - ', function () {
	'use strict';
	util._test_sub_generators('module');
});

describe('Partial (Legacy) Sub-Generator - ', function () {
	'use strict';
	util._test_sub_generators('partial');
});
