var $ = module.exports = function (fun) {
    $.queue.push(fun);
    return function () {
        fun.apply(this, arguments);
        var index = $.queue.indexOf(fun);
        $.queue.splice(index, 1);
        if ($.queue.length == 0) {
            $.complete();
        }
    };
};
$.reset = function(){
    this.queue = [];
    this.readyQueue = [];
    this.ready = function (fun) {
        this.readyQueue.push(fun);
    };
    this.complete = function () {
    };
};