var http = require("http");
var url = require("url");
var extend = require("extend");
var clone = require("clone");
var Interceptor = require("elegant-interceptor");
var settings = require("elegant-settings");
var requireAll = require("require-all");

// start server
module.exports = {
    loadControllers: function () {
        // require all core controllers
        requireAll({
            dirname: settings.DIR.PROJECT + '/lib/controllers',
            filter: /.+\.js$/,
            excludeDirs: /^\.(git|svn)$/
        });
        // require all user controllers
        if (settings.DIR.CONTROLLERS) {
            requireAll({
                dirname: settings.DIR.PROJECT + '/' + settings.DIR.CONTROLLERS,
                filter: /.+\.js$/,
                excludeDirs: /^\.(git|svn)$/
            });
        }
    },
    loadInterceptors: function () {
        // require all core interceptors
        requireAll({
            dirname: settings.DIR.PROJECT + '/lib/interceptors',
            filter: /.+\.js$/,
            excludeDirs: /^\.(git|svn)$/
        });
        // require all user interceptors
        if (settings.DIR.INTERCEPTORS) {
            requireAll({
                dirname: settings.DIR.PROJECT + '/' + settings.DIR.INTERCEPTORS,
                filter: /.+\.js$/,
                excludeDirs: /^\.(git|svn)$/
            });
        }
    },
    start: function () {
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
        }).listen(settings.SERVER.PORT);
    }
}