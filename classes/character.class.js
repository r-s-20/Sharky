import { MovableObject } from "./movable.object.class.js";

export class Character extends MovableObject {
  height = 200;
  width = 200;
  position = {x: 50,y: 50}
  speedY = 0;
  speedX = 5;
  offset = {x: 38, y: 95, height: -137, width: -75};
  acceleration = 0.1;
  IMAGES_IDLE = [];
  IMAGES_SWIM = [];
  IMAGES_DEAD_POISON = [];
  IMAGES_HURT_POISON = [];
  otherDirection = false;
  currentAnimationInterval;
  level;
  world;
  states = ["IDLING", "SWIMMING", "HURT_POISON", "HURT_SHOCK", "ATTACK", "SLEEP", "DEAD"];
  state = {
    IDLING: 1,
    SWIMMING: 2,
    HURT_POISON: 3,
    HURT_SHOCK: 4,
    ATTACK: 5,
    SLEEP: 6,
    DEAD: 7,
  };
  currentState = this.state.IDLING;
  maxHp = 150;
  maxCoins = 5;
  coins = 0;
  maxBubbles=10;
  bubbles = 5;
  swimming = false;
  woosh_sound = new Audio("./audio/Arm Whoosh A.ogg");
  splash_sound = new Audio("./audio/water_splashing_short.ogg");
  hit_sound = new Audio("./audio/hit11.mp3.flac");

  constructor(world) {
    super();
    this.world = world;
    this.hp = this.maxHp;
    this.loadImagePaths(this.IMAGES_IDLE, 18, "img/1.Sharkie/1.IDLE/");
    this.loadImagePaths(this.IMAGES_SWIM, 6, "img/1.Sharkie/3.Swim/");
    this.loadImagePaths(
      this.IMAGES_DEAD_POISON,
      12,
      "./img/1.Sharkie/6.dead/1.Poisoned/"
    );
    this.loadImagePaths(this.IMAGES_HURT_POISON, 4, "img/1.Sharkie/5.Hurt/1.Poisoned/");

    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD_POISON);
    this.loadImages(this.IMAGES_HURT_POISON);

    this.loadImage(this.IMAGES_IDLE[0]);
    this.animate();
    this.level = this.world.level;
  }

  animate() {
    this.applyGravity();
    if (this.isDead()) {
      this.currentState = this.state.DEAD;
      this.position.y = 100;
    }

    setInterval(() => {
      if (!this.isDead()) {
        if (this.isHurt()) {
          // console.log("has a recent hit");
          this.currentState = this.state.HURT_POISON;
          // this.hit_sound.play();
        }
        if (keyboard.RIGHT && this.position.x < this.level.level_end_x) {
          this.otherDirection = false;
          this.position.x += this.speedX;
          if (this.state != this.state.HURT_POISON) {
            this.currentState = this.state.SWIMMING;
          }
        } else if (keyboard.LEFT && this.position.x > -50) {
          this.otherDirection = true;
          this.position.x -= this.speedX;
          if (this.state != this.state.HURT_POISON) {
            this.currentState = this.state.SWIMMING;
          }
        } else {
          if (!this.isHurt()) {
            this.currentState = this.state.IDLING;
          }
        }
        if (keyboard.UP) {
          this.jump();
        } else if (keyboard.DOWN) {
          this.speedY = -3;
        }
      }
    }, 1000 / 60);

    let gameFrame = 0;
    setInterval(() => {
      this.splash_sound.pause();
      this.splash_sound.loop = true;
      gameFrame++;
      if (!this.isDead()) {
        if (this.isHurt()) {
          this.hurt();
        } else if (this.currentState == this.state.SWIMMING) {
          this.swim(gameFrame);
        } else if (this.currentState == this.state.IDLING) {
          this.idle(gameFrame);
        }
      }
    }, 1000 / 60);
  }

  idle(gameFrame) {
    if (gameFrame % 4 == 0) {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  swim(gameFrame) {
    // this.splash_sound.play();
    if (gameFrame % 6 == 0 && this.currentState == this.state.SWIMMING) {
      this.playAnimation(this.IMAGES_SWIM);
    }
  }

  applyGravity() {
    setInterval(() => {
      if (!this.isDead() && (this.isAboveGround() || this.speedY > 0)) {
        this.position.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.position.y <= -100) this.position.y = -100;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.position.y < 250;
  }

  stopAnimation() {
    clearInterval(this.animationInterval);
  }

  jump() {
    this.speedY = 3;
  }

  hurt(IMAGES = this.IMAGES_HURT_POISON) {
    this.currentImage = 0;
    let counter = 0;
    let hurtInterval = setInterval(() => {
      this.currentState = this.state.HURT_POISON;
      if (!this.isDead()) {
        if (!this.isHurt()) {
          clearInterval(hurtInterval);
        }
        this.playAnimation(IMAGES);
        counter++;
      }
    }, 1000 / 30);
    this.currentState = this.state.IDLING;
  }

  playDeathAnimation() {
    // console.log("playing Death");
    this.currentImage = 0;
    let counter = 0;
    let deathInterval = setInterval(() => {
      if (counter >= this.IMAGES_DEAD_POISON.length - 1) {
        clearInterval(deathInterval);
      }
      this.playAnimation(this.IMAGES_DEAD_POISON);
      counter++;
      // console.log(counter);
    }, 1000 / 30);
  }
}
