import { MovableObject } from "./movable.object.class.js";

export class Endboss extends MovableObject {
  width = 350;
  height = 350;
  x = 1500;
  y = 20;
  offsetX = 12;
  offsetY = 110;
  offsetHeight = -160;
  offsetWidth = -30;
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
    ctx.rect(this.x + this.offsetX, this.y + this.offsetY, this.width + this.offsetWidth, this.height + this.offsetHeight);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
}
