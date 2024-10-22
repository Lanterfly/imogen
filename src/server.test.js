import {requestListener} from "./server.js";

/* eslint-disable no-undef */

describe(
	'Test Request Listener',
	() => {
		let httpStatus;
		beforeEach(
			() => {
				httpStatus = undefined;
			},
		);
		const response = {
			setHeader: () => {},
			writeHead: (status) => {
				httpStatus = status;
			},
			end: () => {
			}
		};

		test(
			'/',
			() => {
				const request = {
					url: '/'
				};

				requestListener(request, response);

				expect(httpStatus).toBe(404);
			},
		);
		describe(
			'/isEnabled',
			() => {
				describe(
					'Invalid Inputs',
					() => {
						test(
							'No name',
							() => {
								const request = {
									url: '/isEnabled'
								};

								requestListener(request, response);

								expect(httpStatus).toBe(400);
							},
						);
					},
				);
				describe(
					'Valid Inputs',
					() => {
						const request = {
							url: '/isEnabled?name=abc'
						};
						test(
							'Nonexistant Job',
							() => {
								const db = ({
									prepare: () => ({
										get: () => undefined
									})
								});

								requestListener(request, response, db);

								expect(httpStatus).toBe(400);
							},
						);
						test(
							'Existant Job',
							() => {
								const db = ({
									prepare: () => ({
										get: () => ({
											enabled: 'true',
										})
									})
								});

								requestListener(request, response, db);

								expect(httpStatus).toBe(200);
							},
						);
					},
				);
			},
		);
		describe(
			'/isRunning',
			() => {
				describe(
					'Invalid Inputs',
					() => {
						test(
							'No name',
							() => {
								const request = {
									url: '/isRunning'
								};

								requestListener(request, response);

								expect(httpStatus).toBe(400);
							},
						);
					},
				);
				describe(
					'Valid Inputs',
					() => {
						const request = {
							url: '/isRunning?name=abc'
						};
						test(
							'Nonexistant Job',
							() => {
								const db = ({
									prepare: () => ({
										get: () => undefined
									})
								});

								requestListener(request, response, db);

								expect(httpStatus).toBe(400);
							},
						);
						test(
							'Existant Job',
							() => {
								const db = ({
									prepare: () => ({
										get: () => ({
											enabled: 'true',
										})
									})
								});

								requestListener(request, response, db);

								expect(httpStatus).toBe(200);
							},
						);
					},
				);
			},
		);
	},
);