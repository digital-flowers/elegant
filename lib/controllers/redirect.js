var Redirect = require("elegant-redirect");
var Controller = require("elegant-controller");

new Controller("/redirect").get(function () {
    var code = this.GET["code"] || 302;
    var url = this.GET["url"];
    return new Redirect(url, code);
});