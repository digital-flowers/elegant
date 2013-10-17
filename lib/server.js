var http = require("http");
var settings = require("../settings.js");
var url = require("url");
var Interceptor = require("./type/interceptor.js");
var extend = require("extend");
var clone = require("clone");

// start server
exports.start = function () {
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
    }).listen(settings.PORT);
}