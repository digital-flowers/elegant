var Interceptor = require("../type/interceptor.js");
var Controller = require("../type/controller.js");

new Interceptor(1, "resolver").execute(function () {
    var controllers = Controller.all();
    this.CONTROLLER;
    while (this.ARGS.length && !this.CONTROLLER) {
        this.CONTROLLER = controllers[this.ARGS.join("/").toLowerCase()];
        this.ARGS.pop();
    }
}).ready(function () {
        this.export("CONTROLLER", this.CONTROLLER);
    });