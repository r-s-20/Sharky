export class DrawableObject {
  position = { x: 10, y: 10 };
  width = 100;
  height = 100;
  img;
  imageCache = {};
  currentImage = 0;
  animationIntervals = [];


  /**
   * @param {url} path - url of image to be loaded
   * @memberof DrawableObject
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Stores all png image paths from a folder into an array based on last number of images.
   * Count of images needs to be provided. Requires continuous numbering of images starting at 1.
   *
   * @param {array} array - array that should contain all images
   * @param {number} count - count of images to be read from folder
   * @param {url} path - base url of images. Number and format have to be omitted. (e.g. if
   * relative path for first image is "myPath/swim1.png", use "myPath/swim" here)
   * @memberof DrawableObject
   */
  loadImagePaths(array, count, path) {
    for (let i = 1; i < count + 1; i++) {
      array.push(`${path}${i}.png`);
    }
  }

  /**
   * Loads all images from an array that contains image-urls.
   * @param {array} arr - an array containing image paths
   * @memberof DrawableObject
   */
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

  /**
   * Next step in an animation.
   * Finds the next image in an IMAGES array of an object based on 
   * current Position and exchanges the object.img.
   * @param {array} IMAGES - an array containing all images of an animation
   * @memberof DrawableObject
   */
  playAnimation(IMAGES) {
    let i = this.currentImage % IMAGES.length;
    let path = IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Plays animations that should only run once, like death or attack-animations.
   * Clears all existing animation intervals first.
   * If an object state is provided, animation will stop if that state is left.
   *
   * @param {array} IMAGES - an array containing all
   * @param {number} speed - interval speed for animation in milliseconds
   * @param {string} [state="none"] - optional; if provided, animation stops if state becomes false
   * @memberof DrawableObject
   */
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


  /**
   * Some objects have animation intervals stored in an array (like swim animations of enemies).
   * This function clears all of them.
   * @memberof DrawableObject
   */
  clearAllAnimationIntervals() {
    this.animationIntervals.forEach((interval) => clearInterval(interval));
  }
}
