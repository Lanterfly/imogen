import http from "http";

export const startServer = (logger, opts) => {
    logger.info("Starting server...");

    const bindHostname = opts['serverBindHostname']
    const bindPort = parseInt(opts['serverBindPort']);

    const requestListener = (req, res) => {
        res.setHeader("Content-Type", "application/json");

        switch (req.url) {
            default:
                res.writeHead(404);
                res.end(JSON.stringify({ 'error': 'Unknown route.' }));
                break;
        }
    };

    // Start Server
    const server = http.createServer(requestListener);
    server.listen(bindPort, bindHostname, () => {
        logger.info(`Started server on http://${bindHostname}:${bindPort}`);
    });
};