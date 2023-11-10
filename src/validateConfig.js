import parser from 'cron-parser';

export const validateConfigJob = (job, index) => {
	if (job.time === undefined) {
		throw new Error(`No 'time' field in the configuration for job[${index}].`);
	} else if (typeof job.time !== "string") {
		throw new Error(`'time' field must be a cron string for job[${index}].`);
	} else {
		try {
			parser.parseExpression(job.time);
		} catch (e) {
			throw new Error(`'time' field must be a valid cron string for job[${index}].`);
		}
	}
};

export const validateConfig = (config) => {
	if (config.jobs === undefined) {
		throw new Error('No \'jobs\' in the configuration.');
	} else {
		if (!Array.isArray(config.jobs)) {
			throw new Error('The \'jobs\' field must be a json array.');
		} else {
			if (config.jobs.length === 0) {
				throw new Error('The \'jobs\' field must be a json array with at least one entry.');
			} else {
				config.jobs.forEach(
					(job, index) => {
						validateConfigJob(job, index);
					}
				)
			}
		}
	}
};