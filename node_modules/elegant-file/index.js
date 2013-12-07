function File(path, contentType, download, name) {
    this.path = path;
    this.name = name ? name : this.path.split('/')[this.path.split('/').length - 1];
    this.contentType = contentType;
    this.download = download;
    this.content;

}
module.exports = File;