/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 8/18/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */
var settings = require("../settings");
var fs = require("fs");
var swig  = require('swig');
var $ = require("./$.js");

module.exports = function (viewName,vars) {
    $.ready(
        function(data,request,response){
            var tpl = swig.compileFile(settings.DIR.VIEWS + "/" + viewName)(vars);
            response.writeHead(data.code, data.head);
            response.write(tpl);
            response.end();
        }
    );
};
