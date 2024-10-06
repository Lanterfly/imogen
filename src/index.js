#! /usr/bin/env node

import fs from 'fs';

import Database from 'better-sqlite3';
import { program } from 'commander';
import pino from 'pino';
import {startServer} from "./server.js";
import {scheduleJobs} from "./jobs.js";

export const loadConfig = (options) => {
	// Load Options
	const opts = options.opts();

	// Load config
	const config = fs.readFileSync(opts.config);
	return JSON.parse(config);
};

const run = async (str, options) => {
	const logger = pino();

	const opts = options.opts();

	logger.info("Starting Imogen...");

	logger.info('Starting database...');
	const db = new Database(opts.databasePath, {});
	const tables = db.prepare('select name from sqlite_master where type=\'table\'').all().map((t) => t.name);
	if (tables.indexOf('job') === -1){
		db.prepare('CREATE TABLE IF NOT EXISTS job (name text, enabled bool, running bool)').run();
	}
	console.log(tables);
	logger.info('Started database.')

	logger.info('Reading config file...');
	const config = loadConfig(options);
	logger.info('Read config file.');

	if (scheduleJobs(logger, config, db)) {
		let doStartServer = opts.server;
		if (doStartServer) {
			startServer(logger, opts, db);
		}
	}
};

program.name('imogen')
	.version('2.0.0')
	.option('-c, --config <string>', 'Config file', 'imogen.config.json')
	.option('--database-path <string>', 'Path to the SQLite file.', 'imogen.db')
	.option('-s, --server <boolean>', 'True if the Imogen server should be started, false if the Imogen server should not be started.', false)
	.option('--server-bind-hostname <string>', 'The hostname to bind the server to.', 'localhost')
	.option('--server-bind-port <integer>', 'The hostname to bind the server to.', '6226')
	.action(run);

program.parse();
