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

        function download(url, cb) {
            var data = "";
            var request = require("http").get(url, function (res) {

                res.on('data', function (chunk) {
                    data += chunk;
                });

                res.on('end', function () {
                    cb(data);
                })
            });

            request.on('error', function (e) {
                console.log("Got error: " + e.message);
            });
        }

        download("http://upload.wikimedia.org/wikipedia/commons/4/4f/Big%26Small_edit_1.jpg", function () {
            console.log("")
        });
    }
).listen(9000);





