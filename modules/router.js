var web = require("./web.js");
var settings = require("../settings.js");
var extend = require("extend");
var trim = require('trimmer');

// require all controllers js files
var controllersJs = require('require-all')({
    dirname: settings.PROJECT_DIR + '/'+settings.CONTROLLERS_DIR,
    filter: /.+\.js$/,
    excludeDirs: /^\.(git|svn)$/
});

// prepare controllers
var controllers = {};
for (var i in controllersJs) {
    var controllerJs = controllersJs[i];
    for (var j in controllerJs) {
        controllers[trim(j, "/")] = extend({
            method: "GET",
            permissions: [],
            handler: function () {
            }
        }, controllerJs[j]);
    }
}

exports.rout = function (request, response) {
    web.parseRequest(request, function (data) {
        var args = data.args;
        var controller;
        while(args.length && !controller){
            controller = controllers[args.join("/")];
            args.pop();
        }
        var text = "";
        if(controller){
            if(controller.method.toLowerCase() == data.method.toLowerCase()){
                var chunk = controller.handler(data);
                if(typeof chunk == "string"){
                    text += chunk;
                }else if(typeof chunk == "object"){
                    if(chunk.code){ // code
                        var code = parseInt(chunk.code);
                        if(!isNaN(code)){
                            data.code = code;
                        }
                    }
                    if(chunk.text){
                        text += chunk.text;
                    }
                    if(chunk.head){
                        data.head = extend(data.head,chunk.head);
                    }
                }
            }else{
                data.code = 405; // method not allowed
                data.success = false;
            }
        }else{
            data.code = 404; // page not found
            data.success = false;
        }

        response.writeHead(data.code, data.head);
            if(data.success && text){
            response.write(text);
        }
        response.end()
    });
};

