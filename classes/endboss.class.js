class Endboss extends MovableObject {
  width = 350;
  height = 350;
  x = 300;
  y = 20;
  IMAGES_FLOAT = [];

  constructor() {
    super();

    this.loadImagePaths(this.IMAGES_FLOAT, 13, "img/2.Enemy/3 Final Enemy/2.floating/");
    this.loadImage(this.IMAGES_FLOAT[0]);
    this.loadImages(this.IMAGES_FLOAT);
    this.animate();
  }

  animate() {
    setInterval(() => this.playAnimation(this.IMAGES_FLOAT), 1000 / 4);
  }

  drawCollisionRectInner(ctx) {
    ctx.beginPath();
    ctx.rect(this.x+12, this.y+110, this.width-30, this.height - 160);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
}
