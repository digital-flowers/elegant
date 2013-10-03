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
var $ = require("./lib/interceptors/web.js");
var http = require("http");


http.createServer(function (request, response) {

        var fileName = "./controllers/foo.txt";


        fs.exists(fileName, function (exists) {
            if (exists) {
                fs.stat(fileName, function (error, stats) {
                    fs.open(fileName, "r", function (error, fd) {
                        var buffer = new Buffer(stats.size);

                        fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
                            var data = buffer.toString("utf8", 0, buffer.length);

                            console.log("Reading file : " + fileName);

                            fs.close(fd);
                            response.write(data);
                            response.end();
                        });
                    });
                });
            }
        });


    }
).listen(9000);





