module.exports = function (url, code) {
    code = code ? code : 302;
    return {text: "", code: code, head: {location: url}};
};