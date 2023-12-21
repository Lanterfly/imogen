import fs from "fs";
import {validateConfig} from "./config/ValidateConfig.js";
import schedule from "node-schedule";
import {execSync} from "child_process";

export const executeJob = (job) => {
	console.log(`Starting execution of job "${job.command}".`);
	execSync(
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
};

export const scheduleJob = (job) => schedule.scheduleJob(
	job.time,
	async () => executeJob(job),
);

export const run = (str, options) => {
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
		(job) => scheduleJob(job),
	);
};

export const validate = (str, options) => {
	// Load Options
	const opts = options.opts();

	// Load config
	let config = fs.readFileSync(opts.config);
	config = JSON.parse(config);

	// Validate Config
	validateConfig(config);
	console.log('The config file is valid.');
};
