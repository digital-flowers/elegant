var config = require("elegant-config");

config.DIR.SESSION = config.DIR.PROJECT + "/.session-data";

// server
config.SERVER.PORT = 8080;

// database config
config.DATA_SOURCE.SOURCE = "MYSQL";
config.DATA_SOURCE.MYSQL.host = "localhost";
config.DATA_SOURCE.MYSQL.user = "root";
config.DATA_SOURCE.MYSQL.database = "test";
config.DATA_SOURCE.MYSQL.password = "123";

// export config
module.exports = config;