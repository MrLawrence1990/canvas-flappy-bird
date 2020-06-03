const G = 9.8
const SPEED_LEVEL = 80
const TANXINGXISHU = 0.7

export default class Ball {
  constructor(r, color) {
    this.radius = r;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.x = 0;
    this.y = 0;
    this.candrod = true;
    this.canvas = null
    this.grv = 1
  }
  paintTo (canvas) {
    if (!this.canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext("2d")
    }
  }
  toggleGrv (up) {
    this.grv = up? -1 : 1
  }
  paint () {
    if (!this.canvas) {
      return
    }
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius - 1, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  run (t) {
    this.vy = this.vy + G * t * this.grv;
    this.y += t * this.vy * SPEED_LEVEL;
    this.paint();
  }
}