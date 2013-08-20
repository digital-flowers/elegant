/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 8/18/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */
var settings = require("../settings");
var fs = require("fs");

exports.RenderView = function (view,vars) {

   // Get Defult Folder From Settings
   var ViewDR = "" + settings.VIEWS_DIR;

   // Construct View Path
   var ViewPath = "views/product.html";

   // Read View File



   var file = fs.readFile(ViewPath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

              return console.log(data);



    });

    return file;

};
