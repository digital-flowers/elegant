var trim = require("trimmer");
var qs = require('querystring');
var url = require("url");
var settings = require("../../settings.js");
var extend = require("extend");
var Interceptor = require("../type/interceptor.js");

new Interceptor(0, "request").execute(function () {
    this.METHOD = this.request.method.toLowerCase();
    this.GET = {};
    this.POST = {};
    this.PARAMS = {};
    this.ARGS = [];
    this.PATH = "";
    this.EXTENSION = "";

    // parse request url - GET
    if (this.request.url) {
        var data = url.parse(this.request.url, true);
        // get data from url
        this.GET = data.query;
        this.PATH = trim(data.pathname, "/");
        this.ARGS = this.PATH.split("/");
        this.PARAMS = this.GET;
        // get extension
        var lastExt = this.PATH.match(new RegExp(/\.([0-9a-z]+$)/));
        if (lastExt) {
            this.EXTENSION = lastExt[1].toLowerCase();
        }
    }

    // parse request body - POST
    var requestBody = '';
    this.request.on('data', function (data) {
        requestBody += data;
        if (requestBody.length > 1e6 * settings.POST_MAX_SIZE) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            this.request.connection.destroy();
        }
    });
    this.request.on('end', this.$(function () {
        this.POST = qs.parse(requestBody);
        this.PARAMS = extend(this.PARAMS, this.POST);
    }));
}).ready(function () {
        this.export("METHOD", this.METHOD);
        this.export("GET", this.GET);
        this.export("POST", this.POST);
        this.export("PARAMS", this.PARAMS);
        this.export("ARGS", this.ARGS);
        this.export("PATH", this.PATH);
        this.export("EXTENSION", this.EXTENSION);
    });