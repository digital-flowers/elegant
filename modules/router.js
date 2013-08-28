var web = require("./web.js");
var settings = require("../settings.js");
var extend = require("extend");
var trim = require("trimmer");
var $ = require("./$.js");

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

exports.rout = function (request, response) {
    web.parseRequest(request, function (data) {
        var args = data.args;
        var controller;
        while (args.length && !controller) {
            controller = controllers[args.join("/")];
            args.pop();
        }
        var text = "";
        if (controller) {
            if (controller.method.toLowerCase() == data.method.toLowerCase()) {
                $.reset();
                var chunk = controller.handler.call(this, data, request, response);
                $.complete = function () {
                    $.readyQueue.forEach(function (ready) {
                        ready(data, request, response);
                    });
                };
                $(function(){
                    if (chunk) {
                        text += chunk;
                        response.writeHead(data.code, data.head);
                        if (data.success && text) {
                            response.write(text);
                        }
                        response.end();
                    }
                })();
            } else {
                data.code = 405; // method not allowed
                data.success = false;
            }
        } else {
            data.code = 404; // page not found
            data.success = false;
        }
        if (!data.success) {
            response.writeHead(data.code, data.head);
            response.end();
        }
    });
};

