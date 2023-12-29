import fs from "fs";
import pino from "pino";
import schedule from "node-schedule";
import {DateTime} from "luxon";
import {exec} from "child_process";

import {validateConfig} from "./ConfigUtil.js";

export default (str, options) => {
	// Load Options
	const opts = options.opts();

	// Set Default Config
	const DEFAULT_CONFIG = {
		record: {
			directory: 'records',
			writeStdOut: false,
			writeStdErr: false,
		},
	};

	// Load config
	let config = fs.readFileSync(opts.config);
	config = {
		...DEFAULT_CONFIG,
		...JSON.parse(config),
	};

	// Validate Config
	validateConfig(config);

	// Make Logger
	const logger = pino(config.pino.options, config.pino.destination);

	// Schedule Jobs
	config.jobs.forEach(
		(job) => {
			let isRunning = false;

			logger.info(`Scheduling job '${job.name}'. Running on schedule: '${job.time}'`);
			schedule.scheduleJob(
				job.time,
				async () => {
					const startTime = DateTime.now();

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
								// Log STDOUT and STDERR
								if (stdout) {
									logger.info(`Execution STDOUT:\n${stdout}`);
								}
								if (stderr) {
									logger.info(`Execution STDERR:\n${stderr}`);
								}

								if (err) {
									logger.error(`Failed to run job: ${err}`);
								} else {
									// Log job completion
									if (job.name !== undefined) {
										logger.info(`Finished execution of job "${job.name}".`);
									} else {
										logger.info(`Finished execution of job "${job.command}".`);
									}

									// Output STDOUT & STDERR Files
									const filePrefix = `${startTime.toFormat('yyyyMMdd_HHmm')}_${job.name}`;
									if (config.record.writeStdOut) {
										fs.writeFile(
											`${config.record.directory}/${filePrefix}_stdout.log`,
											stdout || '',
											(error) => {
												if (error) {
													logger.error(`Failed to write STDOUT file for job '${job.name}': ${error}`);
												}
											},
										);
									}
									if (config.record.writeStdErr) {
										fs.writeFile(
											`${config.record.directory}/${filePrefix}_stderr.log`,
											stderr || '',
											(error) => {
												if (error) {
													logger.error(`Failed to write STDERR file for job '${job.name}': ${error}`);
												}
											},
										);
									}
								}
							},
						);
						isRunning = false;
					}
				},
			);
		},
	);
};