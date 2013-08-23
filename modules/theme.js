/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 8/18/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */
var settings = require("../settings");
var fs = require("fs");
var swig  = require('swig');

module.exports = function (ViewName,vars) {

   // Get Defult Folder From Settings
   var ViewDR =  settings.VIEWS_DIR;

   // Construct View Path
   var ViewName = ViewName;

   // View Full Path
   var ViewPath = ViewDR + "/" + ViewName;

   // Compile Requested File
   var tpl = swig.compileFile(ViewPath);

   // Return Compiled File
   return tpl(vars);





};
