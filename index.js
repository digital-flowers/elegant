// init settings
require("./settings");

// server module
var server = require("./lib/server.js");

// load cores
server.loadInterceptors();
server.loadControllers();

// start server
server.start();