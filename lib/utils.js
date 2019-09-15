/*global describe, before, it*/

'use strict';

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');
const brei = require('brei-util');
const u = require('util');

// Valid objects of file directories

let validProject = [
	'README.md',
	{
		_config:
			[
				'.eslintrc.json',
				'.stylelintignore',
				'.stylelintrc.json',
				'_brei.json',
				'assemblefile.js',
				'copy.js',
				'del.js',
				'modernizr-config.json',
				'postcss.config.js',
				'webpack.config.js'
			]
	},
	{
		app:
			[
				{
					assemble:
						[
							{atoms: ['logo.hbs']},
							{
								fixtures:
									[
										'default-content.json',
										'global-footer.json',
										'global-header.json',
										'masthead.json'
									]
							},
							{helpers: ['helpers.js']},
							'home-page.hbs',
							{
								includes:
									[
										'_access-nav.hbs',
										'_css-main.hbs',
										'_fonts.hbs',
										'_js-home.hbs',
										'_js-level.hbs',
										'_js-main.hbs',
										'_js-modernizr.hbs',
										'_meta.hbs',
										'_svg.hbs'
									]
							},
							'index.hbs',
							{
								layouts:
									[
										'default.hbs',
										'home.hbs',
										'index.hbs',
										'level.hbs',
										'module.hbs'
									]
							},
							{
								molecules: [
									'masthead.hbs',
									'primary-nav.hbs'
								]
							},
							{
								organisms:
									[
										'_global-footer.hbs',
										'_global-header.hbs',
										'_masthead.hbs'
									]
							}
						]
				},
				{
					components:
						[
							'_global-footer.html',
							'_global-header.html',
							'_masthead.html'
						]
				},
				{
					css:
						[
							'_settings.css',
							'_settings.css.map',
							'main.css',
							'main.css.map'
						]
				},
				{
					ejs: [
						{
							lib: ['jquery.js']
						},
						'main.js'
					]
				},
				'home-page.html',
				{img: [ '.gitkeep' ]},
				'index.html',
				{js: ['main.js', {plugins: ['modernizr.js']}]},
				{
					scss:
						[
							'_settings.scss',
							'_theme.scss',
							{
								atoms: [
									'_assemble-atoms.scss',
									'_logo.scss'
								]
							},
							{
								common:
									['_body.scss',
										'_defaults.scss',
										'_forms.scss',
										'_headings.scss',
										'_hr.scss',
										'_images.scss',
										'_index.scss',
										'_links.scss',
										'_lists.scss',
										'_selection.scss',
										'_tables.scss']
							},
							{
								helpers:
									[
										'_placeholders.scss',
										'_user-markup.scss',
										{
											lib: ['_animate.scss']
										},
										{
											mixins:
												[
													'_headers.scss',
													'_layer.scss',
													'_links.scss',
													'_mixins.scss'
												]
										}
									]
							},
							{icons: ['README.md']},
							{layout: ['_layout.scss']},
							'main.scss',
							{
								molecules:
									[
										'_assemble-molecules.scss',
										'_masthead.scss',
										'_primary-nav.scss'
									]
							},
							{
								organisms:
									[
										'_assemble-organisms.scss',
										'_global-footer.scss',
										'_global-header.scss',
										'_masthead.scss'
									]
							},
							{
								templates: [
									'_assemble-templates.scss',
									'_home-page.scss'
								]
							}
						]
				}]
	},
	{
		dist:
			[{
				components:
					['_global-footer.html',
						'_global-header.html',
						'_masthead.html']
			},
				{
					css:
						['_settings.css',
							'_settings.css.map',
							'main.css',
							'main.css.map']
				},
				'home-page.html',
				'index.html',
				{js: ['main.js', {plugins: ['modernizr.js']}]}]
	},
	{
		lib:
			[
				'browsersync.js',
				'copy.js',
				'del.js',
				'nodesass.js',
				'updateScss.js'
			]
	},
	'package.json',
	{test: ['test.js']},
	{
		web:
			[
				{
					components:
						['_global-footer.html',
							'_global-header.html',
							'_masthead.html']
				},
				{
					css:
						['_settings.css',
							'_settings.css.map',
							'main.css',
							'main.css.map']
				},
				'home-page.html',
				'index.html',
				{
					js: [
						'main.js',
						{
							plugins: ['modernizr.js']
						}
					]
				}
			]
	}];
let validGenerator = [];

/**
 * TEST UTILITIES
 **/
const _set_vars = module.exports._set_vars = function (name, type) {
	let fullName = type === 'module' ?
		'_test-' + name :
		'test-' + name;

	let hbsPath = type === 'template' ?
		'app/assemble/' + fullName + '.hbs' :
		'app/assemble/' + type + 's/' + fullName + '.hbs';

	let scssPath = type === 'module' ?
		'app/scss/' + type + 's/' + fullName + '.scss' :
		'app/scss/' + type + 's/_' + fullName + '.scss';

	let hbsRegx = new RegExp('class\=".*(test-' + name + ').*"');
	let scssRegx = new RegExp('\.test-' + name);

	return {
		fullName: fullName,
		hbsPath: hbsPath,
		scssPath: scssPath,
		hbsRegx: hbsRegx,
		scssRegx: scssRegx
	};
};

const _it_tests = module.exports._it_tests = function (vars, type) {
	it('Created ' + vars.fullName + '.hbs and ' + vars.fullName + '.scss', function () {
		assert.file([
			vars.hbsPath,
			vars.scssPath
		]);
	});

	if (type !== 'pattern') {

		if (type !== 'module') {
			it(vars.fullName + ' .hbs have the right content', function () {
				assert.fileContent([
					[vars.hbsPath, vars.hbsRegx]
				]);
			});
		}
		it(vars.fullName + ' .scss have the right content', function () {
			assert.fileContent([
				[vars.scssPath, vars.scssRegx]
			]);
		});
	}
};

const _test_sub_generators = module.exports._test_sub_generators = function (name) {
	var vars = _set_vars(name, name);

	describe('Create new ' + name, function () {
		before(function subGenerator(done) {
			helpers.run(path.join(__dirname, '../generators/' + name))
				.withPrompts({
					name: 'test ' + name
				})
				.on('end', done);
		});

		_it_tests(vars, name);
	});
};

const _test_patterns = module.exports._test_patterns = function (name) {
	var vars = _set_vars('pattern-' + name, name);

	describe('Import ' + name + ' Pattern', function () {
		before(function pattern(done) {
			helpers.run(path.join(__dirname, '../generators/pattern'))
				.withPrompts({
					type: name,
					name: 'test-pattern-' + name
				})
				.on('end', done);
		});

		_it_tests(vars, 'pattern');
	});
};

const _test_brei_npm_built_files = module.exports._test_brei_npm_built_files = function (prefix) {

	let tdir = path.join(os.tmpdir(), './temp/');

	let ttree = brei.tree(tdir);

	let actual = brei.ftree(ttree);

	let expected = brei.filterObject(valid);

	console.log('\n------- actual --------\n');
	console.log(u.inspect(actual, false, null));

	console.log('\n------- valid --------\n');
	console.log(u.inspect(expected, false, null));

	// console.log('\n------- test --------\n');
	// console.log(u.inspect(brei.deepNotOnly(actual, expected), false, null));

	brei.assert(brei.deep(brei.deepNotOnly(actual, expected), {}));

};

const _test_brei_generator_files = module.exports._test_brei_generator_files = function (prefix) {

	let tdir = path.join(os.tmpdir(), './temp/');

	let ttree = brei.tree(tdir);

	let actual = brei.ftree(ttree);

	let expected = brei.filterObject(valid);

	console.log('\n------- actual --------\n');
	console.log(u.inspect(actual, false, null));

	console.log('\n------- valid --------\n');
	console.log(u.inspect(expected, false, null));

	// console.log('\n------- test --------\n');
	// console.log(u.inspect(brei.deepNotOnly(actual, expected), false, null));

	brei.assert(brei.deep(brei.deepNotOnly(actual, expected), {}));

	var pre = '';
	if (typeof prefix !== undefined && prefix !== '') {
		pre = prefix;
	}

	assert.file([
		pre + 'generators/app/index.js',
		pre + 'generators/module/index.js',
		pre + 'generators/module/templates/module.hbs',
		pre + 'generators/module/templates/module.json',
		pre + 'generators/module/templates/module.scss',
		pre + 'generators/new/index.js',
		pre + 'generators/new/templates/',
		pre + 'generators/new/templates/gitignore',
		pre + 'generators/partial/index.js',
		pre + 'generators/partial/templates/partial.hbs',
		pre + 'generators/partial/templates/partial.scss',
		pre + 'generators/template/index.js',
		pre + 'generators/template/templates/template.hbs',
		pre + 'generators/template/templates/template.json',
		pre + 'generators/template/templates/template.scss',
		pre + 'lib/utils.js',
		pre + 'test/mocha.opts',
		pre + 'test/test-app.js',
		pre + 'test/test-utils.js',
		pre + 'package.json',
		pre + 'README.md'
	]);

};

/**
 * GENERATOR UTILITIES
 **/
const _format_input = module.exports._format_input = function (input) {
	// Remove the first _ (or __)
	if (/^_/g.test(input)) {
		input = input.replace(/^_+/g, '');
	}
	// Remove the first _ (or __)
	if (/^-/g.test(input)) {
		input = input.replace(/^-+/g, '');
	}
	// Change all whitespace to -
	if (/\s/g.test(input)) {
		input = input.replace(/\s/g, '-');
	}
	// Change all remaining _ to -
	if (/_/g.test(input)) {
		input = input.replace(/_/g, '-');
	}
	// Remove any file extensions
	if (/\..+/g.test(input)) {
		input = input.replace(/\..+/g, '');
	}
	// Remove any trailing -- or __
	if (/\s+$|-+$|_+$/.test(input)) {
		input = input.replace(/\s+$|-+$|_+$/g, '');
	}

	input = input.toLowerCase();

	return input;
};

const toTitleCase = function (str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

const _prettify_input = module.exports._prettify_input = function (input) {

	input = input.replace(/_/g, '');

	input = input.replace(/-/g, ' ');

	input = toTitleCase(input);

	return input;
};
