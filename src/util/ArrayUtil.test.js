import {getDuplicates} from "./ArrayUtil.js";

describe(
	'getDuplicates()',
	() => {
		test(
			'Empty Array',
			() => expect(getDuplicates([])).toEqual([]),
		);
		test(
			'Singleton Array',
			() => expect(getDuplicates([0])).toEqual([]),
		);
		test(
			'Multiple Elements',
			() => expect(getDuplicates([0, 1, 0], (n1, n2) => n1 - n2)).toEqual([0]),
		);
	},
);