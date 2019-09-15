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
			message: 'Template name ("standard-level", "program-finder")',
			default: ''
		}];

		return this.prompt(prompts).then(function (props) {
			let name = props.name;
			let pretty = name;

			this.safename = util._format_input(name);
			this.prettyname = _.startCase(name);

			done();
		}.bind(this));
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('template.hbs'),
			this.destinationPath('app/assemble/' + this.safename + '.hbs'),
			{
				pretty: this.prettyname,
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('template.scss'),
			this.destinationPath('app/scss/templates/_' + this.safename + '.scss'),
			{
				name: this.safename
			}
		);

		this.fs.copyTpl(
			this.templatePath('template.json'),
			this.destinationPath('app/assemble/fixtures/' + this.safename + '.json'),
			{
				pretty: this.prettyname
			}
		);
	}
};
