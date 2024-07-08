import { MovableObject } from "./movable.object.class.js";

export class BackgroundObject extends MovableObject {
  y = 0;
  height = 480;
  width = 720;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
  }
}
