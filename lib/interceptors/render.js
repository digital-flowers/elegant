var swig = require('swig');
var fs = require("fs");
var trim = require("trimmer");
var View = require("elegant-view");
var File = require("elegant-file");
var Error = require("elegant-error");
var Redirect = require("elegant-redirect");
var config = require("elegant-config");
var Interceptor = require("elegant-interceptor");
var ResponseData = require("elegant-response-data");
var extend = require("extend");
var minify = require('html-minifier').minify;
var zlib = require('zlib');
var watch = require('../util/watch');
var hash = require('../util/hash');

swig.setDefaults({
    autoescape: false,
    cash: config.STATIC.CACHE_HTML ? 'memory' : false
});

new Interceptor(5, "render").execute(function () {
    if (this.RESULT instanceof View) {
        // prepare view
        this.view = this.RESULT;
        if (this.view.theme == undefined) {
            this.view.theme = config.DIR.DEFAULT_THEME;
        }
        this.view.vars["VIEW"] = this.EXPORTS_TO_THEME;
        this.view.vars["VIEW"]["RESOURCES"] = config.STATIC.RESOURCES;
        var themeDir = config.DIR.PROJECT + "/" + config.DIR.VIEWS + "/" + this.view.theme;
        // resolve regions
        var themeRegions = require(themeDir + "/regions.js");
        for (var i = 0; i < themeRegions.length; i++) {
            var region = themeRegions[i];
            var file = themeDir + "/regions/" + region + "." + this.view.suffix + ".html";
            fs.exists(file, this.$(function (exists, region, file) {
                if (exists) {
                    this.view.vars[region] = file;
                } else {
                    this.view.vars[region] = themeDir + "/regions/" + region + ".html";
                }
            }, region, file));
        }
        // resolve index page
        var index = themeDir + "/" + this.view.suffix + ".html";
        fs.exists(index, this.$(function (exists) {
            if (exists) {
                this.view.index = index;
            } else {
                this.view.index = themeDir + "/index.html";
            }
        }));
    }
    if (this.RESULT instanceof File) {
        this.file = this.RESULT;
        fs.readFile(this.file.path, this.$(function (error, content) {
                if (error) {
                    this.RESULT = this.Error = new Error(404);
                } else {
                    this.file.content = content;
                }
            }
        ));
    }
    if (this.RESULT instanceof Redirect) {
        this.redirect = this.RESULT;
    }
    if (this.RESULT instanceof Error) {
        this.err = this.RESULT;
    }
    if (this.RESULT instanceof ResponseData) {
        this.responseData = this.RESULT;
    }
    if (typeof this.RESULT == "string") {
        this.str = this.RESULT;
    }
}).ready(function () {

    var data = "";
    var header = {};
    var responseCode = 200;

    if (this.view) {
        if (!config.STATIC.CACHE_HTML) {
            swig.invalidateCache();
        }
        data = swig.compileFile(this.view.index)(this.view.vars);

        var dontCompress = (config.STATIC.COMPRESS_HTML_EXCEPTION.indexOf(this.PATH) >= 0) || (this.PATH == "" && config.STATIC.COMPRESS_HTML_EXCEPTION.indexOf("/") >= 0);

        if (config.STATIC.COMPRESS_HTML && !dontCompress) {
            var options = {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true
            }
            try {
                data = minify(data, options);
            } catch (e) {
            }
        }
        header['Content-Type'] = 'text/html; charset=' + config.STATIC.CHARSET;
    }
    if (this.file) {
        header['Cache-Control'] = 'public, max-age=' + config.STATIC.CACHE_AGE;
        header['Content-Type'] = this.file.contentType;
        if (this.file.download) {
            header['Content-Disposition'] = "attachment; filename='" + this.FILE.name + "'";
        }
        var fileState = watch(this.file.path, this.runAt);
        if (fileState.previous) {
            header["Last-Modified"] = fileState.previous.toUTCString();
        }
        data = this.file.content;
        if (data) {
            header["ETag"] = hash.etag(data);
        }
    }
    if (this.redirect) {
        header['location'] = this.redirect.url;
        responseCode = this.redirect.code;
    }
    if (this.err) {
        if (config.ERROR.REDIRECT[this.err.code]) {
            header['location'] = config.ERROR.REDIRECT[this.err.code];
            responseCode = 302;
        } else if (config.ERROR.REDIRECT["all"]) {
            header['location'] = "/" + trim(config.ERROR.REDIRECT["all"], "/").replace("{code}", this.err.code);
            responseCode = 302;
        } else {
            responseCode = this.err.code;
        }
    }
    if (this.responseData) {
        header = extend(header, this.responseData.header);
        data = this.responseData.data;
    }
    if (this.str) {
        data = this.str;
    }

    // write data
    if (data) {
        //gzip test
        var acceptEncoding = this.request.headers['accept-encoding'];
        if (!acceptEncoding) {
            acceptEncoding = '';
        }
        var response = this.response;
        if (acceptEncoding.match(/\bdeflate\b/)) {
            header['Content-Encoding'] = 'deflate';
            header['Vary'] = 'Accept-Encoding';
            zlib.deflate(data, function (_, result) {
                data = result;
                response.writeHead(responseCode, header);
                response.end(data);
            });
        } else if (acceptEncoding.match(/\bgzip\b/)) {
            header['Content-Encoding'] = 'gzip';
            header['Vary'] = 'Accept-Encoding';
            zlib.gzip(data, function (_, result) {
                data = result;
                response.writeHead(responseCode, header);
                response.end(data);
            });
        } else {
            // write head
            if (responseCode && header != {}) {
                this.response.writeHead(responseCode, header);
            } else if (responseCode) {
                this.response.writeHead(responseCode);
            }
            this.response.end(data);
        }
    } else {
        // write head
        if (responseCode && header != {}) {
            this.response.writeHead(responseCode, header);
        } else if (responseCode) {
            this.response.writeHead(responseCode);
        }
        this.response.end();
    }
});