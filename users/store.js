'use strict';

const config      = require('../config.json');
const DB          = require('mongodb').MongoClient;
const COLLECTION  = 'users';
const logger      = require('../lib/logger/')('user-store');
logger.config(config.logger.level);

var db;
DB.connect(config.db.connection)
    .then(function(conn) {
        db = conn.collection(COLLECTION);
    });

function findById (login) {
    logger.debug('Searching {{0}} - [ {{1}} ]', COLLECTION,  login);
    return db.findOne({login: login})
        .then(helper.out);
}

function findAll () {
    logger.debug('Searching {{0}}', COLLECTION);
    return db.find().toArray()
        .then(helper.out);
}

function add (data) {
    logger.debug('Adding {{0}}', COLLECTION);
    data._lastupdate = new Date();
    return db.insertOne(data)
        .then(function() {
            return data.login;
        });
}

function update (login, data) {
    logger.debug('Updating {{0}}', COLLECTION);
    data._lastupdate = new Date();
    return db.findOneAndUpdate({ login: login }, {$set: helper.in(data)}, {returnOriginal: false})
        .then(function(result) {
            return helper.out(result.value);

        });
}

function remove (login) {
    logger.debug('Removing {{0}} - [ {{1}} ]', COLLECTION, login);
    return db.deleteOne({login: login});
}


var helper = {
    out: function (value) {
        if (Array.isArray(value)) {
            return value.map(helper.out);
        }
        if (value._id) {
            value.id = value._id.toString();
            delete value._id;
        }
        return value;
    },
    in: function (value) {
        delete value._id;
        delete value.id;
        return value;
    }
};


module.exports = {
    findById,
    findAll,
    add,
    update,
    remove
};
