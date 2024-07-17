import { MovableObject } from "./movable.object.class.js";

export class Enemy extends MovableObject {
  width = 50;
  height = 50;
  hp = 3;
  score = 5;
  position = { x: 0, y: 0 };
  offset = { x: 0, y: 0, height: -10, width: 0 };
  IMAGES = {
    SWIM: [],
    TRANSITION: [],
    BUBBLESWIM: [],
    DEAD: [],
  };

  state = {
    SWIM: "SWIM",
    TRANSITION: "TRANSITION",
    BUBBLESWIM: "BUBBLESWIM",
    DEAD: "DEAD",
  };

  animationSpeed = {
    "SWIM": 1000 / 4,
    "TRANSITION": 1000 / 4,
    "BUBBLESWIM": 1000 / 4,
    "DEAD": 1000 / 15,
  };

  swimSpeed;

  /**
   * Creates an instance of Enemy.
   * @param {number} [areaX=1000] - end of area on x-axis where enemies will appear,
   * defult of 1000 is an area near player spawn place
   * @memberof Enemy
   */
  constructor(areaX = 1000) {
    super();
    this.loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
    this.position.x = 300 + Math.random() * areaX;
    this.position.y = Math.random() * 350;

    this.loadImagePaths(this.IMAGES.SWIM, 5, "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim");
    this.loadImagePaths(
      this.IMAGES.TRANSITION,
      5,
      "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition"
    );
    this.loadImagePaths(
      this.IMAGES.BUBBLESWIM,
      5,
      "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim"
    );
    this.loadImagePaths(this.IMAGES.DEAD, 3, "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.");

    this.loadImagesToCache();

    this.animate();
    this.swimSpeed = 0.5 + Math.random();
  }

  /**
   * Induces movement interval for enemy, in this case swimming left
   * @memberof Enemy
   */
  animate() {
    this.swimLeft();
  }

  /**
   * A function that can be called to induce dead state and death animation based
   * on .isDead()-status of Enemy
   *
   * @memberof Enemy
   */
  update() {
    if (this.isDead() && this.state != "DEAD") {
      this.state = "DEAD";
      this.playSingleAnimation(this.IMAGES[this.state], this.animationSpeed[this.state]);
      this.autoMoveUp();
    }
  }

  /**
   * Interval inducing Enemy movement and animation for swimming left
   * based on swimSpeed.
   * Is stored in animationIntervals and can be stopped by clearAllAnimations().
   *
   * @memberof Enemy
   */
  swimLeft() {
    let animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES.SWIM);
      this.moveLeft(this.swimSpeed);
    }, 1000 / 15);
    this.animationIntervals.push(animationInterval);
  }
}
