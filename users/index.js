var Server = require('../lib/server');

var server = new Server(3000, require('./users.service'), "user");