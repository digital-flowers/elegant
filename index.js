var http = require("http");
var router = require("./modules/router.js");
var settings = require("./settings.js");
http.createServer(function (request, response) {
    router.rout(request,response);
}).listen(settings.PORT);