var Server = require('../lib/server');

var server = new Server(3001, require('./challenges.service'), "challenges");