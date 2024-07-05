class MovableObject {
  x = 200;
  y = 100;
  height = 100;
  width = 100;
  hp = 100;
  img;
  imageCache = {};
  currentImage = 0;
  movingInterval;
  otherDirection = false;
  stopAnimation = false;
  animationInterval;
  lastHit = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight(step = 10) {
    this.x += step;
  }

  moveLeft(speed = 1000 / 60, step = 1) {
    this.movingInterval = setInterval(() => {
      this.x -= step;
    }, speed);
  }

  loadImagePaths(array, count, path) {
    for (let i = 1; i < count + 1; i++) {
      array.push(`${path}${i}.png`);
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(IMAGES) {
    let i = this.currentImage % IMAGES.length;
    let path = IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    this.animationRunning = true;
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
    return (timePassed/1000) < 2;
  }

  isDead() {
    return this.hp == 0;
  }
}
