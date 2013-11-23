// Server Module
var server = require("./lib/server.js");
// load cores
server.loadInterceptors();
server.loadControllers();
// Start your engine baby
server.start();
