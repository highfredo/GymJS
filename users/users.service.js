/* jshint node: true */
// =============================================================================
// ROUTES FOR CHALLENGES
// =============================================================================
"use strict";

const store = require('./store');
const config = require('../config');
const logger = require('../lib/logger')('user-service');
const auth = require('../lib/auth')
logger.config(config.logger.level);

////////////////////////////////////

module.exports = function (router) {
    router.use(function (req, res, next) {
        logger.debug('{{0}} {{1}}', req.method, req.originalUrl);
        next();
    });
    router.route("/user")
        .get(function (req, res) {
            store.findAll()
                .then(function (result) {
                    res.json({
                        message: 'Ok',
                        outcome: result
                    });
                })
                .catch(function () {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        })
        .post(function (req, res) {
            store.add(req.body)
                .then(function (result) {
                    res
                        .status(201)
                        .json({
                            message: 'Ok',
                            outcome: result
                        });
                })
                .catch(function () {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        });

    router.route('/user/:login')
        .get(function (req, res) {
            store.findById(req.params.login)
                .then(function (result) {
                    res.json({
                        message: 'Ok',
                        outcome: result
                    });
                })
                .catch(function () {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        })
        .put(function (req, res) {
            store.update(req.params.login, req.body)
                .then(function (result) {
                    res.json({
                        message: 'Ok',
                        outcome: result
                    });
                })
                .catch(function () {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        })
        .delete(function (req, res) {
            store.remove(req.params.login)
                .then(function () {
                    res.sendStatus(204);
                })
                .catch(function () {
                    res
                        .status(500)
                        .json({
                            message: 'Ok',
                            outcome: {}
                        });
                });
        });

    router.router('/user/login')
        .post(function (req, res) {
            var user = req.body.user;
            var pass = req.body.pass;
            store.findById(login).then(function (user) {
                if (user.password === pass) {
                    auth.addHash(user.id)
                    res.json(user)
                } else {
                    res.status(401).send()
                }
            }).catch(function () {
                res
                    .status(500)
                    .json({
                        message: 'Ok',
                        outcome: {}
                    });
            });
        })

};