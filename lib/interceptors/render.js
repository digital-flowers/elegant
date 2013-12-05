var swig = require('swig');
var fs = require("fs");
var trim = require("trimmer");
var View = require("elegant-view");
var File = require("elegant-file");
var Error = require("elegant-error");
var Redirect = require("elegant-redirect");
var config = require("elegant-config");
var Interceptor = require("elegant-interceptor");

new Interceptor(5, "render").execute(function () {
    if (this.RESULT instanceof View) {
        // prepare view
        this.VIEW = this.RESULT;
        if (this.View.theme == undefined) {
            this.View.theme = config.DEFAULT_THEME;
        }
        var theme_dir = config.DIR.PROJECT + "/" + config.DIR.VIEWS + "/" + this.VIEW.theme;

        // resolve regions
        var theme_regions = require(theme_dir + "/regions/regions.js");
        for (var i = 0; i < theme_regions.length; i++) {
            var region = theme_regions[i];
            var file = theme_dir + "/regions/" + region + "." + this.VIEW.suffix + ".html";
            fs.exists(file, this.$(function (exists, region, file) {
                if (exists) {
                    this.VIEW.vars[region] = file;
                } else {
                    this.VIEW.vars[region] = theme_dir + "/regions/" + region + ".html";
                }
            }, region, file));
        }

        // resolve index page
        var index = theme_dir + "/" + this.VIEW.suffix + ".html";
        fs.exists(index, this.$(function (exists) {
            if (exists) {
                this.VIEW.index = index;
            } else {
                this.VIEW.index = theme_dir + "/index.html";
            }
        }));
    } else if (this.RESULT instanceof File) {
        this.FILE = this.RESULT;
        fs.readFile(this.FILE.path, this.$(function (error, content) {
            if (!error) {
                this.FILE.content = content;
            }
        }));
    } else if (this.RESULT instanceof Redirect) {
        this.Redirect = this.RESULT;
    } else if (this.RESULT instanceof Error) {
        this.Error = this.RESULT;
    }
}).ready(function () {
        if (this.RESULT instanceof View) {
            var data = swig.compileFile(this.VIEW.index)(this.VIEW.vars);
            this.response.write(data);
        } else if (this.RESULT instanceof File) {
            var header = {};
            header['Content-Type'] = this.FILE.contentType;
            if (this.FILE.download) {
                header['Content-Disposition'] = "attachment; filename='" + this.FILE.name + "'";
            }
            this.response.writeHead(200, header);
            this.response.write(this.FILE.content);
        } else if (this.RESULT instanceof Redirect) {
            var header = {};
            header['location'] = this.Redirect.url;
            this.response.writeHead(this.Redirect.code, header);
        } else if (this.RESULT instanceof Error) {
            var header = {};
            if (config.ERROR.REDIRECT[this.Error.code]) {
                header['location'] = config.ERROR.REDIRECT[this.Error.code];
                this.response.writeHead(302, header);
            } else if (config.ERROR.REDIRECT["all"]) {
                header['location'] = "/" + trim(config.ERROR.REDIRECT["all"], "/").replace("{code}", this.Error.code);
                this.response.writeHead(302, header);
            } else {
                this.response.writeHead(this.Error.code);
            }
        } else if (typeof this.RESULT == "string") {
            this.response.write(this.RESULT);
        }
        this.response.end();
    });