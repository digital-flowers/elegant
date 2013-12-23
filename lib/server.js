var http = require("http");
var url = require("url");
var extend = require("extend");
var clone = require("clone");
var Interceptor = require("elegant-interceptor");
var config = require("elegant-config");
var requireAll = require("require-all");

var colorStart = "   \x1b[35;2m";
var colorEnd = "\x1b[0m";

// start server
module.exports = {
    loadControllers: function () {
        // require all core controllers
        requireAll({
            dirname: config.DIR.PROJECT + '/lib/controllers',
            filter: /.+\.js$/,
            excludeDirs: /^\.(git|svn)$/
        });
        // require all user controllers
        if (config.DIR.CONTROLLERS) {
            requireAll({
                dirname: config.DIR.PROJECT + '/' + config.DIR.CONTROLLERS,
                filter: /.+\.js$/,
                excludeDirs: /^\.(git|svn)$/
            });
        }
    },
    loadInterceptors: function () {
        // require all core interceptors
        requireAll({
            dirname: config.DIR.PROJECT + '/lib/interceptors',
            filter: /.+\.js$/,
            excludeDirs: /^\.(git|svn)$/
        });
        // require all user interceptors
        if (config.DIR.INTERCEPTORS) {
            requireAll({
                dirname: config.DIR.PROJECT + '/' + config.DIR.INTERCEPTORS,
                filter: /.+\.js$/,
                excludeDirs: /^\.(git|svn)$/
            });
        }
    },
    start: function () {
        // load interceptors
        this.loadInterceptors();

        // load controllers
        this.loadControllers();

        //function To be executed on any request
        http.createServer(function (request, response) {
            var exports = {
                "request": request,
                "response": response
            };
            var interceptors = Interceptor.all();
            for (var i = 0; i < interceptors.length; i++) {
                var interceptor = interceptors[i];
                interceptor.next = interceptors[i + 1];
                interceptor.complete = function () {
                    exports = extend(exports, this._exports);
                    if (this.next) {
                        this.next.EXPORTS = exports;
                        this.next = extend(this.next, exports);
                        this.next.start();
                    }
                };
            }
            interceptors[0].EXPORTS = exports;
            interceptors[0] = extend(interceptors[0], exports);
            interceptors[0].start();
        }).listen(config.SERVER.PORT);
        console.log(colorStart + "elegant project started at : " + colorEnd + "http://localhost:" + config.SERVER.PORT);
    }
}