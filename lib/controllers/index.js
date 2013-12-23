var Controller = require("elegant-controller");

new Controller("/").execute(function () {
    return "hello elegant";
})