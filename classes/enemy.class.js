class Enemy extends MovableObject {
  width = 50;
  height = 50;
  IMAGES_SWIM = [];
  

  constructor() {
    super().loadImage("./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
    this.y = Math.random() * 350;
    this.x = 200 + Math.random() * 480;
    this.loadImagePaths(
      this.IMAGES_SWIM,
      5,
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim"
    );
    this.loadImages(this.IMAGES_SWIM);
    this.animate();
  }

  animate() {
    this.swimLeft();
  }

  swimLeft() {
    this.moveLeft(1000 / 15, 1);
    this.playAnimation(this.IMAGES_SWIM, 1000/15);
    // let intervalId = setInterval(() => {
    //   let i = this.currentImage % this.IMAGES_SWIM.length;
    //   let path = this.IMAGES_SWIM[i];
    //   this.img = this.imageCache[path];
    //   this.currentImage++;
    // }, 1000 / 15);
  }
}
