/**
 * Created with JetBrains WebStorm.
 * User: hasan
 * Date: 8/16/13
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');

fs.unlink('/tmp/hello', function (err) {
    if (err) throw err;
    console.log('successfully deleted /tmp/hello');
});
