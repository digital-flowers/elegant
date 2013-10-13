var extend = require("extend");
var Interceptor = require("../interceptor.js");

new Interceptor(2, "router").execute(function () {
    if (this.CONTROLLER) {
        this.CONTROLLER = extend(this.CONTROLLER, this.EXPORTS);
        this.CONTROLLER.complete = this.$(function (result) {
            if (result) {
                this.RESULT = result;
            }
        });
        this.CONTROLLER.start();
    }
}).ready(function () {
        this.export("RESULT", this.RESULT);
    });