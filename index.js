var http = require("http");
var router = require("./modules/router.js");
/*var theme = require("./modules/theme.js");*/

http.createServer(function (request, response) {
    router.rout(request,response);
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
    response.writeHead(200, "text/plain");
    response.write("LOL");
    response.end();
}).listen(8000);