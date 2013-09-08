/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 9/8/13
 * Time: 5:48 PM
 * To change this template use File | Settings | File Templates.
 */

// Get the clean-css package
var cleanCSS = require('clean-css');
fs = require('fs');

module.exports = function(file){

    fs.readFile(file, 'utf8', function (err,data) {

        var minifiedCSS = cleanCSS.process(data);
        return minifiedCSS;

    });



}
