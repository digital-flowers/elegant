var settings = require("../settings.js");
var trim = require("trimmer");
var Sync = require("./sync.js");
var clone = require("clone");
var controllers = [];

function Controller(path, method) {
    this._sync = new Sync(this);
    this._execute;

    this.complete;
    this._exports = [];
    this.id = controllers.length - 1;
    this.path = trim(path, "/");
    this.method = method != undefined ? method.toLowerCase() : "get";
    controllers[this.method + "_" + this.path] = this;
}
// class methods
Controller.prototype.execute = function (fun) {
    this._execute = fun;
    return this;
};
Controller.prototype.start = function () {
    var data = this._execute();
    this._sync.start(data);
};

Controller.prototype.$ = function (fun) {
    return this._sync.$(fun, arguments);
};

Controller.prototype.ready = function (fun) {
    return this._sync.ready(fun);
};

Controller.prototype.export = function (name, val) {
    return this._exports[name] = val;
};

// export the class
var controller = module.exports = Controller;

// get all controllers
controller.all = function () {
    return clone(controllers);
};

// require all core controllers
require('require-all')({
    dirname: settings.DIR.PROJECT + '/lib/controllers',
    filter: /.+\.js$/,
    excludeDirs: /^\.(git|svn)$/
});
// require all user controllers
if (settings.DIR.CONTROLLERS) {
    require('require-all')({
        dirname: settings.DIR.PROJECT + '/' + settings.DIR.CONTROLLERS,
        filter: /.+\.js$/,
        excludeDirs: /^\.(git|svn)$/
    });
}