class MovableObject {
  x = 200;
  y = 100;
  height = 100;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  movingInterval;
  otherDirection = false;
  stopAnimation = false;
  animationInterval;

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
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  // drawCollisionRectChar(mo) {
  //   this.ctx.beginPath();
  //   this.ctx.rect(mo.x + 38, mo.y + 95, mo.width - 75, mo.height - 137);
  //   this.ctx.strokeStyle = "red";
  //   this.ctx.stroke();
  // }
}
