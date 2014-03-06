var Controller = require("elegant-controller");
var View = require("elegant-view");

new Controller("/").get(function () {
    return new View();
});