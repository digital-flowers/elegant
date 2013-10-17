var settings = require("../../settings");
var Redirect = require("../type/redirect");
var Controller = require("../type/controller");

new Controller("redirect").execute(function () {
    return new Redirect("http://www.google.com/");
});