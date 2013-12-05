var Interceptor = require("elegant-interceptor");
var Controller = require("elegant-controller");

new Interceptor(3, "resolver").execute(function () {
    var controllers = Controller.all();
    this.CONTROLLER;
    while (this.ARGS.length && !this.CONTROLLER) {
        this.CONTROLLER = controllers[this.ARGS.join("/").toLowerCase()];
        this.ARGS.pop();
    }
}).ready(function () {
        this.export("CONTROLLER", this.CONTROLLER);
    });