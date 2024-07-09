import { DrawableObject } from "./drawable.object.class.js";

export class MovableObject extends DrawableObject {
  position = { x: 200, y: 100 };
  height = 100;
  width = 100;
  maxHp = 100;
  offset = { x: 0, y: 0, height: 0, width: 0 };
  movingInterval;
  otherDirection = false;
  stopAnimation = false;
  animationInterval;
  lastHit = 0;

  moveRight(step = 10) {
    this.position.x += step;
  }

  moveLeft(step = 10) {
    this.position.x -= step;
  }

  autoMoveLeft(speed = 1000 / 60, step = 1) {
    this.movingInterval = setInterval(() => {
      this.position.x -= step;
    }, speed);
  }

  drawCollisionRectOuter(ctx) {
    // if (this instanceof Character || this instanceof Enemy) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    // }
  }

  drawCollisionRect(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      this.width + this.offset.width,
      this.height + this.offset.height
    );
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  isColliding(obj) {
    return (
      this.position.x + this.offset.x + this.width + this.offset.width >=
        obj.position.x + obj.offset.x &&
      this.position.x + this.offset.x <=
        obj.position.x + obj.offset.x + obj.width + obj.offset.width &&
      this.position.y + this.offset.y + this.height + this.offset.height >=
        obj.position.y + obj.offset.y &&
      this.position.y + this.offset.y <=
        obj.position.y + obj.offset.y + obj.height + obj.offset.height
    );
    // obj.onCollisionCourse;
  }

  hit(damage) {
    this.hp -= damage;
    if (this.hp < 0) {
      this.hp = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed / 1000 < 1;
  }

  isDead() {
    return this.hp == 0;
  }
}
