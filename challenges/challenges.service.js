/* jshint node: true */
// =============================================================================
// ROUTES FOR CHALLENGES
// =============================================================================
"use strict";

var store = require('./store')
const logger      = require('../lib/logger')('challenge-service');


module.exports = function (router) {
    router.use(function(req, res, next) {
        logger.debug('{{0}} {{1}}', req.method, req.originalUrl);
        next();
    });

    router.route('/challenges')
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
        });

    router.route('challenges/:name')
        .get(function(req, res) {
            store.findById(req.params.name)
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
            store.update(req.params.name, req.body)
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
            store.remove(req.params.name)
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
}