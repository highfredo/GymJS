'use strict';

const config = require('../config');
const DB = require('mongodb').MongoClient;
const COLLECTION = 'challenges';
const logger = require('../lib/logger')('challenge-store');
logger.config(config.logger.level);

var db;
DB.connect(config.db)
    .then(function (conn) {
        db = conn.collection(COLLECTION);
    }).catch(function (err) {
        console.log(err)
    })

function findById(name) {
    logger.debug('Searching {{0}} - [ {{1}} ]', COLLECTION, name);
    return db.findOne({name: name})
        .then(helper.out);
}

function findAll() {
    logger.debug('Searching {{0}}', COLLECTION);
    return db.find().toArray()
        .then(helper.out);
}

function add(data) {
    logger.debug('Adding {{0}}', COLLECTION);
    data._lastupdate = new Date();
    return db.insertOne(data)
        .then(function (result) {
            return data.name;
        });
}

function update(name, data) {
    logger.debug('Updating {{0}}', COLLECTION);
    data._lastupdate = new Date();
    return db.findOneAndUpdate({name: name}, {$set: helper.in(data)}, {returnOriginal: false})
        .then(function (result) {
            return helper.out(result.value);

        });
}

function remove(name) {
    logger.debug('Removing {{0}} - [ {{1}} ]', COLLECTION, name);
    return db.deleteOne({name: name});
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
