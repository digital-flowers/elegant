var settings = require("elegant-settings");
var File = require("elegant-file");
var Controller = require("elegant-controller");

new Controller(settings.DIR.STATIC).execute(function () {
    this.filePath = settings.DIR.PROJECT + "/" + settings.DIR.VIEWS + "/" + this.PATH;
    return new File(this.filePath, settings.STATIC.HEADERS[this.EXTENSION]);
});