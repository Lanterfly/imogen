import fs from 'fs';
import { program } from 'commander';

import {validateConfig} from "./src/validateConfig.js";

program
    .name('imogen')
    .version("0.1.0");
program.command('validate')
	.description('Validate a configuration file.')
	.option('-c, --config <string>', 'Config file', 'test.config.json')
	.action(
		(str, options) => {
			// Load Options
			const opts = options.opts();

			// Load config
			let config = fs.readFileSync(opts.config);
			config = JSON.parse(config);

			// Validate Config
			validateConfig(config);
			console.log("The config file is valid.");
		},
	);

program.parse();