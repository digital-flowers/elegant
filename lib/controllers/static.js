var settings = require("../../settings.js");
var File = require("../file");
var Controller = require("../controller.js");

new Controller(settings.DIR.STATIC).execute(function () {
    this.filePath = settings.DIR.PROJECT + "/" + settings.DIR.VIEWS + "/" + this.PATH;
    return new File(this.filePath);
});