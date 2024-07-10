import { MovableObject } from "./movable.object.class.js";

export class Endboss extends MovableObject {
  width = 350;
  height = 350;
  hp = 30;
  position = { x: 1300, y: 20 };
  offset = { x: 12, y: 150, height: -200, width: -30 };

  IMAGES = { INTRO: [], FLOAT: [], ATTACK: [], HURT: [], DEAD: [] };

  state = {
    INTRO: "INTRO",
    FLOAT: "FLOAT",
    ATTACK: "ATTACK",
    HURT: "HURT",
    DEAD: "DEAD",
  };

  animationSpeed = {
    "INTRO": 1000 / 4,
    "FLOAT": 1000 / 4,
    "ATTACK": 1000 / 4,
    "HURT": 1000 / 4,
    "DEAD": 1000 / 15,
  };

  constructor() {
    super();
    

    this.loadImagePaths(
      this.IMAGES.INTRO,
      10,
      "../img/2.Enemy/3 Final Enemy/1.Introduce/"
    );
    this.loadImagePaths(
      this.IMAGES.FLOAT,
      13,
      "../img/2.Enemy/3 Final Enemy/2.floating/"
    );
    this.loadImagePaths(this.IMAGES.ATTACK, 6, "../img/2.Enemy/3 Final Enemy/Attack/");
    this.loadImagePaths(this.IMAGES.HURT, 4, "../img/2.Enemy/3 Final Enemy/Hurt/");
    this.loadImagePaths(
      this.IMAGES.DEAD,
      6,
      "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2_"
    );

    this.loadImagesToCache();

    this.loadImage(this.IMAGES.FLOAT[0]);
    this.state = "FLOAT";
    this.animate();
  }

  animate() {
    let floatInterval = setInterval(() => {
      if (this.state !== "FLOAT") {
        clearInterval(floatInterval);
      }
      this.playAnimation(this.IMAGES.FLOAT);
    }, 1000 / 4);
    this.animationIntervals.push(floatInterval);
  }

  update() {
    if (this.isDead() && this.state != "DEAD") {
      this.state = "DEAD";
      this.playSingleAnimation(this.IMAGES[this.state], this.animationSpeed[this.state]);
    }
  }

  playAnimationLoop(state) {}
}
