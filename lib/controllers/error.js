var settings = require("../../settings.js");
var Error = require("../type/error");
var Controller = require("../type/controller.js");

new Controller("error").execute(function () {
    return "page error!";
});
new Controller("error/404").execute(function () {
    return "page not found!";
});