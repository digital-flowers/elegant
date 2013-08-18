var qs = require('querystring');
var url = require("url");
var settings = require("../settings");
var extend = require("../node_modules/extend");

exports.parseRequest = function (request) {
    var data = {
        method: request.method,
        path: "",
        params: {},
        args: [],
        code: 200,
        success: true
    };
    // parse url and GET data
    if (request.url) {
        var urlData = url.parse(request.url, true);
        data.path = urlData.pathname;
        data.args = data.path.split("/").slice(1);
        data.params = extend(data.params, urlData.query);
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
        data.params = extend(data.params, qs.parse(requestBody));
    });
    return data;
};