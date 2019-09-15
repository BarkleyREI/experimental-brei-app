'use strict';

var Generator = require('yeoman-generator');
var yosay = require('yosay');
var updateNotifier = require('update-notifier');
var pkg = require('../../package.json');

module.exports = class extends Generator {

	constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    	super(args, opts);
	}

	initializing() {
		this.pkg = require('../../package.json');
		this.answer = 'new';
	}

	prompting() {

		var done = this.async();

		this.log(yosay(
			'Welcome to the BarkleyREI project generator!\nv' + this.pkg.version
		));

		let notifier = updateNotifier({
			pkg,
			updateCheckInterval: 1
		});

		if (notifier.update) {

			this.log(yosay(
				'I say, there seems to be an update to the generator! Go and fetch it!'
			));

			notifier.notify();

			return true;

		} else {

			return this.prompt({
				type: 'list',
				name: 'command',
				message: 'What would you like to do?',
				default: 'Create a New Project',
				choices: [
					'Create a New Project',
					'Create a Template',
					'Create an Organism',
					'Create a Molecule',
					'Create an Atom',
					'Create a Partial (LEGACY)',
					'Create a Module (LEGACY)'
					// 'Import a Pattern',
					// 'Update Your Project'
				]
			}).then(function(answer) {

				switch (answer.command) {
					case 'Create a Partial (LEGACY)':
						this.answer = 'partial';
						// this.composeWith('brei-next:partial', {});
						break;
					case 'Create a Module (LEGACY)':
						this.answer = 'module';
						// this.composeWith('brei-next:module', {});
						break;
					case 'Create a Template':
						this.answer = 'template';
						// this.composeWith('brei-next:template', {});
						break;
					case 'Create an Organism':
						this.answer = 'organism';
						// this.composeWith('brei-next:template', {});
						break;
					case 'Create a Molecule':
						this.answer = 'molecule';
						// this.composeWith('brei-next:template', {});
						break;
					case 'Create an Atom':
						this.answer = 'atom';
						// this.composeWith('brei-next:template', {});
						break;
					// case 'Import a Pattern':
						// this.answer = 'pattern';
						// this.composeWith('brei-next:pattern', {});
						// break;
					// case 'Update Your Project':
						// this.answer = 'update';
						// this.composeWith('brei-next:update', {});
						// break;
					default: //'Create a New Project'
						// this.composeWith('brei-next:new');
						break;
				}

				done();

			}.bind(this));

		}
	}

	install() {
		this.composeWith('brei-next:' + this.answer);
	}
};
