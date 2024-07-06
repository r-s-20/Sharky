class MovableObject extends DrawableObject {
  x = 200;
  y = 100;
  height = 100;
  width = 100;
  hp = 100;
  movingInterval;
  otherDirection = false;
  stopAnimation = false;
  animationInterval;
  lastHit = 0;

  moveRight(step = 10) {
    this.x += step;
  }

  moveLeft(speed = 1000 / 60, step = 1) {
    this.movingInterval = setInterval(() => {
      this.x -= step;
    }, speed);
  }

  drawCollisionRectOuter(ctx) {
    // if (this instanceof Character || this instanceof Enemy) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    // }
  }

  isColliding(obj) {
    return (
      this.x + this.offsetX + this.width + this.offsetWidth >= obj.x + obj.offsetX &&
      this.x + this.offsetX <= obj.x + obj.offsetX + obj.width + obj.offsetWidth &&
      this.y + this.offsetY + this.height + this.offsetHeight >= obj.y + obj.offsetY &&
      this.y + this.offsetY <= obj.y + obj.offsetY + obj.height + obj.offsetHeight
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
