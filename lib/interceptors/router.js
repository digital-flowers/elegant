var extend = require("extend");
var Interceptor = require("../interceptor.js");

new Interceptor(2, "router").execute(function () {
    if (this.CONTROLLER) {
        this.CONTROLLER = extend(this.CONTROLLER, this.EXPORTS);
        this.CONTROLLER.complete = function (data) {
            if (data) {
                this.response.end(data);
            }
        };
        this.CONTROLLER.start();
    }
});