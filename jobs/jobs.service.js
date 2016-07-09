/* jshint node: true */
// =============================================================================
// ROUTES FOR CHALLENGES
// =============================================================================
"use strict";

const store    = require('./store');
const config   = require('../config');
const logger   = require('../lib/logger')( 'jobs-service');
logger.config(config.logger.level);


module.exports = function (router) {
    router.use(function(req, res, next) {
        logger.debug('{{0}} {{1}}', req.method, req.originalUrl);
        next();
    });

    router.route('/jobs')
        .get(function(req, res) {
            store.findAll()
                .then(function(result) {
                    res.json({
                        message: 'Ok',
                        outcome: result
                    });
                })
                .catch(function() {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        })
        .post(function(req, res) {
            store.add(req.body)
                .then(function(result) {
                    res
                        .status(201)
                        .json({
                            message: 'Ok',
                            outcome: {id: result.insertedId.toString()}
                        });
                })
                .catch(function() {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        });

    router.route('/jobs/:id')
        .get(function(req, res) {
            store.findById(req.params.id)
                .then(function(result) {
                    res.json({
                        message: 'Ok',
                        outcome: result
                    });
                })
                .catch(function() {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        })
        .put(function(req, res) {
            store.update(req.params.id, req.body)
                .then(function(result) {
                    res.json({
                        message: 'Ok',
                        outcome: result
                    });
                })
                .catch(function() {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        })
        .delete(function(req, res) {
            store.remove(req.params.id)
                .then(function() {
                    res.sendStatus(204);
                })
                .catch(function() {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        });

    return router;
};