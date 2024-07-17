import { DrawableObject } from "./drawable.object.class.js";

export class StatusSymbol extends DrawableObject {
  position = { x: 0, y: 20 };
  width = 55;
  height = 55;

  /**
   * Creates an instance of StatusSymbol.
   * @param {url} path - url to be used as src for image of statusSymbol
   * @param {number} positionX - position on x-axis 
   * @param {number} positionY - position on y-axis
   * @memberof StatusSymbol
   */
  constructor(path, positionX, positionY) {
    super();
    this.loadImage(path);
    this.position.x = positionX;
    this.position.y = positionY;
  }
}
