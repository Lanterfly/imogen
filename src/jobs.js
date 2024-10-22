import _ from "lodash";
import schedule from "node-schedule";
import {exec} from "child_process";

export const scheduleJobs = (logger, config, db) => {
	logger.info('Registering jobs...');
	if (_.isArray(config.jobs) && config.jobs.length > 0) {
		const errors = [];
		for (let i = 0; i < config.jobs.length; i++) {
			const job = config.jobs[i];

			if (!(_.isString(job.name) && job.name.length > 0 && job.name.match(/([a-zA-Z0-9-_])+/))) {
				errors.push(`Job #${i} has an invalid name.`);
			}
			if (_.isObject(job.schedule)) {
				const schedule = job.schedule;

				if (!(_.isString(schedule) && schedule.length > 0)) {
					errors.push(`Job #${i} has an invalid time.`);
				}
			} else {
				errors.push(`Job #${i} has an invalid schedule object.`);
			}
			if (!(_.isString(job.command) && job.command.length > 0)) {
				errors.push(`Job #${i} has an invalid command.`);
			}

		}
		if (errors.length === 0) {
			for (const job of config.jobs) {
				const jobRecord = db.prepare('SELECT * FROM job WHERE name = ?').get(job.name);
				let doSchedule;
				if (jobRecord) {
					doSchedule = jobRecord.enabled === undefined || jobRecord.enabled === 'true';
				} else {
					db.prepare('INSERT INTO job VALUES (?, ?, ?)').run(job.name, 'true', 'false');
					doSchedule = true;
				}

				if (doSchedule) {
					const spec = {}
					spec.rule = job.time;
					if (job.timeZone) {
						spec.tz = job.timeZone;
					} else {
						spec.tx = 'Etc/UTC';
					}

					schedule.scheduleJob(
						spec,
						() => {
							logger.info(`Running job ${job.name}`);
							db.prepare('UPDATE job SET running = ? WHERE name = ?').run('true', job.name);

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
										db.prepare('UPDATE job SET running = ? WHERE name = ?').run('false', job.name);
										logger.info(`Finished execution of job "${job.name}".`);
									}
								},
							);
						}
					);
				}
			}
			logger.info("Registered Jobs");
			return true;
		} else {
			for (const error of errors) {
				logger.error(error);
			}
			return false;
		}
	} else {
		logger.error("No jobs to run.");
		return false;
	}
}