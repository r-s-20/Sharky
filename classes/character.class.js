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
  idleCounter = 0;

  IMAGES = {
    IDLE: [],
    SWIM: [],
    HURT_POISON: [],
    ATTACK: [],
    ATTACK_BUBBLE: [],
    SLEEP: [],
    DEAD: [],
  };

  state = {
    IDLE: "IDLE",
    SWIM: "SWIM",
    HURT_POISON: "HURT_POISON",
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
  level;

  /**
   * Creates an instance of Character.
   * Creates images for animatios and stores them into an ImageCache.
   * One image of idle state is set to start game with.
   * 
   * @param {World} world - the world object in which character is created;
   * allows interactions with other world objects and provides world audio
   * @memberof Character
   */
  constructor(world) {
    super();
    this.world = world;
    this.audio = world.audio;

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
  }

  /**
   * Resets character base values like hp, coins, bubbles and
   * character state (to default: idle). Useful when starting a new level.
   *
   * @memberof Character
   */
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


  /**
   * Initializes different intervals that handle movement behaviour, 
   * states and animations of character.
   * @memberof Character
   */
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

  /**
   * An interval at 60 fps that manages states and correct switching of states
   * if keys are pressed or if character is hurt.
   * 
   * @memberof Character
   */
  update() {
    let updateInterval = setInterval(() => {
      this.audio.effects.splash.pause();
      if (this.world.gameState == "GAMEOVER") {
      } else {
        if (this.currentState == this.state.IDLE || this.currentState== this.state.SLEEP) {
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

  /**
   * Changes character state if character is hurt or key is pressed.
   *
   * @memberof Character
   */
  checkState() {
    this.audio.effects.sleep.pause();
    if (this.isHurt()) {
      this.resetIdleCounter();
      this.currentState = this.state.HURT_POISON;
    } else if (keyboard.SHOOT) {
      this.resetIdleCounter();
      this.currentState = this.state.ATTACK_BUBBLE;
    } else if (keyboard.FINSLAP) {
      this.resetIdleCounter();
      this.currentState = this.state.ATTACK;
    } else if (keyboard.RIGHT || keyboard.LEFT || keyboard.UP || keyboard.DOWN) {
      this.resetIdleCounter();
      this.currentState = this.state.SWIM;
    } else {
      this.idleCounter++;
      if (this.idleCounter > 60 * 15 && this.world.gameState == "RUNNING") {
        this.currentState = this.state.SLEEP;
      } else {
        this.currentState = this.state.IDLE;
      }
    }
  }

  /**
   * Checks movement inputs and moves character right, left, up or down
   * without changing character state (e.g. when hurt or attacking)
   *
   * @memberof Character
   */
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

  /**
   * Key presses in swimming state will always change character state.
   * Movement is allowed.
   * @memberof Character
   */
  handleSwimmingState() {
    this.audio.effects.splash.play();
    this.checkMovementInputs();
    this.checkState();
  }


  /**
   * In hurt state, character movement is allowed, but change of state
   * is only allowed if isHurt-Phase has ended.
   *
   * @memberof Character
   */
  handleHurtState() {
    if (!this.isHurt()) {
      this.audio.effects.hitChar.pause();
      this.checkState();
    } else {
      this.audio.effects.hitChar.play();
      this.checkMovementInputs();
    }
  }

  /**
   * Takes care that correct single or looped animations are executed based on 
   * character state.
   * 
   * @param {number} gameFrame - a number needed to adjust animation speed for some animations
   * @memberof Character
   */
  handleAnimations(gameFrame) {
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
      } else if (this.currentState == this.state.SLEEP) {
        this.sleep(gameFrame);
      }
    }
  }

  /**
   * Moves character right as long as level-end is not reached
   * @memberof Character
   */
  movementRight() {
    this.otherDirection = false;
    if (this.position.x < this.world.level.level_end_x) this.position.x += this.speedX;
  }


  /**
   * Moves character left as long as default left-end of canvas is not reached
   * @memberof Character
   */
  movementLeft() {
    this.otherDirection = true;
    if (this.position.x > -50) this.position.x -= this.speedX;
  }

  /**
   * Plays idle animation based on gameFrame. Uses gameFrame to adjust speed
   * @param {number} gameFrame - frame count of surrounding interval that calls idle()
   * @memberof Character
   */
  idle(gameFrame) {
    if (gameFrame % 4 == 0) {
      this.playAnimation(this.IMAGES.IDLE);
    }
  }

  /**
   *
   * @memberof Character
   */
  resetIdleCounter() {
    this.idleCounter = 0;
  }

  /**
   * Plays swim animation based on gameFrame. Uses gameFrame to adjust speed
   * @param {number} gameFrame - frame count of surrounding interval that calls swim()
   * @memberof Character
   */
  swim(gameFrame) {
    if (gameFrame % 6 == 0 && this.currentState == this.state.SWIM) {
      this.playAnimation(this.IMAGES.SWIM);
    }
  }

  /**
   * Plays sleep animation based on gameFrame. Uses gameFrame to adjust speed
   * @param {number} gameFrame - frame count of surrounding interval that calls sleep()
   * @memberof Character
   */
  sleep(gameFrame) {
    this.audio.effects.sleep.play();
    if (gameFrame % 4 == 0 && this.currentState == this.state.SLEEP) {
      this.playAnimation(this.IMAGES.SLEEP);
    }
  }


  /**
   * Plays a single bubble attack-animation. Contains a timeout to ensure animation 
   * can only restarted when finished.
   *
   * @memberof Character
   */
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

  /**
   * Controls finslap attack. Character gets a bigger offset to be able to hit enemies
   * during attack without being injured.
   * Has a timeout to ensure that attack won't start repeatedly, and an attack
   * cooldown of 1s to avoid character-op by continuous attack
   *
   * @memberof Character
   */
  finslapAttack() {
    if (!this.attackRunning && !this.isHurt()) {
      this.attackRunning = true;
      this.audio.effects.woosh.play();
      this.offset.width = -40;
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

  /**
   * Interval that controls movements on y-axis based on y-position of character
   * and based on character being alive or dead (will move up if dead)
   *
   * @memberof Character
   */
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

  /**
   * Moves character on y-axis.
   * @param {number} [dir=1] - direction parameter; 1 means moving up, -1 means moving down
   * @memberof Character
   */
  jump(dir = 1) {
    this.speedY = 4 * dir;
  }

  /**
   * Plays looped hurt animation as long as character has hart-state
   * Also controls end of animation if character is dead
   * 
   * @param {array} [IMAGES=this.IMAGES.HURT_POISON] - array with animation images for hurt-state
   * @memberof Character
   */
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

  /**
   * Plays a single death-animation
   * @memberof Character
   */
  playDeathAnimation() {
    this.currentImage = 0;
    let counter = 0;
    let deathInterval = setInterval(() => {
      if (counter >= this.IMAGES.DEAD.length - 1) {
        clearInterval(deathInterval);
      }
      this.playAnimation(this.IMAGES.DEAD);
      counter++;
    }, 1000 / 30);
  }
}
