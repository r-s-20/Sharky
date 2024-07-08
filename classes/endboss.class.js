import { MovableObject } from "./movable.object.class.js";

export class Endboss extends MovableObject {
  width = 350;
  height = 350;
  position = {x: 1500, y: 20 };
  offset = {x: 12, y: 110, height: -160, width: -30};
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


}
