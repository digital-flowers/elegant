/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 8/23/13
 * Time: 5:47 PM
 * To change this template use File | Settings | File Templates.
 */
var settings = require("../settings.js");
var mysql = require('mysql');

// Database Configuration
var connection = mysql.createConnection({
    host: settings.DB.HOST,
    user: settings.DB.USER,
    password: settings.DB.PASSWORD,
    database: settings.DB.DATABASE
});

module.exports = function (query, handler) {
    // Passing the Query
    connection.query(query,
        function () {
            handler.apply(this, arguments);
        }
    );
};