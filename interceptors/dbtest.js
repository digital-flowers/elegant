var Interceptor = require("elegant-interceptor");
var db = require("../modules/db.js");

new Interceptor(10).execute(function () {
    this.vars = {};
    db("SELECT * FROM `user`",
        this.$(function (err, rows, fields) {
            this.vars.users = rows;
        })
    );

    db("SELECT * FROM `user` where `id`=1",
        this.$(function (err, rows, fields) {
            this.vars.user = rows[0];
        })
    );

}).ready(
    function () {
        this.response.write("db test " + this.vars.user.name + "\n");
    }
);