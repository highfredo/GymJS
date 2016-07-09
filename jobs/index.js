var Server = require('../lib/server');

var server = new Server(3002, require('./jobs.service'), "jobs");