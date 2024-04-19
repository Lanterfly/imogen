import parser from 'cron-parser';
import fs from 'fs';

export const loadConfig = (options) => {
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
	const config = fs.readFileSync(opts.config);
	return {
		...DEFAULT_CONFIG,
		...JSON.parse(config),
	};
};

export const validateConfigJob = (job, index) => {
	// Validate "id"
	if (typeof job.id !== 'string') {
		throw new Error(`'id' field must be a string for job[${index}].`);
	} else if (job.id.length === 0) {
		throw new Error(`'id' field must be a not empty string for job[${index}].`);
	} else if (job.id.match(/([a-z]|[A-Z]|[0-9]|_|-)+/g) === null) {
		throw new Error(`'id' field for job[${index}] can only container letters, numbers, dashes, and underscores.`);
	}

	// Validate "name"
	if (typeof job.name !== 'string') {
		throw new Error(`'name' field must be a string for job[${index}].`);
	} else if (job.name.length === 0) {
		throw new Error(`'name' field must be a not empty string for job[${index}].`);
	} else if (job.name.match(/([a-z]|[A-Z]|[0-9]|_|-)+/g) === null) {
		throw new Error(`'name' field for job[${index}] can only container letters, numbers, dashes, and underscores.`);
	}

	if (job.time === undefined) {
		throw new Error(`No 'time' field in the configuration for job[${index}].`);
	} else if (typeof job.time !== 'string') {
		throw new Error(`'time' field must be a cron string for job[${index}].`);
	} else {
		try {
			parser.parseExpression(job.time);
		} catch (e) {
			throw new Error(`'time' field must be a valid cron string for job[${index}].`);
		}
	}

	if (job.command === undefined) {
		throw new Error(`No 'command' field in the configuration for job[${index}].`);
	} else if (typeof job.command !== 'string') {
		throw new Error(`'command' field must be a cron string for job[${index}].`);
	}

	if (job.overlap !== undefined) {
		if (typeof job.overlap !== 'boolean') {
			throw new Error(`'overlap' field must be a boolean for job[${index}].`);
		}
	}
};

export const validateConfigJobs = (jobs) => {
	if (jobs === undefined) {
		throw new Error('No \'jobs\' in the configuration.');
	} else {
		if (!Array.isArray(jobs)) {
			throw new Error('The \'jobs\' field must be a json array.');
		} else {
			if (jobs.length === 0) {
				throw new Error('The \'jobs\' field must be a json array with at least one entry.');
			} else {
				jobs.forEach(
					(job, index) => {
						validateConfigJob(job, index);
					},
				);
			}
		}
	}
};

export const validateConfigPinoOptions = (options) => {
	if (options !== undefined) {
		if (typeof options !== 'object') {
			throw new Error('Pino config options is not an object.');
		}
	}
};

export const validateConfigPino = (pino) => {
	if (pino !== undefined) {
		if (typeof pino !== 'object') {
			throw new Error('Pino config is not an object.');
		} else {
			validateConfigPinoOptions(pino.options);
		}
	}
};

export const validateConfig = (config) => {
	if (config === undefined) {
		throw new Error('No config given.');
	} else if (typeof config !== 'object') {
		throw new Error('The config is not an object.');
	}

	validateConfigJobs(config.jobs);
	validateConfigPino(config.pino);
};
