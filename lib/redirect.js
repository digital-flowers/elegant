function Redirect(url, code) {
    this.url = url;
    this.code = code ? code : 302;
}
module.exports = Redirect;