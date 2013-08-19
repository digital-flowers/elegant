exports["/products"] = {
    method:"GET",
    handler:function(data){
        return "products page";
    }
};
exports["/products/cars"] = {
    method:"POST",
    handler:function(data){
        return "products cars page";
    }
};