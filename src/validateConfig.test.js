import {validateConfig, validateConfigJob} from "./validateConfig.js";

describe(
	'Test Validate Config Job',
	() => {
		describe(
			'Test Time',
			() => {
				test(
					'No Time',
					() => expect(() => validateConfigJob({ time: undefined })).toThrow(),
				);
				test(
					'Invalid Time Type',
					() => expect(() => validateConfigJob({ time: 1 })).toThrow(),
				);
				describe(
					'Time String',
					() => {
						test(
							'Invalid cron string',
							() => expect(() => validateConfigJob({ time: 'word' })).toThrow(),
						);
						test(
							'Valid cron string',
							() => expect(() => validateConfigJob({ time: '* * * * *' })).not.toThrow(),
						);
					},
				);
			},
		);
	},
);

describe(
	'Test Validate Config',
	() => {
		describe(
			'Test Jobs Field',
			() => {
				test(
					'No Jobs Field',
					() => expect(() => validateConfig({ jobs: undefined })).toThrow(),
				);
				describe(
					'With Jobs Field',
					() => {
						test(
							'Not Array Jobs Field',
							() => expect(() => validateConfig({ jobs: 'test' })).toThrow(),
						);
						describe(
							'Array Jobs Field',
							() => {
								test(
									'Empty Array Jobs Field',
									() => expect(() => validateConfig({ jobs: [] })).toThrow(),
								);
								test(
									'Not Empty Array Jobs Field',
									() => expect(() => validateConfig({ jobs: [{ time: '* * * * *' }] })).not.toThrow(),
								);
							},
						);
					},
				);
			},
		);
	},
);