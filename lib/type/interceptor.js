var settings = require("../../settings.js");
var Sync = require("./../sync.js");
var clone = require("clone");
var interceptors = [];

function Interceptor(weight, id) {
    this._sync = new Sync(this);
    this._execute;
    this._next = {};

    this.complete;
    this._exports = [];
    this.id = id ? id : interceptors.length - 1;
    this.weight = weight;

    for (var i = 0; i < interceptors.length; i++) {
        if (interceptors[i].weight == weight) {
            interceptors.splice(i, 1);
        }
    }
    interceptors.push(this);
}
// class methods
Interceptor.prototype.execute = function (fun) {
    this._execute = fun;
    return this;
};
Interceptor.prototype.start = function () {
    this._execute();
    this._sync.start();
};

Interceptor.prototype.$ = function (fun) {
    return this._sync.$(fun, arguments);
};

Interceptor.prototype.ready = function (fun) {
    return this._sync.ready(fun);
};

Interceptor.prototype.export = function (name, val) {
    return this._exports[name] = val;
};

// export the class
var interceptor = module.exports = Interceptor;

// get all interceptors
interceptor.all = function () {
    interceptors.sort(function (a, b) {
        return (a.weight > b.weight) ? 1 : -1;
    });
    return clone(interceptors);
};

// require all core interceptors
require('require-all')({
    dirname: settings.DIR.PROJECT + '/lib/interceptors',
    filter: /.+\.js$/,
    excludeDirs: /^\.(git|svn)$/
});
// require all controllers interceptors
if (settings.DIR.INTERCEPTORS) {
    require('require-all')({
        dirname: settings.DIR.PROJECT + '/' + settings.DIR.INTERCEPTORS,
        filter: /.+\.js$/,
        excludeDirs: /^\.(git|svn)$/
    });
}