/**
 * Created by highfredo on 09/07/2016.
 */
"use strict";

// Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('../logger')('lib/server');
logger.config("DEBUG");

class Server {
    constructor(port, services, name) {
        // Error management
        process.on('uncaughtException', function (err) {
            logger.error('Uncaught Exception {{0}}', err.message);
            console.error(err.stack);
        });

        // configure app to use bodyParser()
        // this will let us get the data from a POST
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        // Configure express por secure behaviour
        app.disable('x-powered-by');
        app.disable('etag');

        // Routes
        app.use('/', services(express.Router()));

        /// catch 404 and forwarding to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers
        app.use(function (err, req, res) {
            logger.error('Error ({{0}}): {{1}}', req.originalUrl, err);
            res.status(err.status || 500);
            res.send();
        });


        // =============================================================================
        // Start http server
        // =============================================================================
        app.listen(port);
        logger.info('HTTP server ready on port {{0}} for {{1}}', port, name);
    }
}


module.exports = Server;