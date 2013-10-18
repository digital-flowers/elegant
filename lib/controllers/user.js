var View = require("../type/view.js");
var File = require("../type/file.js");
var Error = require("../type/error.js");
var Redirect = require("../type/redirect");
var Controller = require("../type/controller.js");

var db = require("../../modules/db.js");
new Controller("/user/login").execute(function () {
    this.vars = {};
    db("SELECT * FROM `user` where id = " + this.PARAMS["id"],
        this.$(function (err, rows, fields) {
            if (!err) {
                this.vars.user = rows[0];
            }
        })
    );
}).ready(function () {
        if (this.vars.user) {
            this.SESSION.set("user", this.vars.user);
            return new Redirect("/user");
        } else {
            return "login faild try again!";
        }
    });

new Controller("/user").execute(function () {
    var user = this.SESSION.get("user");
    if (user) {
        return "welcome " + user.name;
    } else {
        return new Error(404);
    }
});

new Controller("/user/logout").execute(function () {
    this.SESSION.set("user", null);
    return "logged out!"
});