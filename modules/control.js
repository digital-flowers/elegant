/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 8/30/13
 * Time: 5:49 PM
 * To change this template use File | Settings | File Templates.
 */
var settings = require("../settings");
var fs = require("fs");
var swig  = require('swig');
var $ = require("./$.js");

module.exports = function(control,handler){


    fs.readFile(control,'utf8',
        $(function () {
            handler.apply(this, arguments);
        })
    );


};
