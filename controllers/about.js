var redirect = require("../modules/redirect.js");
exports["/about"] = {
    handler:function(data,model){
        return "about page";
    }
};

exports["/about/us"] = {
    handler:function(data){
        return redirect("/products");
    }
};