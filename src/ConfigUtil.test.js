import {
	validateConfig,
	validateConfigJob,
	validateConfigJobs,
	validateConfigPino,
	validateConfigPinoOptions,
} from './ConfigUtil.js';

/* eslint-disable no-undef */

describe(
	'validateConfigJob()',
	() => {
		describe(
			'Test ID',
			() => {
				test(
					'None',
					() => expect(() => validateConfigJob({ name: 'name', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Invalid Type',
					() => expect(() => validateConfigJob({ id: 0, name: 'name', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Empty',
					() => expect(() => validateConfigJob({ id: '', name: 'name', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Invalid',
					() => expect(() => validateConfigJob({ id: '?', name: 'name', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Valid Name',
					() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
			},
		);
		describe(
			'Test Name',
			() => {
				test(
					'No Name',
					() => expect(() => validateConfigJob({ id: 'id', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Invalid Type Name',
					() => expect(() => validateConfigJob({ id: 'id', name: 1, time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Empty Name',
					() => expect(() => validateConfigJob({ id: 'id', name: '', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Invalid Name',
					() => expect(() => validateConfigJob({ id: 'id', name: '?', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Valid Name',
					() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
			},
		);
		describe(
			'Test Time',
			() => {
				test(
					'No Time',
					() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: undefined, command: 'ls' })).toThrow(),
				);
				test(
					'Invalid Time Type',
					() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: 1, command: 'ls' })).toThrow(),
				);
				describe(
					'Time String',
					() => {
						test(
							'Invalid cron string',
							() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: 'word', command: 'ls' })).toThrow(),
						);
						test(
							'Valid cron string',
							() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
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
					() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: '* * * * *' })).toThrow(),
				);
				test(
					'Invalid Command Type',
					() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: '* * * * *', command: 1 })).toThrow(),
				);
				test(
					'Invalid Command Type',
					() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
			},
		);
		describe(
			'Test overlap',
			() => {
				test(
					'No overlap',
					() => expect(() => validateConfigJob({ id: 'id', name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
				test(
					'Invalid overlap',
					() => expect(() => validateConfigJob({
						id: 'id', name: 'name', time: '* * * * *', command: 'ls', overlap: 'true',
					})).toThrow(),
				);
				test(
					'Valid overlap',
					() => expect(() => validateConfigJob({
						id: 'id', name: 'name', time: '* * * * *', command: 'ls', overlap: true,
					})).not.toThrow(),
				);
			},
		);
	},
);

describe(
	'validateConfigJobs()',
	() => {
		test(
			'No Jobs Field',
			() => expect(() => validateConfigJobs()).toThrow(),
		);
		describe(
			'With Jobs Field',
			() => {
				test(
					'Not Array Jobs Field',
					() => expect(() => validateConfigJobs('test')).toThrow(),
				);
				describe(
					'Array Jobs Field',
					() => {
						test(
							'Empty Array Jobs Field',
							() => expect(() => validateConfigJobs([])).toThrow(),
						);
						test(
							'Duplicate IDs',
							() => expect(
								() => validateConfigJobs([
									{ id: 0, name: 'name', time: '* * * * *', command: 'ls' },
									{ id: 0, name: 'name', time: '* * * * *', command: 'ls' },
								])
							).toThrow(),
						);
						test(
							'Not Empty Array Jobs Field',
							() => expect(() => validateConfigJobs([{ id: 'id', name: 'name', time: '* * * * *', command: 'ls' }])).not.toThrow(),
						);
					},
				);
			},
		);
	},
);

describe(
	'validateConfigPinoOptions()',
	() => {
		test(
			'Nothing',
			() => expect(() => validateConfigPinoOptions()).not.toThrow(),
		);
		test(
			'Invalid Type',
			() => expect(() => validateConfigPinoOptions(1)).toThrow(),
		);
		test(
			'Valid Type',
			() => expect(() => validateConfigPinoOptions({})).not.toThrow(),
		);
	},
);

describe(
	'validateConfigPino()',
	() => {
		test(
			'Nothing',
			() => expect(() => validateConfigPino()).not.toThrow(),
		);
		test(
			'Invalid Type',
			() => expect(() => validateConfigPino(1)).toThrow(),
		);
		test(
			'Valid Type',
			() => expect(() => validateConfigPino({})).not.toThrow(),
		);
	},
);

describe(
	'Test Validate Config',
	() => {
		test(
			'No Config',
			() => expect(() => validateConfig()).toThrow(),
		);
		test(
			'Integer Config',
			() => expect(() => validateConfig(1)).toThrow(),
		);
	},
);
