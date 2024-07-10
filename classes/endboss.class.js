import { MovableObject } from "./movable.object.class.js";

export class Endboss extends MovableObject {
  width = 350;
  height = 350;
  hp = 10;
  position = { x: 500, y: 20 };
  offset = { x: 12, y: 150, height: -200, width: -30 };
  

  IMAGES_INTRO = [];
  IMAGES_FLOAT = [];
  IMAGES_ATTACK = [];
  IMAGES_HURT = [];
  IMAGES_DEAD = [];

  state = {
    INTRO: "INTRO",
    FLOATING: "FLOATING",
    ATTACK: "ATTACK",
    HURT: "HURT",
    DEAD: "DEAD",
  };

  stateImages = {
    "INTRO": this.IMAGES_INTRO,
    "FLOATING": this.IMAGES_FLOAT,
    "ATTACK": this.IMAGES_ATTACK,
    "HURT": this.IMAGES_HURT,
    "DEAD": this.IMAGES_DEAD,
  };

  animationSpeed = {
    "INTRO": 1000 / 4,
    "FLOATING": 1000 / 4,
    "ATTACK": 1000 / 4,
    "HURT": 1000 / 4,
    "DEAD": 1000 / 15,
  };

  constructor() {
    super();
    this.state = "FLOATING";
    this.loadImagePaths(
      this.IMAGES_INTRO,
      10,
      "../img/2.Enemy/3 Final Enemy/1.Introduce/"
    );
    this.loadImages(this.IMAGES_INTRO);
    this.loadImagePaths(
      this.IMAGES_FLOAT,
      13,
      "../img/2.Enemy/3 Final Enemy/2.floating/"
    );
    this.loadImages(this.IMAGES_FLOAT);
    this.loadImagePaths(this.IMAGES_ATTACK, 6, "../img/2.Enemy/3 Final Enemy/Attack/");
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImagePaths(this.IMAGES_HURT, 4, "../img/2.Enemy/3 Final Enemy/Hurt/");
    this.loadImages(this.IMAGES_HURT);
    this.loadImagePaths(
      this.IMAGES_DEAD,
      6,
      "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2_"
    );
    this.loadImages(this.IMAGES_DEAD);

    this.loadImage(this.IMAGES_FLOAT[0]);
    this.animate();
  }

  animate() {
    let floatInterval = setInterval(() => {
      if (this.state !== "FLOATING") {
        clearInterval(floatInterval);
      }
      this.playAnimation(this.IMAGES_FLOAT);
    }, 1000 / 4);
    this.animationIntervals.push(floatInterval);
  }

  update() {
    if (this.isDead() && this.state != "DEAD") {
      this.state = "DEAD";
      this.playDeathAnimation(this.IMAGES_DEAD, 1000/12);
    }
  }

  playAnimationLoop(state) {}

  playDeathAnimation(IMAGES, speed) {
    // console.log("playing Death");
    this.clearAllAnimationIntervals();
    this.currentImage = 0;
    let counter = 0;
    let deathInterval = setInterval(() => {
      if (counter >= IMAGES.length - 1) {
        clearInterval(deathInterval);
      }
      this.playAnimation(IMAGES);
      counter++;
    }, speed);
  }

  
}
