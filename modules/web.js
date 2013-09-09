var qs = require('querystring');
var url = require("url");
var settings = require("../settings.js");
var extend = require("extend");
var trim = require("trimmer");

exports.parseRequest = function (request, handler) {
    var data = {
        method: request.method,
        path: "",
        args: [],
        post: {},
        get: {},
        params: {},
        code: 200,
        success: true,
        head: {
            'content-type': 'text/html'
        }
    };
    // parse url and GET data
    if (request.url) {
        var urlData = url.parse(request.url, true);
        data.path = trim(urlData.pathname, "/");
        data.args = data.path.split("/");
        data.get = urlData.query;
        data.params = extend(data.params, data.get);
    }
    // parse POST data
    var requestBody = '';
    request.on('data', function (data) {
        requestBody += data;
        if (requestBody.length > 1e6 * settings.POST_MAX_SIZE) {
            data.success = false;
            data.code = 413;
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            request.connection.destroy();
        }
    });
    request.on('end', function () {
        data.post = qs.parse(requestBody);
        data.params = extend(data.params, data.post);
        handler(data);
    });
};