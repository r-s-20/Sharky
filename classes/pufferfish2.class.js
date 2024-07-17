import { Enemy } from "./enemy.class.js";

/**
 * An enemy similar to standard Enemy, but with different animation and color
 *
 * @export
 * @class Pufferfish2
 * @extends {Enemy}
 */
export class Pufferfish2 extends Enemy {
  IMAGES = {
    SWIM: [],
    TRANSITION: [],
    BUBBLESWIM: [],
    DEAD: [],
  };

  constructor(areaX) {
    super(areaX);
    this.loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
    this.position.y = Math.random() * 350;
    this.IMAGES;
    this.loadImagePaths(this.IMAGES.SWIM, 5, "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim");
    this.loadImagePaths(
      this.IMAGES.TRANSITION,
      5,
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition"
    );
    this.loadImagePaths(
      this.IMAGES.BUBBLESWIM,
      5,
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim"
    );
    this.loadImagePaths(this.IMAGES.DEAD, 3, "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.");

    this.loadImagesToCache();

    this.cycleLimit = 35 + Math.random() * 20;
  }

  /**
   * Starts the animation and movement for Pufferfish2
   *
   * @memberof Pufferfish2
   */
  animate() {
    this.swimLeftCycle();
  }


  /**
   * Will swim left for a given number of interval cycles,
   * then ends and changes to swim right.
   *
   * @memberof Pufferfish2
   */
  swimLeftCycle() {
    this.otherDirection = false;
    let counter = 0;
    let animationInterval = setInterval(() => {
      if (counter > this.cycleLimit) {
        clearInterval(animationInterval);
        this.swimRightCycle();
      }
      this.playAnimation(this.IMAGES.SWIM);
      this.moveLeft(this.swimSpeed);
      counter++;
    }, 1000 / 20);
    this.animationIntervals.push(animationInterval);
  }

  /**
   * Activates swimming right for a given number of interval cycles,
   * then ends and changes to swim left.
   *
   * @memberof Pufferfish2
   */
  swimRightCycle() {
    this.otherDirection = true;
    let counter = 0;
    let animationInterval = setInterval(() => {
      if (counter > this.cycleLimit) {
        clearInterval(animationInterval);
        this.swimLeftCycle();
      }
      this.playAnimation(this.IMAGES.SWIM);
      this.moveRight(this.swimSpeed);
      counter++;
    }, 1000 / 20);
    this.animationIntervals.push(animationInterval);
  }
}
