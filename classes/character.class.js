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
  soundsMuted = false;

  IMAGES = {
    IDLE: [],
    SWIM: [],
    HURT_POISON: [],
    // HURT_SHOCK: [],
    ATTACK: [],
    ATTACK_BUBBLE: [],
    SLEEP: [],
    DEAD: [],
  };

  state = {
    IDLE: "IDLE",
    SWIM: "SWIM",
    HURT_POISON: "HURT_POISON",
    // HURT_SHOCK: "HURT_SHOCK",
    ATTACK: "ATTACK",
    ATTACK_BUBBLE: "ATTACK_BUBBLE",
    SLEEP: "SLEEP",
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
  // wooshSound = new Audio("audio/Arm Whoosh A.ogg");
  // splashSound = new Audio("audio/water_splashing_short.ogg");
  // hitSound = new Audio("audio/hit11_short.ogg");
  // soundEffects = {
  //   splash: this.splashSound,
  //   hit: this.hitSound,
  //   woosh: this.wooshSound,
  // };
  level;

  constructor(world) {
    super();
    this.world = world;
    this.loadImagePaths(this.IMAGES.IDLE, 18, "img/1.Sharkie/1.IDLE/");
    this.loadImagePaths(this.IMAGES.SWIM, 6, "img/1.Sharkie/3.Swim/");
    this.loadImagePaths(this.IMAGES.DEAD, 12, "img/1.Sharkie/6.dead/1.Poisoned/");
    this.loadImagePaths(this.IMAGES.HURT_POISON, 4, "img/1.Sharkie/5.Hurt/1.Poisoned/");
    this.loadImagePaths(this.IMAGES.ATTACK_BUBBLE, 7, "img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/");
    this.loadImagePaths(this.IMAGES.ATTACK, 8, "img/1.Sharkie/4.Attack/Fin slap/");
    this.loadImagePaths(this.IMAGES.SLEEP, 14, "img/1.Sharkie/2.Long_IDLE/");

    this.loadImagesToCache();

    this.loadImage(this.IMAGES.IDLE[0]);
    this.animate();
    this.audio = world.audio;
    // this.level = this.world.level;
  }

  reset() {
    this.hp = this.maxHp;
    this.coins = 0;
    this.bubbles = 1;
    this.currentState = this.state.IDLE;
    this.position = { x: 50, y: 50 };
    this.speedY = 0;
    this.speedX = 5;
    this.otherDirection = false;
  }

  animate() {
    this.applyGravity();
    if (this.isDead()) {
      this.currentState = "DEAD";
      this.position.y = 100;
    }

    this.update();
    let gameFrame = 0;
    setInterval(() => {
      gameFrame++;
      this.handleAnimations(gameFrame);
    }, 1000 / 60);
  }

  update() {
    let updateInterval = setInterval(() => {
      this.audio.effects.splash.pause();
      if (this.world.gameState == "GAMEOVER") {
        // clearInterval(updateInterval);
      } else {
        if (this.currentState == this.state.IDLE) {
          this.checkState();
        } else if (this.currentState == this.state.SWIM) {
          this.handleSwimmingState();
        } else if (this.currentState == this.state.HURT_POISON) {
          this.handleHurtState();
        } else if ((this.currentState == this.state.ATTACK) | (this.currentState == this.state.ATTACK_BUBBLE)) {
          if (!this.attackRunning) {
            this.checkState();
          }
        }
      }
    }, 1000 / 60);
  }

  checkState() {
    if (this.isHurt()) {
      this.currentState = this.state.HURT_POISON;
    } else if (keyboard.SHOOT) {
      this.currentState = this.state.ATTACK_BUBBLE;
    } else if (keyboard.FINSLAP) {
      this.currentState = this.state.ATTACK;
    } else if (keyboard.RIGHT || keyboard.LEFT || keyboard.UP || keyboard.DOWN) {
      this.currentState = this.state.SWIM;
    } else this.currentState = this.state.IDLE;
  }

  checkMovementInputs() {
    if (keyboard.RIGHT) {
      this.movementRight();
    } else if (keyboard.LEFT) {
      this.movementLeft();
    }
    if (keyboard.UP) {
      this.jump();
    } else if (keyboard.DOWN) {
      this.jump(-1);
    }
  }

  handleSwimmingState() {
    this.audio.effects.splash.play();
    this.checkMovementInputs();
    this.checkState();
  }

  handleHurtState() {
    if (!this.isHurt()) {
      this.audio.effects.hitChar.pause();
      this.checkState();
    } else {
      this.audio.effects.hitChar.play();
      this.checkMovementInputs();
    }
  }

  handleAnimations(gameFrame) {
    // console.log("current state seen in animations", this.currentState);
    if (!this.isDead()) {
      if (this.currentState == this.state.HURT_POISON) {
        this.hurt();
      } else if (this.currentState == this.state.ATTACK_BUBBLE) {
        this.bubbleAttack();
      } else if (this.currentState == this.state.ATTACK) {
        this.finslapAttack();
      } else if (this.currentState == this.state.SWIM) {
        this.swim(gameFrame);
      } else if (this.currentState == this.state.IDLE) {
        this.idle(gameFrame);
      }
    }
  }

  movementRight() {
    this.otherDirection = false;
    if (this.position.x < this.world.level.level_end_x) this.position.x += this.speedX;
  }

  movementLeft() {
    this.otherDirection = true;
    if (this.position.x > -50) this.position.x -= this.speedX;
  }

  idle(gameFrame) {
    if (gameFrame % 4 == 0) {
      this.playAnimation(this.IMAGES.IDLE);
    }
  }

  swim(gameFrame) {
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

  finslapAttack() {
    if (!this.attackRunning && !this.isHurt()) {
      this.audio.effects.woosh.play();
      this.offset.width = -40;
      this.attackRunning = true;
      this.playSingleAnimation(this.IMAGES.ATTACK, 1000 / 15);
      setTimeout(() => {
        this.offset.width = -75;
        this.audio.effects.woosh.pause();
        this.currentState = this.state.IDLE;
      }, 700);
      setTimeout(() => {
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
