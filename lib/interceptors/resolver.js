var Interceptor = require("../interceptor.js");
var Controller = require("../controller.js");

new Interceptor(1, "resolver").execute(function () {
    var controllers = Controller.all();
    this.CONTROLLER;
    while (this.ARGS.length && !this.CONTROLLER) {
        this.CONTROLLER = controllers[this.METHOD.toLowerCase() + "_" + this.ARGS.join("/").toLowerCase()];
        this.ARGS.pop();
    }
}).ready(function () {
        this.export("CONTROLLER", this.CONTROLLER);
    });