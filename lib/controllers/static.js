var config = require("elegant-config");
var File = require("elegant-file");
var Controller = require("elegant-controller");
new Controller("/static").execute(function () {
    this.filePath = config.DIR.PROJECT + "/" + config.DIR.STATIC + "/" + this.PATH.substring("/static".length);
    return new File(this.filePath, config.STATIC.HEADERS[this.EXTENSION]);
});