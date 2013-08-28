var $ = require("./$.js");
module.exports = function (url, code) {
    $.ready(
        function(data,request,response){
            data.code = code ? code : 302;
            data.head = {location: url};
            response.writeHead(data.code, data.head);
            response.end();
        }
    );
};