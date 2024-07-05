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

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight(step = 10) {
    this.x += step;
  }

  moveLeft(speed=1000/60, step = 1) {
    this.movingInterval = setInterval(() => {
    this.x -= step;
  }, speed
  )
  }

  loadImagePaths(array, count, path) {
    for (let i = 1; i < count+1; i++) {
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

  playAnimation(IMAGES, speed) {
    let intervalId = setInterval(() => {
      let i = this.currentImage % IMAGES.length;
      let path = IMAGES[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, speed);
  }

}
