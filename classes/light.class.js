import { MovableObject } from "./movable.object.class.js";

export class Light extends MovableObject {
  width = 1200;
  height = 480;
  position = { x: 200, y: 0 };

  constructor() {
    super().loadImage("img/3. Background/Layers/1. Light/1.png");
    this.animate();
  }

  animate() {
    this.autoMoveLeft(1000 / 60, 0.15);
    //   let intervalId = setInterval(() => {
    //     if (this.x <= -400) {
    //       clearInterval(intervalId);
    //     }
    //     this.moveLeft(0.15);
    //   }
    //     , 1000/60);
  }
}
