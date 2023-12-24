import { validateConfig, validateConfigJob } from './validateConfig.js';

/* eslint-disable no-undef */

describe(
	'Test Validate Config Job',
	() => {
		describe(
			'Test Name',
			() => {
				test(
					'No Name',
					() => expect(() => validateConfigJob({ time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
				test(
					'Invalid Name',
					() => expect(() => validateConfigJob({ name: 1, time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Valid Name',
					() => expect(() => validateConfigJob({ name: 'Name', time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
			},
		);
		describe(
			'Test Time',
			() => {
				test(
					'No Time',
					() => expect(() => validateConfigJob({ time: undefined, command: 'ls' })).toThrow(),
				);
				test(
					'Invalid Time Type',
					() => expect(() => validateConfigJob({ time: 1, command: 'ls' })).toThrow(),
				);
				describe(
					'Time String',
					() => {
						test(
							'Invalid cron string',
							() => expect(() => validateConfigJob({ time: 'word', command: 'ls' })).toThrow(),
						);
						test(
							'Valid cron string',
							() => expect(() => validateConfigJob({ time: '* * * * *', command: 'ls' })).not.toThrow(),
						);
					},
				);
			},
		);
		describe(
			'Test Command',
			() => {
				test(
					'No Command',
					() => expect(() => validateConfigJob({ time: '* * * * *' })).toThrow(),
				);
				test(
					'Invalid Command Type',
					() => expect(() => validateConfigJob({ time: '* * * * *', command: 1 })).toThrow(),
				);
				test(
					'Invalid Command Type',
					() => expect(() => validateConfigJob({ time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
			},
		);
		describe(
			'Test Concurrent',
			() => {
				test(
					'No Concurrent',
					() => expect(() => validateConfigJob({ time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
				test(
					'Invalid Concurrent',
					() => expect(() => validateConfigJob({ time: '* * * * *', command: 'ls', concurrent: 'true' })).toThrow(),
				);
				test(
					'Valid Concurrent',
					() => expect(() => validateConfigJob({ time: '* * * * *', command: 'ls', concurrent: true })).not.toThrow(),
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
									() => expect(() => validateConfig({ jobs: [{ time: '* * * * *', command: 'ls' }] })).not.toThrow(),
								);
							},
						);
					},
				);
			},
		);
	},
);
