#! /usr/bin/env node

import fs from 'fs';
import { exec } from 'child_process';
import { program } from 'commander';
import schedule from 'node-schedule';
import pino from 'pino';

import { validateConfig } from './src/validateConfig.js';

program
	.name('imogen')
	.version('0.3.0');
program.command('run')
	.description('Run imogen job scheduler.')
	.option('-c, --config <string>', 'Config file', 'test.config.json')
	.action(
		(str, options) => {
			// Make Logger
			const fileTransport = pino.transport({
				targets: [
					{
						target: 'pino/file',
						options: { destination: 'imogen.log' },
					},
					{
						target: 'pino-pretty',
						options: {},
					},
				],
			});
			const logger = pino({}, fileTransport);

			// Load Options
			const opts = options.opts();

			// Load config
			let config = fs.readFileSync(opts.config);
			config = JSON.parse(config);

			// Validate Config
			logger.info('Validating the config file...');
			validateConfig(config);
			logger.info('Validated the config file.');

			// Schedule Jobs
			config.jobs.forEach(
				(job) => {
					let isRunning = false;

					logger.info(`Scheduling job '${job.name}'. Running on schedule: '${job.time}'`);
					schedule.scheduleJob(
						job.time,
						async () => {
							if (!(isRunning && job.simultaneous)) {
								if (job.name !== undefined) {
									logger.info(`Starting execution of job "${job.name}".`);
								} else {
									logger.info(`Starting execution of job "${job.command}".`);
								}
								isRunning = true;
								exec(
									job.command,
									(err, stdout, stderr) => {
										if (err) {
											logger.error(`Failed to run job: ${err}`);
										}
										if (stdout) {
											logger.info(`Execution STDOUT:\n${stdout}`);
										}
										if (stderr) {
											logger.info(`Execution STDERR:\n${stderr}`);
										}
										if (job.name !== undefined) {
											logger.info(`Finished execution of job "${job.name}".`);
										} else {
											logger.info(`Finished execution of job "${job.command}".`);
										}
									},
								);
								isRunning = false;
							}
						},
					);
				},
			);
		},
	);
program.command('validate')
	.description('Validate a configuration file.')
	.option('-c, --config <string>', 'Config file', 'test.config.json')
	.action(
		(str, options) => {
			// Make Logger
			const logger = pino();

			// Load Options
			const opts = options.opts();

			// Load config
			let config = fs.readFileSync(opts.config);
			config = JSON.parse(config);

			// Validate Config
			logger.info('Validating the config file...');
			validateConfig(config);
			logger.info('Validated the config file.');
		},
	);

program.parse();
