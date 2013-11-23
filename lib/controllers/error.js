var Error = require("elegant-error");
var Controller = require("elegant-controller");

new Controller("error").execute(function () {
    return "page error!";
});
new Controller("error/404").execute(function () {
    return "page not found!";
});