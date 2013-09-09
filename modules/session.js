var settings = require("../settings.js");
var sessionManager = require('session-manager');

// Best to use one shared session manager across requests
sessionManager = sessionManager.create({engine: 'memory'});

module.exports = function (request, response) {
    return sessionManager.start(request, response);
}