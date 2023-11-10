import fs from 'fs';
import { exec } from 'child_process';
import { program } from 'commander';
import schedule from 'node-schedule';

import { validateConfig } from './src/validateConfig.js';

program
	.name('imogen')
	.version('0.1.0');
program.command('run')
	.description('Run imogen job scheduler.')
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
			console.log('The config file is valid.');

			// Schedule Jobs
			config.jobs.forEach(
				(job) => schedule.scheduleJob(
					job.time,
					async () => {
						console.log(`Starting execution of job "${job.command}".`);
						exec(
							job.command,
							(err, stdout, stderr) => {
								if (err) {
									console.error(`Failed to run job: ${err}`);
								}
								if (stdout) {
									console.log(`Execution STDOUT:\n${stdout}`);
								}
								if (stderr) {
									console.log(`Execution STDERR:\n${stderr}`);
								}
								console.log(`Finished execution of job "${job.command}".`);
							},
						);
					},
				),
			);
		},
	);
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
			console.log('The config file is valid.');
		},
	);

program.parse();
