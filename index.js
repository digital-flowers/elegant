var http = require("http");
var web = require("./modules/web.js");
http.createServer(function (request, response) {
    var req = web.parseRequest(request);
    response.writeHead(req.code, "text/plain");
    response.write(req.params["name"]+"");
    response.end();
}).listen(8000);