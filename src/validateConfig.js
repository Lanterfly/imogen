import parser from 'cron-parser';

export const validateConfigJob = (job, index) => {
	// Validate "name"
	if (job.name !== undefined) {
		if (typeof job.name !== 'string') {
			throw new Error(`'name' field must be a string for job[${index}].`);
		}
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

	if (job.simultaneous !== undefined) {
		if (typeof job.simultaneous !== 'boolean') {
			throw new Error(`'simultaneous' field must be a boolean for job[${index}].`);
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

export const validateConfig = (config) => {
	if (config === undefined) {
		throw new Error('No config given.');
	} else if (typeof config !== 'object') {
		throw new Error('The config was no an object.');
	}

	validateConfigJobs(config.jobs);
};
