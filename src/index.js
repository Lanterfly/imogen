#! /usr/bin/env node

import { program } from 'commander';

program.name('imogen')
	.version('2.0.0')
	.option('-c, --config <string>', 'Config file', 'test.config.json')
	.action(
		(str, options) => {

		},
	);

program.parse();
