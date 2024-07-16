import { DrawableObject } from "./drawable.object.class.js";

export class StatusSymbol extends DrawableObject {
  position = { x: 0, y: 20 };
  width = 55;
  height = 55;

  constructor(path, positionX, positionY) {
    super();
    this.loadImage(path);
    this.position.x = positionX;
    this.position.y = positionY;
  }
}
