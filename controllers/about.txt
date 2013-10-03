var settings = require("../settings.js");
var view = require("../modules/view.js");
var db = require("../modules/db.js");
var redirect = require("../modules/redirect.js");
var control = require("../modules/control.js");

exports["/about"] = {
    handler:function(data){
        // Prepare Vars
        var vars = {};
        db("SELECT * FROM `auth_user`",
            function(err,rows,fields){
                vars.users = rows;
            }
        );
        db("SELECT * FROM `auth_user` where `id`=1",
            function(err,rows,fields){
                vars.user = rows[0];
            }
        );

        control("controls/bar.html",
            function (err,data){

                vars.bar = data;
            }
        );

        vars.bars = "<P>sda</P>";



        return view("product.html",vars);
    }
};

exports["/test"] = {
    handler:function(data){
        return view("test.html");
    }
};