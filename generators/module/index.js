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

	async prompting() {

		this.answers = await this.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Module name ("_global-slider", "news-feed")',
				default: ''
			}, {
				type: 'input',
				name: 'tag',
				message: 'Parent tag (Default: div)',
				default: 'div'
			}
		]);

		var name = this.answers.name;
		var tag = this.answers.tag;

		if (tag === '' || typeof tag === 'undefined') {
			tag = 'div';
		}

		this.safename = util._format_input(name);
		this.prettyname = _.startCase(name);
		this.tag = _.lowerCase(tag);

	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('module.hbs'),
			this.destinationPath('app/assemble/modules/_' + this.safename + '.hbs'),
			{
				tag: this.tag,
				pretty: this.prettyname,
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('module.scss'),
			this.destinationPath('app/sass/modules/_' + this.safename + '.scss'),
			{
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('partial.hbs'),
			this.destinationPath('app/assemble/partials/' + this.safename + '.hbs'),
			{
				tag: this.tag,
				pretty: this.prettyname,
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('partial.scss'),
			this.destinationPath('app/sass/partials/_' + this.safename + '.scss'),
			{
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('module.json'),
			this.destinationPath('app/assemble/fixtures/' + this.safename + '.json'),
			{
				pretty: this.prettyname
			}
		);
	}
};
