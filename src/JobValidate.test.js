import jobValidate from "./JobValidate.js";

test(
	'validate',
	() => expect(
		() => jobValidate(
			undefined,
			{
				opts: () => ({
					config: 'test.config.json',
				}),
			},
		),
	).not.toThrow(),
);