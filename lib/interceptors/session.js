var settings = require("../../settings.js");
var Interceptor = require("../type/interceptor.js");
var fs = require("fs");
var sessionManager = require("session-manager");

// prepare session manager
fs.mkdir(settings.DIR.SESSION, function () {
    sessionManager = sessionManager.create({engine: 'file', directory: settings.DIR.SESSION});
});

new Interceptor(1, "session").execute(function () {
    this.SESSION = sessionManager.start(this.request, this.response);
}).ready(function () {
        this.export("SESSION", this.SESSION);
    });