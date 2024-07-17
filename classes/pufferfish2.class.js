import { Enemy } from "./enemy.class.js";

export class Pufferfish2 extends Enemy {
  IMAGES = {
    SWIM: [],
    TRANSITION: [],
    BUBBLESWIM: [],
    DEAD: [],
  };

  constructor(areaX = 900) {
    super();
    this.loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
    this.position.x = 300 + Math.random() * areaX;
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

    // this.swimSpeed = 0.5 + Math.random();
    this.cycleLimit = 35 + Math.random() * 20;
  }

  animate() {
    this.swimLeftCycle();
  }

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
