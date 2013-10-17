var extend = require("extend");
var Interceptor = require("../type/interceptor.js");
var Error = require("../type/error.js");

new Interceptor(2, "router").execute(function () {
    if (this.CONTROLLER) {
        if (this.METHOD == this.CONTROLLER.method) {
            this.CONTROLLER = extend(this.CONTROLLER, this.EXPORTS);
            this.CONTROLLER.complete = this.$(function (result) {
                if (result) {
                    this.RESULT = result;
                }
            });
            this.CONTROLLER.start();
        } else {
            this.RESULT = new Error(405);
        }
    } else {
        this.RESULT = new Error(404);
    }
}).ready(function () {
        this.export("RESULT", this.RESULT);
    });