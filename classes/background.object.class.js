import { MovableObject } from "./movable.object.class.js";

/**
 * Background object is used for background layers that should cover
 * the whole canvas. Needs an image path and x-position.
 *
 * @export
 * @class BackgroundObject
 * @extends {MovableObject}
 */
export class BackgroundObject extends MovableObject {
  height = CANVAS_HEIGHT;
  width = CANVAS_WIDTH;

  /**
   * Creates an instance of BackgroundObject.
   * @param {url} imagePath
   * @param {number} x
   * @memberof BackgroundObject
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.position.x = x;
    this.position.y = 0;
  }
}
