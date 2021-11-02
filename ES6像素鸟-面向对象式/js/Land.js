const landDom = document.querySelectorAll(".land")[0];
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);


class Land extends Rectangle {
  constructor(xSpeed) {
    super(landWidth, landHeight, 0, landTop, xSpeed, 0, landDom);
  }
  onMove() {
    if (this.left <= -landWidth / 2) {
      this.left = 0;
      this.render();
    }
  }
}

