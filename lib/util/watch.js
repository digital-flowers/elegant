var fs = require("fs");

var watchList = {};

module.exports = function (file,date) {
    if (!watchList[file]) {
        fs.watchFile(file, function (curr, prev) {
            watchList[file] = {
                current: curr.mtime,
                previous: prev.mtime
            }
        });
        watchList[file] = {
            current: date,
            previous: date
        };
    }
    return watchList[file];
};