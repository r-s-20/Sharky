import { MovableObject } from "./movable.object.class.js";

export class Character extends MovableObject {
  height = 200;
  width = 200;
  position = { x: 50, y: 50 };
  speedY = 0;
  speedX = 5;
  offset = { x: 38, y: 95, height: -137, width: -75 };
  acceleration = 0.1;
  otherDirection = false;
  level;
  world;
  attackRunning = false;

  IMAGES = {
    IDLE: [],
    SWIM: [],
    HURT_POISON: [],
    // HURT_SHOCK: [],
    // ATTACK: [],
    ATTACK_BUBBLE: [],
    // SLEEP: [],
    DEAD: [],
  };

  state = {
    IDLE: "IDLE",
    SWIM: "SWIM",
    HURT_POISON: "HURT_POISON",
    // HURT_SHOCK: "HURT_SHOCK",
    // ATTACK: "ATTACK",
    ATTACK_BUBBLE: "ATTACK_BUBBLE",
    // SLEEP: "SLEEP",
    DEAD: "DEAD",
  };

  currentState = this.state.IDLE;
  maxHp = 150;
  hp = 150;
  maxCoins = 5;
  coins = 0;
  maxBubbles = 7;
  bubbles = 1;
  swimming = false;
  woosh_sound = new Audio("../audio/Arm Whoosh A.ogg");
  splash_sound = new Audio("../audio/water_splashing_short.ogg");
  hit_sound = new Audio("../audio/hit11.mp3.flac");
  level;

  constructor(world) {
    super();
    this.world = world;
    this.loadImagePaths(this.IMAGES.IDLE, 18, "../img/1.Sharkie/1.IDLE/");
    this.loadImagePaths(this.IMAGES.SWIM, 6, "../img/1.Sharkie/3.Swim/");
    this.loadImagePaths(this.IMAGES.DEAD, 12, "../img/1.Sharkie/6.dead/1.Poisoned/");
    this.loadImagePaths(this.IMAGES.HURT_POISON, 4, "../img/1.Sharkie/5.Hurt/1.Poisoned/");
    this.loadImagePaths(this.IMAGES.ATTACK_BUBBLE, 7, "../img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/");

    this.loadImagesToCache();

    this.loadImage(this.IMAGES.IDLE[0]);
    this.animate();
    // this.level = this.world.level;
  }

  animate() {
    this.applyGravity();
    if (this.isDead()) {
      this.currentState = this.state.DEAD;
      this.position.y = 100;
    }

    setInterval(() => {
      if (this.world.gameState !== "GAMEOVER") {
        this.evaluateKeyboardInputs();
      }
    }, 1000 / 60);

    let gameFrame = 0;
    setInterval(() => {
      this.splash_sound.pause();
      this.splash_sound.loop = true;
      gameFrame++;
      if (!this.isDead()) {
        this.applyAnimations(gameFrame);
      }
    }, 1000 / 60);
  }

  evaluateKeyboardInputs() {
    if (this.isHurt()) {
      this.currentState = this.state.HURT_POISON;
      // this.hit_sound.play();
    } else if (keyboard.SHOOT && !this.attackRunning) {
      this.currentState = this.state.ATTACK_BUBBLE;
    }
    if (keyboard.RIGHT && this.position.x < this.world.level.level_end_x) {
      this.movementRight();
    } else if (keyboard.LEFT && this.position.x > -50) {
      this.movementLeft();
    } else {
      if (!this.isHurt() && this.currentState !== "ATTACK_BUBBLE") {
        this.currentState = this.state.IDLE;
      }
    }
    if (keyboard.UP) {
      this.jump();
      if (!this.isHurt() && this.currentState !== "ATTACK_BUBBLE") {
        this.currentState = this.state.SWIM;
      }
    } else if (keyboard.DOWN) {
      this.jump(-1);
      if (!this.isHurt() && this.currentState !== "ATTACK_BUBBLE") {
        this.currentState = this.state.SWIM;
      }
    }
  }

  applyAnimations(gameFrame) {
    if (this.isHurt()) {
      this.hurt();
    } else if (this.currentState == this.state.ATTACK_BUBBLE) {
      this.bubbleAttack();
    } else if (this.currentState == this.state.SWIM) {
      this.swim(gameFrame);
    } else if (this.currentState == this.state.IDLE) {
      this.idle(gameFrame);
    }
  }

  movementRight() {
    this.otherDirection = false;
    this.position.x += this.speedX;
    if (!this.isHurt() && this.currentState !== "ATTACK_BUBBLE") {
      this.currentState = this.state.SWIM;
    }
  }

  movementLeft() {
    this.otherDirection = true;
    this.position.x -= this.speedX;
    if (!this.isHurt() && this.currentState !== "ATTACK_BUBBLE") {
      this.currentState = this.state.SWIM;
    }
  }

  idle(gameFrame) {
    if (gameFrame % 4 == 0) {
      this.playAnimation(this.IMAGES.IDLE);
    }
  }

  swim(gameFrame) {
    // this.splash_sound.play();
    if (gameFrame % 6 == 0 && this.currentState == this.state.SWIM) {
      this.playAnimation(this.IMAGES.SWIM);
    }
  }

  bubbleAttack() {
    if (!this.attackRunning && !this.isHurt()) {
      this.attackRunning = true;
      this.playSingleAnimation(this.IMAGES.ATTACK_BUBBLE, 1000 / 15);
      setTimeout(() => {
        this.currentState = this.state.IDLE;
        this.attackRunning = false;
      }, 1000);
    }
  }

  applyGravity() {
    setInterval(() => {
      if (this.world.gameState !== "GAMEOVER" && (this.isAboveGround() || this.speedY > 0)) {
        this.position.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.position.y <= -100) this.position.y = -100;
      } else if (this.isDead()) {
        this.position.y -= 2;
        if (this.position.y <= -50) this.position.y = -50;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.position.y < 250;
  }

  stopAnimation() {
    clearInterval(this.animationInterval);
  }

  jump(dir = 1) {
    this.speedY = 4 * dir;
  }

  hurt(IMAGES = this.IMAGES.HURT_POISON) {
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
    this.currentState = this.state.IDLE;
  }

  playDeathAnimation() {
    // console.log("playing Death");
    this.currentImage = 0;
    let counter = 0;
    let deathInterval = setInterval(() => {
      if (counter >= this.IMAGES.DEAD.length - 1) {
        clearInterval(deathInterval);
      }
      this.playAnimation(this.IMAGES.DEAD);
      counter++;
      // console.log(counter);
    }, 1000 / 30);
  }
}
