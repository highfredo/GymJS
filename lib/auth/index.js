// const config      = require('../config.json');
const DB          = require('mongodb').MongoClient;
const COLLECTION  = 'auth';
const logger      = require('../logger')('lib/auth');
const config = require('../../config')
var uuid = require('node-uuid');

var db;
DB.connect(config.db)
    .then(function(conn) {
        db = conn.collection(COLLECTION);
    });

module.exports = {
    checkHash: function (hash) {
        logger.debug('Searching {{0}} - [ {{1}} ]', COLLECTION,  login);
        return db.findOne({hash: hash});
    },
    addHash: function (userId) {
        logger.debug('Adding {{0}}', COLLECTION);
        data._lastupdate = new Date();
        return db.insertOne({hash: uuid.v4(), user: userId});
    }
}