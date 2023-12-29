import pino from "pino";
import fs from "fs";

import {validateConfig} from "./validateConfig.js";

export default (str, options) => {
	// Make Logger
	const logger = pino();

	// Load Options
	const opts = options.opts();

	// Load config
	let config = fs.readFileSync(opts.config);
	config = JSON.parse(config);

	// Validate Config
	validateConfig(config);
	logger.info('Validated the config file.');
};