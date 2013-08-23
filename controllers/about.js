// TODO: hasan template engine

var settings = require("../settings.js");
var view = require("../modules/theme.js");


exports["/about"] = {
    handler:function(data){
        // Prepare Vars
        var vars = {article: { pagename: 'Swig is fun!' ,writer:['hassan','fareed']}};

        //Render View with its Variables
        return view('about.html',vars);
    }
};

exports["/about/us"] = {
    handler:function(data){
        return {text:"LOL",code:302,head:{location:"/products"}};
    }
};