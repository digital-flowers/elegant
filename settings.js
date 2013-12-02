var settings = require("elegant-settings");

// required (DON't REMOVE);
settings.DIR.PROJECT = __dirname;
settings.DIR.SESSION = settings.DIR.PROJECT + "/.session-data";

// server
settings.SERVER.PORT = 8080;

// database settings
settings.DATA_SOURCE.SOURCE = "MYSQL";
settings.DATA_SOURCE.MYSQL.host = "localhost";
settings.DATA_SOURCE.MYSQL.user = "root";
settings.DATA_SOURCE.MYSQL.database = "test";
settings.DATA_SOURCE.MYSQL.password = "123";