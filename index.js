#! /usr/bin/env node

import { program } from 'commander';

import {run, validate} from './src/CLI.js';

program
	.name('imogen')
	.version('0.1.0');
program.command('run')
	.description('Run imogen job scheduler.')
	.option('-c, --config <string>', 'Config file', 'test.config.json')
	.action((str, options) => run(str, options));
program.command('validate')
	.description('Validate a configuration file.')
	.option('-c, --config <string>', 'Config file', 'test.config.json')
	.action((str, options) => validate(str, options));

program.parse();
