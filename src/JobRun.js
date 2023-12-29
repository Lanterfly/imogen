import fs from "fs";
import pino from "pino";
import schedule from "node-schedule";
import {DateTime} from "luxon";
import {exec} from "child_process";

import {loadConfig, validateConfig} from "./ConfigUtil.js";

const RUNNING_STATUSES = {};

const onCompletedJob = (err, stdout, stderr) => {
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
};

const runJob = async (logger, job) => {
	const startTime = DateTime.now();

	if (!(RUNNING_STATUSES[job.name] && job.simultaneous)) {
		if (job.name !== undefined) {
			logger.info(`Starting execution of job "${job.name}".`);
		} else {
			logger.info(`Starting execution of job "${job.command}".`);
		}
		RUNNING_STATUSES[job.name] = true;
		exec(
			job.command,
			onCompletedJob,
		);
		RUNNING_STATUSES[job.name] = false;
	}
};

const scheduleJob = (logger, job) => {
	RUNNING_STATUSES[job.name] = false;

	logger.info(`Scheduling job '${job.name}'. Running on schedule: '${job.time}'`);
	schedule.scheduleJob(
		job.time,
		runJob,
	);
};

export default (str, options) => {
	// Load Config
	const config = loadConfig(options.opts());

	// Validate Config
	validateConfig(config);

	// Make Logger
	const logger = pino(config.pino.options, config.pino.destination);

	// Schedule Jobs
	config.jobs.forEach(
		(job) => scheduleJob(logger, job),
	);
};