var Interceptor = require("elegant-interceptor");

new Interceptor(10).execute(function () {
    this.vars = {};
    this.DATA_SOURCE.query("SELECT * FROM `user`",
        this.$(function (err, rows, fields) {
            this.vars.users = rows;
        })
    );

    this.DATA_SOURCE.query("SELECT * FROM `user` where `id`=1",
        this.$(function (err, rows, fields) {
            if (!err) {
                this.vars.user = rows[0];
            }
        })
    );

}).ready(
    function () {
        if (this.vars.user) {
            this.response.write("db test " + this.vars.user.name + "\n");
        }
    }
);