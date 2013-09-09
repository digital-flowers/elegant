var settings = require("../settings.js");
var view = require("../modules/view.js");
var db = require("../modules/db.js");
var redirect = require("../modules/redirect.js");

exports["/about"] = {
    handler: function (data) {
        // Prepare Vars
        var vars = {};
        vars.cityes = [];
        for (var i = 1; i < 10; i++) {
            db("SELECT * FROM `city`",
                function (err, rows, fields) {
                    vars.cityes.push(rows);
                }
            );
        }
        db("SELECT * FROM `user` where user.id = 2",
            function (err, rows, fields) {
                vars.user = rows[0];
            }
        );
        return view("product.html", vars);
    }
};

exports["/about/us"] = {
    handler: function (data) {
        return redirect("/products");
    }
};