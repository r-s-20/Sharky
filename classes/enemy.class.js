import { MovableObject } from "./movable.object.class.js";

export class Enemy extends MovableObject {
  width = 50;
  height = 50;
  hp = 10;
  position = { x: 0, y: 0 };
  offset = { x: 0, y: 0, height: -10, width: 0 };
  IMAGES_SWIM = [];
  IMAGES_TRANSITION = [];
  IMAGES_BUBBLESWIM = [];
  IMAGES_DEAD = [];

  state = {
    SWIM: "SWIM",
    TRANSITION: "TRANSITION",
    BUBBLESWIM: "BUBBLESWIM",
    DEAD: "DEAD",
  };

  stateImages = {
    "SWIM": this.IMAGES_SWIM,
    "TRANSITION": this.IMAGES_TRANSITION,
    "BUBBLESWIM": this.IMAGES_BUBBLESWIM,
    "DEAD": this.IMAGES_DEAD,
  };

  animationSpeed = {
    "SWIM": 1000 / 4,
    "TRANSITION": 1000 / 4,
    "BUBBLESWIM": 1000 / 4,
    "DEAD": 1000 / 15,
  };

  swimSpeed;

  constructor() {
    super().loadImage(
      "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.position.x = 300 + Math.random() * 1000;
    this.position.y = Math.random() * 350;

    this.loadImagePaths(
      this.IMAGES_SWIM,
      5,
      "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim"
    );
    this.loadImages(this.IMAGES_SWIM);

    this.loadImagePaths(
      this.IMAGES_TRANSITION,
      5,
      "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition"
    );
    this.loadImages(this.IMAGES_TRANSITION);

    this.loadImagePaths(
      this.IMAGES_BUBBLESWIM,
      5,
      "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim"
    );
    this.loadImages(this.IMAGES_BUBBLESWIM);

    this.loadImagePaths(
      this.IMAGES_DEAD,
      3,
      "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1."
    );
    this.loadImages(this.IMAGES_DEAD);

    this.animate();
    this.swimSpeed = 0.5 + Math.random();
  }

  animate() {
    this.swimLeft();
  }

  update() {
    if (this.isDead() && this.state != "DEAD") {
      this.state = "DEAD";
      this.playSingleAnimation(
        this.stateImages[this.state],
        this.animationSpeed[this.state]
      );
    }
    // else if (this.state == "SWIM") {
    //   this.swimLeft();
    // }
  }

  swimLeft() {
    // this.autoMoveLeft(1000 / 15, this.swimSpeed);
    let animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SWIM);
      this.moveLeft(this.swimSpeed);
    }
      , 1000 / 15);
    this.animationIntervals.push(animationInterval);
  }

  drawCollisionRectInner(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.position.x + this.offsetX,
      this.position.y + this.offsetY,
      this.width + this.offsetWidth,
      this.height + this.offsetHeight
    );
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
}
