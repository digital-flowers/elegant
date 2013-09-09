/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 9/9/13
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */

var settings = require("./settings.js");

var db = require("./modules/db.js");

var control = require("./modules/control.js");
var fs = require("fs");

var url = require("url");
var $ = require("./modules/web.js");
var http = require("http");


http.createServer(function (request, response) {

        var fileName = "./foo.txt";

        fs.open('./controllers/foo.txt', 'r', function (err, data) {

            /*fs.fstat(fd,function(err, stats) {
             var bufferSize=stats.size,
             chunkSize=512,
             buffer= new Buffer(bufferSize),
             bytesRead = 0;

             while (bytesRead < bufferSize) {
             if ((bytesRead + chunkSize) > bufferSize) {
             chunkSize = (bufferSize - bytesRead);
             }
             fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
             bytesRead += chunkSize;
             }
             console.log(buffer.toString('utf8', 0, bufferSize));
             });*/
            console.log(data);
            response.end();
        });
    }
).listen(9000);





