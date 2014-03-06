var config = require("elegant-config");

// server
config.SERVER.PORT = 9090;

// database config
config.MYSQL.HOST = "localhost";
config.MYSQL.USER = "root";
config.MYSQL.DATABASE = "";
config.MYSQL.PASSWORD = "";

// compressing - use for production
/*
 config.STATIC.COMPRESS_RESOURCES = true;
 config.STATIC.COMPRESS_HTML = true;
 config.STATIC.DEFAULT_MEMORY_CACHE = true;
 config.STATIC.COMPACT_RESOURCES = true;
 config.STATIC.CACHE_RESOURCES = true;
 config.STATIC.CASH_HTML = true;
 */