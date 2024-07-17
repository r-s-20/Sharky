import { MovableObject } from "./movable.object.class.js";

/**
 * Light is an Object in background that will slowly and constantly move left 
 * as long as game is running
 *
 * @export
 * @class Light
 * @extends {MovableObject}
 */
export class Light extends MovableObject {
  width = 1200;
  height = 480;
  position = { x: 200, y: 0 };

  constructor() {
    super()
    this.loadImage("img/3. Background/Layers/1. Light/1.png");
    this.animate();
  }

  animate() {
    this.autoMoveLeft(1000 / 60, 0.15);
  }
}
