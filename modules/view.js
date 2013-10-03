/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 8/18/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */

var settings = require("../settings");
var fs = require("fs");
var swig = require('swig');
var $ = require("./$.js");


module.exports = function (suffix, theme, vars, request, response) {

    // Get Theme Regions File
    var regions = require("../views/" + theme + "/regions/regions.js");

    // Get Regions
    var reg = regions;

    // Loop Over Regions and Add them the the vars passed to compile
    for (var i = 0; i < reg.length; i++) {
        getTbl(reg[i], suffix, theme + "/regions", function (data, tbl) {
            var path = data.split(theme + "/");
            vars[tbl] = path[1];
        });
    }

    // Get Main Template and Render With Vars
    getTbl("main", suffix, theme, function (data, tbl) {

        var tpl = swig.compileFile(data)(vars);
        response.write(tpl);
        response.end();


    });


};


function getTbl(tbl, suffix, dir, handler) {

    var Directory = settings.DIR.VIEWS + "/" + dir + "/" + tbl + "." + suffix + ".html";

    fs.exists(Directory, function (exists) {

        if (exists) {

            console.log("Master Page is : " + Directory);

        } else {

            Directory = settings.DIR.VIEWS + "/" + dir + "/" + tbl + ".default.html";
            console.log("Master Page is : " + Directory);

        }

        handler(Directory, tbl);
    });

}