var extend = require("extend");
function Sync(target) {
    this._target = target;
    this.queue = [];
    this._ready;
}
Sync.prototype.start = function (data) {
    if (this.queue.length < 1) {
        this.$(function () {
        }, data)();
    }
    return this._target;
};
Sync.prototype.ready = function (fun) {
    this._ready = fun;
    return this._target;
};
Sync.prototype.$ = function (fun, data) {
    var self = this;
    self.queue.push(fun);
    return function () {
        var _arguments = new Array();
        if (arguments) {
            for (var i = 0; i < arguments.length; i++) {
                _arguments.push(arguments[i]);
            }
        }
        if (data) {
            for (var i = 1; i < data.length; i++) {
                _arguments.push(data[i]);
            }
        }
        fun.apply(self._target, _arguments);
        var index = self.queue.indexOf(fun);
        self.queue.splice(index, 1);
        if (self.queue.length == 0) {
            if (self._ready) {
                data = self._ready.apply(self._target);
            }
            self._target.complete.apply(self._target, [data]);
        }
    }
}
module.exports = Sync;