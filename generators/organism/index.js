'use strict';

const Generator = require('yeoman-generator');
const util = require('../../lib/utils.js');
const _ = require('lodash');

module.exports = class extends Generator {

	constructor(args, opts) {

		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

		this.pkg = require('../../package.json');

	}

	prompting() {
		var done = this.async();

		var prompts = [{
			type: 'input',
			name: 'name',
			message: 'Organism name ("global-slider", "news-feed")',
			default: ''
		}, {
			type: 'input',
			name: 'tag',
			message: 'Parent tag (Default: div)',
			default: 'div'
		}, {
			type: 'input',
			name: 'script',
			message: 'JS module? E.g. accordion (Default: none)',
			default: ''
		}];

		return this.prompt(prompts).then(function (props) {
			var name = props.name;
			var tag = props.tag;
			var script = props.script;

			if (tag === '' || typeof tag === 'undefined') {
				tag = 'div';
			}

			this.safename = util._format_input(name);
			this.prettyname = _.startCase(name);
			this.tag = _.lowerCase(tag);

			if (script !== '') {
				this.script = script;
				this.scriptName = _.camelCase(script);
			}

			done();
		}.bind(this));
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('organism.hbs'),
			this.destinationPath('app/assemble/organisms/_' + this.safename + '.hbs'),
			{
				tag: this.tag,
				pretty: this.prettyname,
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('organism.scss'),
			this.destinationPath('app/scss/organisms/_' + this.safename + '.scss'),
			{
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('molecule.hbs'),
			this.destinationPath('app/assemble/molecules/' + this.safename + '.hbs'),
			{
				tag: this.tag,
				pretty: this.prettyname,
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('molecule.scss'),
			this.destinationPath('app/scss/molecules/_' + this.safename + '.scss'),
			{
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('organism.json'),
			this.destinationPath('app/assemble/fixtures/' + this.safename + '.json'),
			{
				pretty: this.prettyname
			}
		);

		if (this.scriptName !== '') {

			this.fs.copyTpl(
				this.templatePath('organism.js'),
				this.destinationPath('app/ejs/modules/' + this.scriptName + '.js'),
				{
					pretty: this.pretty,
					name: this.scriptName
				}
			);

		}
	}
};
