module.exports = {
    getExtension: function (path) {
        var extension = "";
        var lastExt = path.match(new RegExp(/\.([0-9a-z]+$)/));
        if (lastExt) {
            extension = lastExt[1].toLowerCase();
        }
        return extension;
    }
}