var http = require("http");
var router = require("./modules/router.js");
var settings = require("./settings.js");
var interceptor = require("./modules/interceptor.js");
var car = require("./modules/car.js");
require("./interceptors/permissions.js");

http.createServer(function (request, response) {
    console.log(interceptor.getAll());
    router.rout(request, response);
}).listen(settings.PORT);
