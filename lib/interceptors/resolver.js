var Interceptor = require("elegant-interceptor");
var Controller = require("elegant-controller");

new Interceptor(3, "resolver").execute(function () {
    var controllers = Controller.all();
    this.controllers = {};
    while (this.ARGS.length && !this.controller) {
        for (var i = 0; i < controllers.length; i++) {
            var controller = controllers[i];
            if (controller.path == this.ARGS.join("/").toLowerCase()) {
                this.controllers[controller.method] = controller;
            }
        }
        this.ARGS.pop();
    }
}).ready(function () {
        this.export("CONTROLLERS", this.controllers);
    });