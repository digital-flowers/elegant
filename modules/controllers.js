var settings = require("../settings.js");
var trim = require("trimmer");
var extend = require("extend");

// require all controllers js files
var controllersJs = require('require-all')({
    dirname: settings.DIR.PROJECT + '/' + settings.DIR.CONTROLLERS,
    filter: /.+\.js$/,
    excludeDirs: /^\.(git|svn)$/
});

// prepare controllers
var controllers = {};
for (var i in controllersJs) {
    var controllerJs = controllersJs[i];
    for (var j in controllerJs) {
        controllers[trim(j, "/")] = extend({
            method: "GET",
            permissions: [],
            handler: function (data, request, response) {
            }
        }, controllerJs[j]);
    }
}

module.exports = controllers;