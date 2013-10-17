var Interceptor = require("../lib/type/interceptor.js");

new Interceptor(20).execute(function () {
    this.response.write("welcome " + this.ARGS[0] + "\n");
});
