// TODO: hasan template engine
exports["/about"] = {
    handler:function(data){
        return "about";
    }
};

exports["/about/us"] = {
    handler:function(data){
        return {text:"LOL",code:302,head:{location:"/products"}};
    }
};