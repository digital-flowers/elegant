var Redirect = require("elegant-redirect");
var Controller = require("elegant-controller");

new Controller("redirect").execute(function () {
    return new Redirect("http://www.google.com/");
});