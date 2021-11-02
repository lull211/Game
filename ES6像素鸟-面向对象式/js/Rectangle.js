/**
 * 矩形类，爸爸，可以移动
 * 属性：宽度，高度，横坐标，纵坐标，横向速度，纵向速度，对应的DOM对象
 */
class Rectangle {
  constructor(width, height, left, top, xSpeed, ySpeed, dom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.dom = dom;
  }
  render() {
    //渲染
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  }
  /**
   * 按照矩形的速度，和指定的时间
   * @param {*} duration :移动的时间：单位：秒
   */
  move(duration) {
    const xDis = this.xSpeed * duration; //横向速度
    const yDis = this.ySpeed * duration; //纵向速度
    const newLeft = this.left + xDis;
    const newTop = this.top + yDis;
    this.left = newLeft;
    this.top = newTop;
    this.render(); //重新渲染
    if (this.onMove) {
      this.onMove();//onMove控制范围
    }
  }
}
