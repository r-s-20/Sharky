import { MovableObject } from "./movable.object.class.js";

export class Enemy extends MovableObject {
  width = 50;
  height = 50;
  position = {x: 0, y: 0};
  offset = {x: 0, y: 0, height: -10, width: 0};
  IMAGES_SWIM = [];
  swimSpeed;

  constructor() {
    super().loadImage("./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
    this.position.x = 200 + Math.random() * 480;
    this.position.y = Math.random() * 350;
    this.loadImagePaths(
      this.IMAGES_SWIM,
      5,
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim"
    );
    this.loadImages(this.IMAGES_SWIM);
    this.animate();
    this.swimSpeed = 0.5 + Math.random();
  }

  animate() {
    this.swimLeft();
  }

  swimLeft() {
    this.moveLeft(1000 / 15, this.swimSpeed);
    setInterval(() => this.playAnimation(this.IMAGES_SWIM), 1000 / 15);
  }

  drawCollisionRectInner(ctx) {
    ctx.beginPath();
    ctx.rect(this.position.x + this.offsetX, this.position.y + this.offsetY, this.width + this.offsetWidth, this.height + this.offsetHeight);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
}
