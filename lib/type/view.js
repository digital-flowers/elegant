var settings = require("../../settings.js");
function View(suffix, vars, theme) {
    this.suffix = suffix;
    this.vars = vars != undefined ? vars : {};
    this.theme = theme != undefined ? theme.toLowerCase() : settings.DEFAULT_THEME;
    this.index = "";
}
module.exports = View;