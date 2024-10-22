import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
	js.configs.recommended,
	react.configs.flat.recommended,
	{
		"rules": {
			"react/display-name": "off",
		},
	},
];