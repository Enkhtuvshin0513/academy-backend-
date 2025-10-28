class Rectangle {
  constructor(height, width) {
    this.height = height ? height : 0;
    this.width = width ? width : 0;
  }

  area() {
    return this.height * this.width;
  }
  perimeter() {
    return 2 * (this.width + this.height);
  }
}
