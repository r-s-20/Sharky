import { DrawableObject } from "./drawable.object.class.js";

export class MovableObject extends DrawableObject {
  position = { x: 200, y: 100 };
  height = 100;
  width = 100;
  speedY = 0;
  speedX = 0;
  maxHp = 100;
  offset = { x: 0, y: 0, height: 0, width: 0 };
  movingInterval;
  otherDirection = false;
  stopAnimation = false;
  animationInterval;
  lastHit = 0;
  hasDied = 0;

  IMAGES = {
    DEAD: [],
  };

  state = {
    DEAD: "DEAD",
  };

  loadImagesToCache() {
    Object.keys(this.state).forEach((state) => {
      this.loadImages(this.IMAGES[state]);
    });
    // console.log("loading image cache for", Object.keys(this.state), "finished", new Date().getTime());
  }

  moveRight(step = 10) {
    this.position.x += step;
  }

  moveLeft(step = 10) {
    this.position.x -= step;
  }

  moveUp(step = 10) {
    this.position.y -= step;
  }

  autoMoveLeft(speed = 1000 / 60, step = 1) {
    this.movingInterval = setInterval(() => {
      this.position.x -= step;
    }, speed);
    return this.movingInterval;
  }

  autoMoveUp(speed = 1000 / 60, step = 1) {
    this.movingInterval = setInterval(() => {
      this.position.y -= step;
    }, speed);
    return this.movingInterval;
  }

  /**
   * Draws collision frames based on raw png, ignoring offsets
   *
   * @param {2d context of canvas} ctx
   * @memberof MovableObject
   */
  drawCollisionRectOuter(ctx) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }


  /**
   * Draws collision frames based on png offsets (x, y, width, height) set for object
   * @param {*} ctx
   * @memberof MovableObject
   */
  drawCollisionRect(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      this.width + this.offset.width,
      this.height + this.offset.height
    );
    ctx.strokeStyle = "red";
    ctx.stroke();
  }


  /**
   * Checks rectangle collision for Movable Object (mo) with another object
   * Requires position and offset values of mo and object
   *
   * @param {Object} obj - object for wich collision is to be checked
   * @return {*} 
   * @memberof MovableObject
   */
  isColliding(obj) {
    return (
      this.position.x + this.offset.x + this.width + this.offset.width >= obj.position.x + obj.offset.x &&
      this.position.x + this.offset.x <= obj.position.x + obj.offset.x + obj.width + obj.offset.width &&
      this.position.y + this.offset.y + this.height + this.offset.height >= obj.position.y + obj.offset.y &&
      this.position.y + this.offset.y <= obj.position.y + obj.offset.y + obj.height + obj.offset.height
    );
  }

  /**
   * Subtracts damage of hp for Movable Object, sets hp to 0 if lower than 0
   * and induces Timestamps for last hit and, if dead, for dying of Movable Object 
   * @param {number} damage 
   */
  hit(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.hasDied = new Date().getTime();
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Sets the duration of "is hurt"-state for Movable Object.
   * Calculates the time passed since last hit and compares with a limit (500ms).
   * @returns boolean - true if duration since last hit is < 500 ms
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed / 500 < 1;
  }

  isDead() {
    return this.hp == 0;
  }

  /**
   * Sets the duration of hasDied-attribute for Movable Object.
   * Calculates the time passed since death and compares with a limit (1500ms).
   * @returns boolean - true if duration since last hit is < 1500 ms
   */
  recentDead() {
    let timePassed = new Date().getTime() - this.hasDied;
    return timePassed < 1500;
  }
}
