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
        fun.apply(self._target, arguments);
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