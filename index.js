var http = require("http");
var web = require("./modules/web.js");
/*var theme = require("./modules/theme.js");*/

http.createServer(function (request, response) {
    var req = web.parseRequest(request);
    // TODO: hasan template engine
    /*
    var vars = {
        user: {
            name:"fareed",
            age:25
        },
        product:{
            name:"BMW",
            year:2010
        }
    }
    var result = theme.render("product.html",vars);
    response.writeHead(req.code, "text/plain");
    response.write(result+"");
    */
    response.writeHead(req.code, "text/plain");
    response.write("LOL");
    response.end();
}).listen(8000);