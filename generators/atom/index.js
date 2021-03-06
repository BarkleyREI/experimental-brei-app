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
				message: 'Atom name ("logo", "button")',
				default: ''
			}, {
				type: 'input',
				name: 'tag',
				message: 'Parent tag (Default: div)',
				default: 'div'
			}
		]);

		let name = this.answers.name;
		let tag = this.answers.tag;
		let pretty = name;

		if (tag === '' || typeof tag === 'undefined') {
			tag = 'div';
		}

		this.safename = util._format_input(name);
		this.prettyname = _.startCase(pretty);
		this.tag = _.lowerCase(tag);

	}

	writing() {

		this.fs.copyTpl(
			this.templatePath('atom.hbs'),
			this.destinationPath('app/assemble/atoms/' + this.safename + '.hbs'),
			{
				tag: this.tag,
				pretty: this.prettyname,
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('atom.scss'),
			this.destinationPath('app/scss/atoms/_' + this.safename + '.scss'),
			{
				name: this.safename
			}
		);

	}
	
};
