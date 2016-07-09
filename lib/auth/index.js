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
        console.log(hash)
        logger.debug('Searching {{0}} - [ {{1}} ]', COLLECTION, hash);
        return db.findOne({hash: hash}).then(function (result) {
            if(!result)
                throw new Error("NO_USER_TOKEN")
            return result;
        });
    },
    addHash: function (userId) {
        logger.debug('Adding {{0}}', COLLECTION);
        var data = {hash: uuid.v4(), user: userId};
        return db.insertOne(data).then(function () {
            return data
        });
    }
}