var View = require("../view.js");
var File = require("../file");
var settings = require("../../settings");
var Interceptor = require("../interceptor.js");
var swig = require('swig');
var fs = require("fs");

new Interceptor(3, "render").execute(function () {
    if (this.RESULT instanceof View) {
        // prepare view
        this.VIEW = this.RESULT;
        var theme_dir = settings.DIR.PROJECT + "/" + settings.DIR.VIEWS + "/" + this.VIEW.theme;

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
    }
}).ready(function () {
        if (this.RESULT instanceof View) {
            var data = swig.compileFile(this.VIEW.index)(this.VIEW.vars);
            this.response.end(data);
        }
        else if (this.RESULT instanceof File) {
            var header = {};
            header['Content-Type'] = this.FILE.contentType;
            console.log(this.FILE);
            if (this.FILE.download) {
                header['Content-Disposition'] = "attachment; filename='" + this.FILE.name + "'";
            }
            this.response.writeHead(200, header);
            this.response.end(this.FILE.content);
        }
        else if (typeof this.RESULT == "string") {
            this.response.end(this.RESULT);
        }
    });
