import fs from 'fs';
import pino from 'pino';
import schedule from 'node-schedule';
import { DateTime } from 'luxon';
import { exec } from 'child_process';

import { loadConfig, validateConfig } from './util/ConfigUtil.js';

const RUNNING_STATUSES = {};

export const onCompletedJob = (err, stdout, stderr, config, logger, job, startTime) => {
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
		logger.info(`Finished execution of job "${job.command}".`);
	}
};

export const runJob = async (config, logger, job) => {
	const startTime = DateTime.now();

	if (!(RUNNING_STATUSES[job.name] && job.overlap)) {
		if (job.name !== undefined) {
			logger.info(`Starting execution of job "${job.name}".`);
		} else {
			logger.info(`Starting execution of job "${job.command}".`);
		}
		RUNNING_STATUSES[job.name] = true;
		exec(
			`${job.command} >> ${startTime.toFormat('yyyyMMdd_HHmm')}_${job.name}_stdout.log`,
			(err, stdout, stderr) => onCompletedJob(err, stdout, stderr, config, logger, job, startTime),
		);
		RUNNING_STATUSES[job.name] = false;
	}
};

const scheduleJob = (config, logger, job) => {
	RUNNING_STATUSES[job.name] = false;

	logger.info(`Scheduling job '${job.name}'. Running on schedule: '${job.time}'`);
	schedule.scheduleJob(
		job.time,
		() => runJob(config, logger, job),
	);
};

export default (str, options) => {
	// Load Config
	const config = loadConfig(options);

	// Validate Config
	validateConfig(config);

	// Make Logger
	let logger;
	if (config.pino) {
		logger = pino(config.pino.options, config.pino.destination);
	} else {
		logger = pino();
	}

	// Schedule Jobs
	config.jobs.forEach(
		(job) => scheduleJob(config, logger, job),
	);
};
