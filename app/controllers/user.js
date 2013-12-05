var View = require("elegant-view");
var File = require("elegant-file");
var Error = require("elegant-error");
var Redirect = require("elegant-redirect");
var Controller = require("elegant-controller");

new Controller("/user/login").execute(function () {
    this.vars = {};
    this.DATA_SOURCE.query("SELECT * FROM `user` where id = " + this.PARAMS["id"],
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
            return "login failed try again!";
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