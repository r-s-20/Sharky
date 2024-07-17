import { MovableObject } from "./movable.object.class.js";

export class Endboss extends MovableObject {
  width = 350;
  height = 350;
  hp = 25;
  score = 50;
  position = { x: 1400, y: -300 };
  offset = { x: 12, y: 150, height: -200, width: -30 };
  hasEntered = false;
  character;
  speedX = 5;
  audio;

  IMAGES = { INTRO: [], FLOAT: [], ATTACK: [], HURT: [], DEAD: [] };

  state = {
    INTRO: "INTRO",
    FLOAT: "FLOAT",
    ATTACK: "ATTACK",
    HURT: "HURT",
    DEAD: "DEAD",
  };

  animationSpeed = {
    "INTRO": 1000 / 30,
    "FLOAT": 1000 / 4,
    "ATTACK": 1000 / 4,
    "HURT": 1000 / 4,
    "DEAD": 1000 / 15,
  };

  constructor(hp=25, positionX=1400) {
    super();
    this.loadImagePaths(this.IMAGES.INTRO, 10, "img/2.Enemy/3 Final Enemy/1.Introduce/");
    this.loadImagePaths(this.IMAGES.FLOAT, 13, "img/2.Enemy/3 Final Enemy/2.floating/");
    this.loadImagePaths(this.IMAGES.ATTACK, 6, "img/2.Enemy/3 Final Enemy/Attack/");
    this.loadImagePaths(this.IMAGES.HURT, 4, "img/2.Enemy/3 Final Enemy/Hurt/");
    this.loadImagePaths(this.IMAGES.DEAD, 6, "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2_");

    this.loadImagesToCache();

    this.loadImage(this.IMAGES.INTRO[0]);
    this.state = "";
    this.animate();
    this.hp = hp;
    this.position.x=positionX;
  }

  animate() {
    if (this.state == "FLOAT") {
      this.clearAllAnimationIntervals();
      let gameFrame = 0;
      let floatInterval = setInterval(() => {
        this.update();
        if (this.isHurt() && !this.isDead()) {
          this.state = "HURT";
          this.playHurtAnimation();
        }
        if (this.state !== "FLOAT") {
          clearInterval(floatInterval);
        }
        if (gameFrame % 10 == 0) {
          this.playAnimation(this.IMAGES.FLOAT);
        }
        gameFrame++;
        if (!this.character.isDead() && !this.isDead()) {
          if (this.getPlayerDistance >= 200) {
            this.otherDirection = false;
          } else if (this.getPlayerDistance() < 300 && this.getPlayerDistance() > 0) {
            this.otherDirection = false;
            this.state = "ATTACK";
            this.playAttackAnimation();
          }
          if (this.getPlayerDistance() < -50) {
            this.otherDirection = true;
            if (this.getPlayerDistance() > -350) {
              this.state = "ATTACK";
              this.playAttackAnimation();
            }
          }
        }
      }, 1000 / 60);
      this.animationIntervals.push(floatInterval);
    }
  }

  update() {
    if (this.isDead() && this.state != "DEAD") {
      this.state = "DEAD";
      this.clearAllAnimationIntervals();
      this.playSingleAnimation(this.IMAGES[this.state], this.animationSpeed[this.state]);
    }
    if (this.state != "ATTACK") {
      this.audio.effects.bossAttack.pause();
    }
  }

  introAnimation() {
    this.hasEntered = true;
    this.state = "INTRO";
    this.audio.effects.entryEndboss.play();
    this.playSingleAnimation(this.IMAGES[this.state], this.animationSpeed[this.state]);
    setTimeout(() => {
      this.state = "FLOAT";
      this.animate();
    }, 500);
  }

  getPlayerDistance() {
    return this.position.x - this.character.position.x;
  }

  playAttackAnimation() {
    if (this.hasEntered) {
      this.audio.effects.bossAttack.play();
    }
    this.clearAllAnimationIntervals();
    this.playSingleAnimation(this.IMAGES.ATTACK, 1000 / 10, "ATTACK");
    let counter = 0;
    let movementInterval = setInterval(() => {
      if (counter >= 8) {
        this.audio.effects.bossAttack.pause();
        clearInterval(movementInterval);
        this.state = "FLOAT";
        this.animate();
      }
      if (this.otherDirection) this.moveRight(this.speedX);
      else this.moveLeft(this.speedX);
      counter++;
    }, 100);
    this.animationIntervals.push(movementInterval);
  }

  playHurtAnimation() {
    if (!this.isDead()) {
      this.clearAllAnimationIntervals();
      this.playSingleAnimation(this.IMAGES.HURT, 1000 / 15, "HURT");
      setTimeout(() => {
        this.state = "FLOAT";
        this.animate();
      }, 400);
    }
  }
}
