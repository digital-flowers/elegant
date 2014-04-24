var http = require("http");
var url = require("url");
var extend = require("extend");
var clone = require("clone");
var Interceptor = require("elegant-interceptor");
var config = require("elegant-config");
var requireAll = require("require-all");
var fs = require("fs");
var cleancss = require('clean-css');
var uglify = require("uglify-js");
var hash = require("./util/hash");
var stringUtil = require("./util/string-util");
var colorStart = "   \x1b[35;2m";
var colorEnd = "\x1b[0m";


// start server
module.exports = {
    loadControllers: function () {
        console.log(colorStart + "loading controllers... " + colorEnd);
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
        console.log(colorStart + "loading interceptors... " + colorEnd);
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
    prepareResources: function () {
        var resourcesDir = config.DIR.PROJECT + "/" + config.DIR.VIEWS + "/" + config.DIR.DEFAULT_THEME;
        config.STATIC.RESOURCES = require(resourcesDir + '/resources.js');
        console.log(colorStart + (config.STATIC.COMPRESS_RESOURCES ? "preparing and compressing resources... " : "preparing resources... ") + colorEnd);

        fs.mkdir(config.DIR.PROJECT + "/" + config.DIR.RESOURCES, function () {
            for (var i = 0; i < Object.keys(config.STATIC.RESOURCES).length; i++) {
                var bundelName = Object.keys(config.STATIC.RESOURCES)[i];
                if (bundelName) {
                    config.STATIC.RESOURCES[bundelName].name = bundelName;
                    var type = stringUtil.getExtension(bundelName);
                    config.STATIC.RESOURCES[bundelName].type = type;

                    var files = config.STATIC.RESOURCES[bundelName].files;
                    if (typeof files == 'string') {
                        files = [files];
                    }
                    config.STATIC.RESOURCES[bundelName].files = files;

                    var bundelContent = "";
                    if (config.STATIC.RESOURCES[bundelName].compact == undefined) {
                        config.STATIC.RESOURCES[bundelName].compact = config.STATIC.COMPACT_RESOURCES;
                    }
                    if (config.STATIC.RESOURCES[bundelName].compact) {
                        for (var j = 0; j < files.length; j++) {
                            var fileContent = fs.readFileSync(config.DIR.PROJECT + '/' + config.DIR.STATIC + '/' + files[j]).toString();
                            if (type == 'css') {
                                var urlPattern = /url\(\s*[^)]*\)/gim;
                                var url;
                                while ((url = urlPattern.exec(fileContent)) !== null) {
                                    var originalUrl = url[0];
                                    var newUrl = url[0].toLowerCase();
                                    // remove url()
                                    newUrl = newUrl.substr(4);
                                    newUrl = newUrl.substr(0, newUrl.length - 1);
                                    // remove quotes
                                    newUrl = newUrl.trim();
                                    if (newUrl.indexOf("'") == 0 || newUrl.indexOf("\"") == 0) {
                                        newUrl = newUrl.substr(1);
                                        newUrl = newUrl.substr(0, newUrl.length - 1);
                                    }
                                    // check if url is relative
                                    var isAbsolute = newUrl.indexOf("/") == 0 || newUrl.indexOf("http://") == 0 || newUrl.indexOf("https://") == 0 || newUrl.indexOf("//") == 0;
                                    var isEmbedded = newUrl.indexOf("data:") == 0;
                                    if (!isAbsolute && !isEmbedded) {
                                        var filePath = '/static/' + files[j];
                                        var fileDir = filePath.match(new RegExp(/.*\//));
                                        newUrl = fileDir + newUrl;
                                    }
                                    // re-append url()
                                    newUrl = "url('" + newUrl + "')";

                                    //replace urls
                                    fileContent = fileContent.replace(originalUrl, newUrl);
                                }
                            }
                            bundelContent += fileContent;
                        }
                        if (config.STATIC.COMPRESS_RESOURCES) {
                            if (type == 'css') {
                                bundelContent = new cleancss().minify(bundelContent.toString());
                            } else {
                                bundelContent = uglify.minify(bundelContent.toString(), {fromString: true}).code;
                            }
                        }
                        fs.writeFileSync(config.DIR.PROJECT + "/" + config.DIR.RESOURCES + '/' + bundelName, bundelContent);
                    }

                    if (config.STATIC.RESOURCES[bundelName].cache == undefined) {
                        config.STATIC.RESOURCES[bundelName].cache = config.STATIC.CACHE_RESOURCES;
                    }

                    config.STATIC.RESOURCES[bundelName] = extend(config.STATIC.RESOURCES[bundelName], {
                        content: bundelContent,
                        etag: hash.etag(bundelContent),
                        modified: new Date()
                    });
                }
            }
        });

    },
    start: function () {
        // Prepare Resources
        this.prepareResources();

        // load interceptors
        this.loadInterceptors();

        // load controllers
        this.loadControllers();

        // the date that server run at
        var runAt = new Date();

        //function To be executed on any request
        console.log(colorStart + "running server... " + colorEnd);
        http.createServer(function (request, response) {
            var exports = {};
            exports["request"] = {
                value: request,
                export_to_theme: false,
                by_ref: true
            };
            exports["response"] = {
                value: response,
                export_to_theme: false,
                by_ref: true
            };
            exports["runAt"] = {
                value: runAt,
                export_to_theme: false,
                by_ref: false
            };

            var interceptors = Interceptor.all();
            for (var i = 0; i < interceptors.length; i++) {
                var interceptor = interceptors[i];
                interceptor.next = interceptors[i + 1];
                interceptor.complete = function () {
                    exports = extend(exports, this._exports);
                    var _exports = {};
                    var _exports_to_theme = {};
                    for (var key in exports) {
                        _exports[key] = exports[key].by_ref ? exports[key].value : clone(exports[key].value, true);
                        if (exports[key].export_to_theme) {
                            _exports_to_theme[key] = _exports[key];
                        }
                    }
                    if (this.next) {
                        this.next.EXPORTS = _exports;
                        this.next.EXPORTS_TO_THEME = _exports_to_theme;
                        this.next = extend(this.next, _exports);
                        this.next.start();
                    }
                };
            }
            var _exports = {};
            var _exports_to_theme = {};
            for (var key in exports) {
                _exports[key] = exports[key].by_ref ? exports[key].value : clone(exports[key].value, true);
                if (exports[key].export_to_theme) {
                    _exports_to_theme[key] = _exports[key];
                }
            }
            interceptors[0].EXPORTS = _exports;
            interceptors[0].EXPORTS_TO_THEME = _exports_to_theme;
            interceptors[0] = extend(interceptors[0], _exports);
            interceptors[0].start();
        }).listen(config.SERVER.PORT);
        console.log(colorStart + "elegant project started at : " + colorEnd + "http://localhost:" + config.SERVER.PORT);
    }
}