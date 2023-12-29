import jobRun, {onCompletedJob} from "./JobRun.js";
import {DateTime} from "luxon";

const MOCK_LOGGER = {
	info: () => {},
	error: () => {},
};

describe(
	'onCompletedJob()',
	() => {
		test(
			'With STDOUT',
			() => expect(() => onCompletedJob(
				undefined,
				'stdout',
				undefined,
				{
					"record": {}
				},
				MOCK_LOGGER,
				{ name: 'job' },
				DateTime.now(),
			)).not.toThrow()
		);
		test(
			'With STDERR',
			() => expect(() => onCompletedJob(
				undefined,
				undefined,
				'stderr',
				{
					"record": {}
				},
				MOCK_LOGGER,
				{ name: 'job' },
				DateTime.now(),
			)).not.toThrow()
		);
		test(
			'Failed Run',
			() => expect(() => onCompletedJob(
				'Error',
				undefined,
				undefined,
				{
					"record": {}
				},
				MOCK_LOGGER,
				{ name: 'job' },
				DateTime.now(),
			)).not.toThrow()
		);
		describe(
			'Successful Run',
			() => {
				test(
					'Write STDOUT',
					() => expect(() => onCompletedJob(
						undefined,
						'stdout',
						undefined,
						{
							"record": {
								'writeStdOut': true,
							}
						},
						MOCK_LOGGER,
						{ name: 'job' },
						DateTime.now(),
					)).not.toThrow()
				);
				test(
					'Write STDERR',
					() => expect(() => onCompletedJob(
						undefined,
						undefined,
						'stderr',
						{
							"record": {
								'writeStdErr': true,
							}
						},
						MOCK_LOGGER,
						{ name: 'job' },
						DateTime.now(),
					)).not.toThrow()
				);
			},
		);
	},
);

test(
	'Run Job',
	() => expect(
		() => jobRun(
			undefined,
			{
				opts: () => ({
					config: 'test.config.json',
				})
			}
		)
	).not.toThrow(),
);
