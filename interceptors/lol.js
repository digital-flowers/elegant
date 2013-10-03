var Interceptor = require("../lib/interceptor.js");

new Interceptor(20).execute(function () {
    this.response.write("welcome " + this.ARGS[0] + "\n");
});
