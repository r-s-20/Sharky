import { MovableObject } from "./movable.object.class.js";

export class BackgroundObject extends MovableObject {
  height = CANVAS_HEIGHT;
  width = CANVAS_WIDTH;
  
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.position.x = x;
    this.position.y = 0;
  }
}
