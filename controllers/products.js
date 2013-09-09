exports["/products"] = {
    method:"GET",
    handler:function(data){
        return "products page";
    }
};
exports["/products/cars"] = {
    method:"POST",
    permissions:["lol","can_add_product"],
    handler:function(data){
        return "products cars page";
    }
};