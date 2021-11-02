const birdDom = document.querySelectorAll(".bird")[0];
const gameDom = document.querySelectorAll(".game")[0];
const birdStyle = getComputedStyle(birdDom);
const gameStyle = getComputedStyle(gameDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
const gameHeight = parseFloat(gameStyle.height);

class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
    this.g = 2000; //向下的加速度
    this.maxY = gameHeight - landHeight - this.height;//小鸟最高能飞的高度
    this.swingStatus = 0;//翅膀状态
    this.timer = null;
    this.render();
  }

  render() {
    super.render(); //重用父类渲染逻辑
    this.dom.className = `bird swing${this.swingStatus}`;
  }

  //开始煽动翅膀
  startSwing() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.swingStatus = (this.swingStatus + 1) % 3;
      this.render();
    }, 200);
  }

  //停止煽动翅膀
  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }

  jump() {
    this.ySpeed = -400;
  }
  move(duration) {
    super.move(duration); //调用父类的move函数
    this.ySpeed += this.g * duration;
  }
  onMove() {
    if (this.top >= this.maxY) {
      this.top = this.maxY;
    } else if (this.top < 0) {
      this.top = 0;
    }
    this.render();
  }
}

