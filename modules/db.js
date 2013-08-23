/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 8/23/13
 * Time: 5:47 PM
 * To change this template use File | Settings | File Templates.
 */
var settings = require("../settings.js");

module.exports = function(query){

// Require the Mysql Module
var mysql      = require('mysql');

// Database Configration
var connection = mysql.createConnection({
    host     : settings.DB_HOST,
    user     : settings.DB_USER,
    password : settings.DB_PASS,
    database: settings.DB_NAME
});

// Connect To Database
connection.connect();

    // Passing the Query
    connection.query(query, function(err, rows, fields) {

        //Execption
        if (err) throw err;

        console.log(rows);
    });

    // Close connection
    connection.end();

};