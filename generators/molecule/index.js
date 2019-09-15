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
		let done = this.async();

		let prompts = [{
			type: 'input',
			name: 'name',
			message: 'Molecule name ("green-button", "header-logo")',
			default: ''
		}, {
			type: 'input',
			name: 'tag',
			message: 'Parent tag (Default: div)',
			default: 'div'
		}];

		return this.prompt(prompts).then(function (props) {
			let name = props.name;
			let tag = props.tag;

			if (tag === '' || typeof tag === 'undefined') {
				tag = 'div';
			}

			this.safename = util._format_input(name);
			this.prettyname = _.startCase(name);
			this.tag = _.lowerCase(tag);

			done();
		}.bind(this));
	}

	writing() {
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
	}
};
