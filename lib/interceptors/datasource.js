var settings = require("elegant-settings");
var Interceptor = require("elegant-interceptor");

new Interceptor(0, "datasource").execute(function () {
    this.DATA_SOURCE;
    if (settings.DATA_SOURCE.SOURCE == "MYSQL") {
        if (!this.DATA_SOURCE) {
            // Database Configuration
            this.DATA_SOURCE = require('mysql').createConnection(settings.DATA_SOURCE.MYSQL);
        }
    }
}).ready(function () {
        if (this.DATA_SOURCE) {
            this.export("DATA_SOURCE", this.DATA_SOURCE);
        }
    });