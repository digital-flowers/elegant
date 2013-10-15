var View = require("../view.js");
var File = require("../file.js");
var Controller = require("../controller.js");

new Controller("/user").execute(function () {

}).ready(function () {
        return new View("about");
    });

new Controller("/user/login").execute(function () {
    if (this.PARAMS["file"] == "a") {
        return new File("/home/administrator/projects/livejs/views/static/foo.txt", null, true);
    } else {
        return "login page";
    }
});

new Controller("/user/logout").execute(function () {
    this.response.write("this is user logout");
    this.response.end();
    return "\nLOL";
});