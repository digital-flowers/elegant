var fs = require("fs");
var sessionManager = require("session-manager");
var Interceptor = require("elegant-interceptor");
var config = require("elegant-config");

// prepare session manager
fs.mkdir(config.DIR.SESSION, function () {
    sessionManager = sessionManager.create({engine: 'file', directory: config.DIR.SESSION});
});

new Interceptor(2, "session").execute(function () {
    this.SESSION = sessionManager.start(this.request, this.response);
}).ready(function () {
        this.export("SESSION", this.SESSION);
    });