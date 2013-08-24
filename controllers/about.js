var settings = require("../settings.js");
var view = require("../modules/theme.js");
var db = require("../modules/db.js");
var redirect = require("../modules/redirect.js");

exports["/about"] = {
    handler:function(data){
        // Prepare Vars


        var Query  = db("SELECT * FROM `auth_user`");
        var vars = {article: { pagename: 'Swig is fun!' ,writer:["fareed","hassan"]}};

        //Render View with its Variables
        return view('about.html',vars);
    }
};

exports["/about/us"] = {
    handler:function(data){
        return redirect("/products");
    }
};