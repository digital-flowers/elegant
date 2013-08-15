var http = require("http");
http.createServer(function(request,response){
    response.writeHead(200,"text/plain");
    response.write("LOLs pff");
    response.end();
}).listen(8000);
