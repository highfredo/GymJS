'use strict';

const config      = require('../config');
const DB          = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectID;
const COLLECTION  = 'jobs';
const logger      = require('../lib/logger/')(config.name + ' - store');
logger.config(config.logger.level);

var db;
DB.connect(config.db)
    .then(function(conn) {
        db = conn.collection(COLLECTION);
    });

function findById (id) {
    logger.debug('Searching {{0}} - [ {{1}} ]', COLLECTION,  id);
    return db.findOne({_id: new ObjectID(id)})
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
    return db.insertOne(data);
}

function update (id, data) {
    logger.debug('Updating {{0}}', COLLECTION);
    data._lastupdate = new Date();
    return db.findOneAndUpdate({ _id: new ObjectID(id) }, {$set: helper.in(data)}, {returnOriginal: false})
        .then(function(result) {
            return helper.out(result.value);

        });
}

function remove (id) {
    logger.debug('Removing {{0}} - [ {{1}} ]', COLLECTION, id);
    return db.deleteOne({_id: new ObjectID(id)});
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
