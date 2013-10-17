var View = require("../type/view.js");
var File = require("../type/file.js");
var Controller = require("../type/controller.js");

new Controller("/user/login", "post").execute(function () {
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