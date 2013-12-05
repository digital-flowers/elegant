// init config
require("elegant-config").DIR.PROJECT = __dirname;

// get user config
require("./app/config");

// server module
require("./lib/server.js").start();