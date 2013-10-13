var fs = require('fs');
var http = require('http');
var path = require("path");
var url = require("url");
var settings = require("../settings");


http.createServer(function (request, response) {

    var uri = url.parse(request.url).pathname;
    var filetype = (uri.split("/")[1]).split(".")[1];
    var filename = path.join(process.cwd(), uri);
    console.log(filetype)
    fs.readFile(filename, function (error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        }
        else {
            var DownloadableFiles = settings.FILES.Downloadable;
            var Downloadable = false;
            for (i = 0; i < DownloadableFiles.length && !Downloadable; i++) {
                if (DownloadableFiles[i] == filetype) {
                    Downloadable = true;
                }
            }

            if (Downloadable) {
                response.writeHead(200, { 'Content-Type': settings.FILES.Headers.DOWNLOAD });
                response.end(content, 'utf-8');

            } else {

                response.writeHead(200, { 'Content-Type': settings.FILES.Headers[filetype.toUpperCase()] });
                response.end(content, 'utf-8');

            }


        }
    });

}).listen(8000);