function Car() {
    this.name = "";
    this.force = 3000;
}
Car.prototype.printInfo = function () {
    console.log(this.name + "" + this.year);
}
module.exports = Car;