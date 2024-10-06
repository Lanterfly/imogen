import http from "http";
import querystring from "querystring";

export const startServer = (logger, opts, db) => {
    logger.info("Starting server...");

    const bindHostname = opts['serverBindHostname']
    const bindPort = parseInt(opts['serverBindPort']);

    const requestListener = (req, res) => {
        res.setHeader("Content-Type", "application/json");

        const urlParameters = querystring.parse(req.url.substring(req.url.indexOf('?') + 1));

        if (req.url.startsWith('/isEnabled')) {
            const name = urlParameters.name;
            if (name === undefined) {
                res.writeHead(400);
                res.end(JSON.stringify({ 'error': 'No job name provided.' }));
                return;
            }

            const jobRecord = db.prepare('SELECT * FROM job WHERE name = ?').get(name);
            if (!jobRecord) {
                res.writeHead(400);
                res.end(JSON.stringify({ 'error': `Job ${jname} does not exist.` }));
                return;
            }
            const enabled = jobRecord.enabled === 'true';

            res.writeHead(200);
            res.end(JSON.stringify({ enabled }));
        } else if (req.url.startsWith('/isRunning')) {
            const name = urlParameters.name;
            if (name === undefined) {
                res.writeHead(400);
                res.end(JSON.stringify({ 'error': 'No job name provided.' }));
                return;
            }

            const jobRecord = db.prepare('SELECT * FROM job WHERE name = ?').get(name);
            if (!jobRecord) {
                res.writeHead(400);
                res.end(JSON.stringify({ 'error': `Job ${jname} does not exist.` }));
                return;
            }
            const running = jobRecord.running === 'true';

            res.writeHead(200);
            res.end(JSON.stringify({ running }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ 'error': 'Unknown route.' }));
        }
    };

    // Start Server
    const server = http.createServer(requestListener);
    server.listen(bindPort, bindHostname, () => {
        logger.info(`Started server on http://${bindHostname}:${bindPort}`);
    });
};