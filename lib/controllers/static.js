var config = require("elegant-config");
var File = require("elegant-file");
var Controller = require("elegant-controller");
var ResponseData = require("elegant-response-data");

new Controller("/static").get(function () {
    var filePath = config.DIR.PROJECT + "/" + config.DIR.STATIC + "/" + this.PATH.substring("/static".length);
    var contentType = this.EXTENSION ? config.STATIC.CONTENT_TYPE[this.EXTENSION.toUpperCase()] : "";
    return new File(filePath, contentType);
});
