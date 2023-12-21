import {executeJob, run, scheduleJob} from "./CLI.js";

/* eslint-disable no-undef */

test(
	'executeJob()',
	() => expect(
		() => executeJob({
			"command": "dir"
		})
	).not.toThrow(),
);

test(
	'scheduleJob()',
	() => expect(
		() => scheduleJob({
			"command": "dir"
		})
	).not.toThrow(),
);

test(
	'run()',
	() => expect(
		() => run(
			undefined,
			{
				opts: () => ({
					config: './test.config.json'
				}),
			},
		),
	).not.toThrow(),
);