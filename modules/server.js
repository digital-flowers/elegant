/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 9/8/13
 * Time: 3:20 PM
 * To change this template use File | Settings | File Templates.
 */

var http = require("http");
var router = require("./router.js");
var settings = require("../settings.js");
var url = require("url");

// The Start Server Function
function start(){


    //Function To be executed on any request
    function OnRequest(request, response) {
        /*
        // Uncomment This Section To Log All Requests
        //
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        */
        router.rout(request,response);
    }


    http.createServer(OnRequest).listen(settings.PORT);


}

exports.start = start;