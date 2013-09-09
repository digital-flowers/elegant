var settings = require("../settings");
var interceptors = [];

function Interceptor(name) {
    this.id = interceptors.length;
    this.name = name; // default value
    interceptors.push(this);
}
// class methods
Interceptor.prototype.fooBar = function () {
    console.log("yes");
};

// export the class
var interceptor = module.exports = Interceptor;
interceptor.getAll = function () {
    return interceptors;
};