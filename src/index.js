#! /usr/bin/env node

import fs from 'fs';

import _ from 'lodash';
import { program } from 'commander';
import schedule from 'node-schedule';
import pino from 'pino';
import { exec } from 'child_process';

export const loadConfig = (options) => {
	// Load Options
	const opts = options.opts();

	// Load config
	const config = fs.readFileSync(opts.config);
	return JSON.parse(config);
};

const run = (str, options) => {
	const logger = pino();

	logger.info("Starting Imogen...");

	logger.info('Reading config file...');
	const config = loadConfig(options);
	logger.info('Read config file.');

	logger.info('Registering jobs...');
	if (_.isArray(config.jobs) && config.jobs.length > 0) {
		const errors = [];
		for (let i = 0; i < config.jobs.length; i++) {
			const job = config.jobs[i];

			if (!(_.isString(job.name) && job.name.length > 0 && job.name.match(/([a-zA-Z0-9-_])+/))) {
				errors.push(`Job #${i} has an invalid name.`);
			}
			if (!(_.isString(job.command) && job.command.length > 0)) {
				errors.push(`Job #${i} has an invalid command.`);
			}

		}
		if (errors.length === 0) {
			for (const job of config.jobs) {
				schedule.scheduleJob(
					job.time,
					() => {
						logger.info(`Running job ${job.name}`);
						exec(
							job.command,
							(err, stdout, stderr) => {
								// Log STDOUT and STDERR
								if (stdout) {
									logger.info(`Job '${job.name}' STDOUT:\n${stdout}`);
								}
								if (stderr) {
									logger.info(`Job '${job.name}' STDERR:\n${stderr}`);
								}

								if (err) {
									logger.error(`Failed to run job: ${err}`);
								} else {
									// Log job completion
									logger.info(`Finished execution of job "${job.name}".`);
								}
							},
						);
					}
				)
			}
		} else {
			for (const error of errors) {
				logger.error(error);
			}
		}
		logger.info("Registered Jobs");
	} else {
		logger.error("No jobs to run.");
	}
};


program.name('imogen')
	.version('2.0.0')
	.option('-c, --config <string>', 'Config file', 'imogen.config.json')
	.action(run);

program.parse();
