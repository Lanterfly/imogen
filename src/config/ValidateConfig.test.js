import {
	validateConfig,
	validateConfigJob,
	validateConfigJobs,
	validateConfigPino,
	validateConfigPinoDestination,
	validateConfigPinoOptions, validateConfigRecord,
} from './ValidateConfig.js';

/* eslint-disable no-undef */

describe(
	'validateConfigJob()',
	() => {
		describe(
			'Test Name',
			() => {
				test(
					'No Name',
					() => expect(() => validateConfigJob({ time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Invalid Type Name',
					() => expect(() => validateConfigJob({ name: 1, time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Empty Name',
					() => expect(() => validateConfigJob({ name: '', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Invalid Name',
					() => expect(() => validateConfigJob({ name: '?', time: '* * * * *', command: 'ls' })).toThrow(),
				);
				test(
					'Valid Name',
					() => expect(() => validateConfigJob({ name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
			},
		);
		describe(
			'Test Time',
			() => {
				test(
					'No Time',
					() => expect(() => validateConfigJob({ name: 'name', time: undefined, command: 'ls' })).toThrow(),
				);
				test(
					'Invalid Time Type',
					() => expect(() => validateConfigJob({ name: 'name', time: 1, command: 'ls' })).toThrow(),
				);
				describe(
					'Time String',
					() => {
						test(
							'Invalid cron string',
							() => expect(() => validateConfigJob({ name: 'name', time: 'word', command: 'ls' })).toThrow(),
						);
						test(
							'Valid cron string',
							() => expect(() => validateConfigJob({ name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
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
					() => expect(() => validateConfigJob({ name: 'name', time: '* * * * *' })).toThrow(),
				);
				test(
					'Invalid Command Type',
					() => expect(() => validateConfigJob({ name: 'name', time: '* * * * *', command: 1 })).toThrow(),
				);
				test(
					'Invalid Command Type',
					() => expect(() => validateConfigJob({ name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
			},
		);
		describe(
			'Test simultaneous',
			() => {
				test(
					'No simultaneous',
					() => expect(() => validateConfigJob({ name: 'name', time: '* * * * *', command: 'ls' })).not.toThrow(),
				);
				test(
					'Invalid simultaneous',
					() => expect(() => validateConfigJob({
						name: 'name', time: '* * * * *', command: 'ls', simultaneous: 'true',
					})).toThrow(),
				);
				test(
					'Valid simultaneous',
					() => expect(() => validateConfigJob({
						name: 'name', time: '* * * * *', command: 'ls', simultaneous: true,
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
							'Not Empty Array Jobs Field',
							() => expect(() => validateConfigJobs([{ name: 'name', time: '* * * * *', command: 'ls' }])).not.toThrow(),
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
	'validateConfigPinoDestination()',
	() => {
		test(
			'Nothing',
			() => expect(() => validateConfigPinoDestination()).not.toThrow(),
		);
		test(
			'Invalid Type',
			() => expect(() => validateConfigPinoDestination(1)).toThrow(),
		);
		test(
			'Valid Type',
			() => expect(() => validateConfigPinoDestination({})).not.toThrow(),
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
	'validateConfigRecord()',
	() => {
		test(
			'Nothing',
			() => expect(() => validateConfigRecord()).not.toThrow(),
		);
		test(
			'Invalid Type',
			() => expect(() => validateConfigRecord(1)).toThrow(),
		);
		test(
			'Empty Object',
			() => expect(() => validateConfigRecord({})).not.toThrow(),
		);
		describe(
			'directory',
			() => {
				test(
					'Invalid Type',
					() => expect(() => validateConfigRecord({ directory: 1 })).toThrow(),
				);
				test(
					'Valid Type',
					() => expect(() => validateConfigRecord({ directory: '' })).not.toThrow(),
				);
			},
		);
		describe(
			'writeStdOut',
			() => {
				test(
					'Invalid Type',
					() => expect(() => validateConfigRecord({ writeStdOut: 1 })).toThrow(),
				);
				test(
					'Valid Type',
					() => expect(() => validateConfigRecord({ writeStdOut: true })).not.toThrow(),
				);
			},
		);
		describe(
			'writeStdErr',
			() => {
				test(
					'Invalid Type',
					() => expect(() => validateConfigRecord({ writeStdErr: 1 })).toThrow(),
				);
				test(
					'Valid Type',
					() => expect(() => validateConfigRecord({ writeStdErr: true })).not.toThrow(),
				);
			},
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
