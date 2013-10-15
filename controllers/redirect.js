var settings = require("../settings");
var Redirect = require("../lib/redirect");
var Controller = require("../lib/controller");

new Controller("redirect-test").execute(function () {
    return new Redirect("http://www.google.com/");
});