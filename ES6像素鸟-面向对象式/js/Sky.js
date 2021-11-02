const skyDom = document.querySelectorAll(".sky")[0];
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);

class Sky extends Rectangle {
  constructor() {
    super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
  }
  onMove() {
    if (this.left <= -skyWidth / 2) {
      this.left = 0;
      this.render();
    }
  }
}

