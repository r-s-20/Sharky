class Endboss extends MovableObject {
  width = 350;
  height = 350;
  x = 600;
   y=20;
  IMAGES_SWIM = [];

  constructor() {
    super();

    this.loadImagePaths(this.IMAGES_SWIM, 13, "img/2.Enemy/3 Final Enemy/2.floating/");
    this.loadImage(this.IMAGES_SWIM[0]);
    this.loadImages(this.IMAGES_SWIM);
    this.animate();
  }

  animate() {
    this.playAnimation(this.IMAGES_SWIM, 1000/4);
  }

}
