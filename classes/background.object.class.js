import { MovableObject } from "./movable.object.class.js";

export class BackgroundObject extends MovableObject {
  height = 480;
  width = 720;
  
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.position.x = x;
    this.position.y = 0;
  }
}
