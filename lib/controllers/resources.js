var config = require("elegant-config");
var File = require("elegant-file");
var Controller = require("elegant-controller");
var ResponseData = require("elegant-response-data");

new Controller("/resources").get(function () {
    var bundleName = this.PATH.substring("/resources".length);
    var contentType = this.EXTENSION ? config.STATIC.CONTENT_TYPE[this.EXTENSION.toUpperCase()] : "";
    if (config.STATIC.RESOURCES[bundleName] && config.STATIC.RESOURCES[bundleName].cache) {
        header = {
            "Content-Type": contentType,
            "Last-Modified": config.STATIC.RESOURCES[bundleName].modified.toUTCString(),
            "ETag": config.STATIC.RESOURCES[bundleName].etag,
            "Cache-Control": 'public, max-age=' + config.STATIC.CACHE_AGE
        }
        return new ResponseData(config.STATIC.RESOURCES[bundleName].content, header);
    }
    var filePath = config.DIR.PROJECT + "/" + config.DIR.RESOURCES + "/" + bundelName;
    return new File(filePath, contentType);
});