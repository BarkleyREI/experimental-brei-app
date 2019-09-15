'use strict';

const Generator = require('yeoman-generator');
const util = require('../../lib/utils.js');

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
			message: 'Partial name ("_green-button", "header-logo")',
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

			this.safename = _.snakeCase(name);
			this.prettyname = _.startCase(name);
			this.tag = _.lowerCase(tag);

			done();
		}.bind(this));
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('partial.hbs'),
			this.destinationPath('app/assemble/partials/' + this.name + '.hbs'),
			{
				tag: this.tag,
				pretty: this.pretty,
				name: this.name
			}
		);

		this.fs.copyTpl(
			this.templatePath('partial.scss'),
			this.destinationPath('app/scss/partials/_' + this.name + '.scss'),
			{
				name: this.name
			}
		);
	}
};
