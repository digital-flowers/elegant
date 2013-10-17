var View = require("../type/view.js");
var File = require("../type/file.js");
var Controller = require("../type/controller.js");

new Controller("/user/login", "post").execute(function () {
    return "login page";
});

new Controller("/user/logout").execute(function () {
    this.response.write("this is user logout");
    this.response.end();
});