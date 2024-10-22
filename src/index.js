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

	logger.info('Reading config file...');
	const config = loadConfig(options);
	logger.info('Read config file.');

	logger.info('Starting database...');
	let databasePath;
	if (config.database) {
		databasePath = config.database.path;
	} else {
		databasePath = 'imogen.db';
	}
	const db = new Database(databasePath, {});
	const tables = db.prepare('select name from sqlite_master where type=\'table\'').all().map((t) => t.name);
	if (tables.indexOf('job') === -1){
		db.prepare('CREATE TABLE IF NOT EXISTS job (name text, enabled bool, running bool)').run();
	}
	logger.info('Started database.')

	if (scheduleJobs(logger, config, db)) {
		let doStartServer;
		if (config.server) {
			doStartServer = config.server.enabled === 'true';
		} else {
			doStartServer = false;
		}
		if (doStartServer) {
			startServer(logger, config, db);
		}
	}
};

program.name('imogen')
	.version('2.0.0')
	.option('-c, --config <string>', 'Config file', 'imogen.config.json')
	.action(run);

program.parse();
