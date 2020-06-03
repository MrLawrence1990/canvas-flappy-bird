import React from 'react';
import './App.css';
import Ball from './elelemt/ball'
import Pillar from './elelemt/pillar';

export default class App extends React.Component {
  constructor() {
    super()
    this.pillars = []
    this.pause = false
    this.score = 0
    this.t = 16 / 1000;
  }
  componentDidMount () {
    this.canvas = document.getElementById('cas')
    this.ctx = this.canvas.getContext("2d")
    this.ctx.font = 'oblique small-caps normal 24px Arial';
    this.ctx.strokeStyle = '#ff7a45'
    this.ball = new Ball(20, 'red', this.canvas)
    this.ball.paintTo(this.canvas)
    this.initPillar()
    this.reset()
    this.animate()
    document.onkeydown = (e) => {
      if (e.code === 'Space') {
        if (this.pause) {
          this.pause = false
          this.pillars[0].reset()
        }
        this.toggleBirdVy(true)
      }
    }
    document.onkeyup = (e) => {
      if (e.code === 'Space') {
        this.toggleBirdVy(false)
      }
    }
    this.pause = true
  }
  initPillar () {
    let pillar
    let nextPillar
    for (let i = 0; i <= 10; i++) {
      pillar = nextPillar ? nextPillar : new Pillar(this.canvas)
      if (i === 10) {
        pillar.setNext(this.pillars[0])
      } else {
        nextPillar = new Pillar(this.canvas)
        pillar.setNext(nextPillar)
      }
      this.pillars.push(pillar)
    }
  }
  animate () {
    if (!this.pause) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.save();
      this.ctx.fillStyle = "rgba(255,255,255,0.2)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.restore();
      this.ball.run(this.t)
      this.pillars.forEach(pillar => {
        pillar.move(this.t)
        if (this.crash(pillar, this.ball)) {
          this.pause = true
        }
      })
      this.score = this.score + 0.01
      this.ctx.strokeText(`score: ${this.score.toFixed(2)}`, 20, 40)
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }
  crash (pillar, ball) {
    if ((ball.x + ball.radius) > pillar.x && ball.x < (pillar.x + pillar.width) && ((ball.y < pillar.height && pillar.up) || ((ball.y + ball.radius) > (this.canvas.height - pillar.height) && !pillar.up))) {
      alert('crash')
      this.reset()
    }
    if (ball.y <= ball.radius || ball.y >= (this.canvas.height - ball.radius)) {
      alert('crash')
      this.reset()
    }
  }
  reset () {
    this.ball.x = 200
    this.ball.y = 200
    this.pillars.forEach(pillar => {
      pillar.reset(true)
    })
    this.score = 0
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ball.run(this.t)
    this.ctx.strokeText(`按空格键控制`, this.canvas.width - 160,40)
    this.pause = true
  }
  toggleBirdVy (status) {
    this.ball.toggleGrv(status);
  }
  render () {
    return <canvas id="cas" width="800" height="400" style={{ 'backgroundColor': 'rgba(0,0,0,.1)' }}></canvas>
  }
}
