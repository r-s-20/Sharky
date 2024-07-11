export class DrawableObject {
  position = { x: 10, y: 10 };
  width = 100;
  height = 100;
  img;
  imageCache = {};
  currentImage = 0;
  animationIntervals = [];

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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

  draw(ctx) {
    ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
  }

  playAnimation(IMAGES) {
    let i = this.currentImage % IMAGES.length;
    let path = IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playSingleAnimation(IMAGES, speed, state = "none") {
    this.clearAllAnimationIntervals();
    this.currentImage = 0;
    let counter = 0;
    let animationInterval = setInterval(() => {
      if (counter >= IMAGES.length - 1 || (state != "none" && this.state != state)) {
        clearInterval(animationInterval);
      }
      this.playAnimation(IMAGES);
      counter++;
    }, speed);
    this.animationIntervals.push(animationInterval);
  }

  clearAllAnimationIntervals() {
    this.animationIntervals.forEach((interval) => clearInterval(interval));
  }
}
