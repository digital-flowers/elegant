var trim = require("trimmer");
var qs = require('querystring');
var url = require("url");
var extend = require("extend");
var config = require("elegant-config");
var Interceptor = require("elegant-interceptor");
var stringUtil = require("../util/string-util");

new Interceptor(1, "request").execute(function () {
    this.method = this.request.method.toLowerCase();
    this.get = {};
    this.post = {};
    this.params = {};
    this.args = [];
    this.path = "";
    this.extension = "";

    // parse request url - GET
    if (this.request.url) {
        var data = url.parse(this.request.url, true);
        // get data from url
        this.get = data.query;
        this.path = trim(data.pathname, "/");
        this.args = this.path.split("/");
        this.params = this.get;
        this.extension = stringUtil.getExtension(this.path)
    }

    // parse request body - POST
    var requestBody = '';
    this.request.on('data', function (data) {
        requestBody += data;
        if (requestBody.length > 1e6 * config.POST_MAX_SIZE) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            this.request.connection.destroy();
        }
    });
    this.request.on('end', this.$(function () {
        this.post = qs.parse(requestBody);
        this.params = extend(this.params, this.post);
    }));
}).ready(function () {
        this.export("METHOD", this.method);
        this.export("GET", this.get);
        this.export("POST", this.post);
        this.export("PARAMS", this.params);
        this.export("ARGS", this.args);
        this.export("PATH", this.path);
        this.export("EXTENSION", this.extension);
    });