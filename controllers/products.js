exports["/products"] = {
    method:"get",
    handler:function(data){
        return "products";
    }
};

exports["/products/car"] = {
    method:"post",
    handler:function(data){
        return "products car";
    }
};