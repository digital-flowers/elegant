var extend = require("extend");
var Error = require("elegant-error");
var Interceptor = require("elegant-interceptor");

new Interceptor(4, "router").execute(function () {
    if (Object.keys(this.CONTROLLERS).length > 0) {
        var controller = this.CONTROLLERS[this.METHOD];
        if (controller) {
            controller = extend(controller, this.EXPORTS);
            controller.complete = this.$(function (result) {
                if (result) {
                    this.result = result;
                }
            });
            controller.start();
        } else {
            this.result = new Error(405);
        }
    } else {
        this.result = new Error(404);
    }
}).ready(function () {
        this.export("RESULT", this.result);
    });