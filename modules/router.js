var web = require("./web.js");
var settings = require("../settings.js");
var extend = require("extend");
var trim = require('trimmer');

// require all controllers js files
var controllersJs = require('require-all')({
    dirname: settings.PROJECT_DIR + '/controllers',
    filter: /.+\.js$/,
    excludeDirs: /^\.(git|svn)$/
});

// prepare controllers
var controllers = {};
for (var i in controllersJs) {
    var controllerJs = controllersJs[i];
    for (var j in controllerJs) {
        controllers[trim(j, "/")] = extend({
            method: "get",
            permissions: [],
            handler: function () {
            }
        }, controllerJs[j]);
    }
}

exports.rout = function (request, response) {
    web.parseRequest(request, function (data) {
        console.log(controllers);
    });
};