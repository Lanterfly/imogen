#! /usr/bin/env node

import { program } from 'commander';

import jobValidate from './src/JobValidate.js';
import jobRun from './src/JobRun.js';

program
	.name('imogen')
	.version('2.0.0');
program.command('run')
	.description('Run imogen job scheduler.')
	.option('-c, --config <string>', 'Config file', 'test.config.json')
	.action(jobRun);
program.command('validate')
	.description('Validate a configuration file.')
	.option('-c, --config <string>', 'Config file', 'test.config.json')
	.action(jobValidate);

program.parse();
