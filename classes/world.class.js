import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { StatusBar } from "./statusbar.class.js";

export class World {
  gameRunning = true;
  gameOver = false;

  constructor(canvas) {
    
    this.loadLevelContents();
    this.camera_x = 0;

    this.ctx = canvas.getContext("2d");
    this.character = new Character(this);
    this.hpBar = new StatusBar(this.character.hp);
    this.coinBar = new StatusBar(this.character.coins);
    this.bubbleBar = new StatusBar(this.character.bubbles);
    this.update();
    this.draw();
  }

  update() {
    if (!this.gameOver) {
      this.checkCollisions();
    }
  }

  checkCollisions() {
    setInterval(() => {
      this.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !this.character.isDead()) {
          this.character.hit(2);
          if (this.character.hp <= 0) {
            this.character.loadImage(this.character.IMAGES_DEAD_POISON[0]);
            this.character.playDeathAnimation();
            setTimeout(() => {
              this.gameOver = true;
              console.log("game over");
            }, 1000);
          }
        }
      });
    }, 1000 / 30);
  }

  /** If we don't want to provide the world to character as parameter */
  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.reset();

    if (this.gameRunning && !this.gameOver) {
      this.camera_x = -(this.character.x - 50);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.backgroundObjects);
      this.addToMap(this.light);
      this.addObjectsToMap(this.enemies);

      this.ctx.translate(-this.camera_x, 0);
      this.addStatusInfos();

      this.ctx.translate(this.camera_x, 0);

      this.addToMap(this.character);

      // this.character.drawCollisionRectChar(this.ctx);
      // this.enemies.forEach((enemy) => enemy.drawCollisionRectInner(this.ctx));
      // this.character.drawCollisionRectOuter(this.ctx);
      // this.enemies.forEach((enemy) => enemy.drawCollisionRectOuter(this.ctx));
    } else {
      this.gameOverScreen();
    }

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  addStatusInfos() {
    this.ctx.font = "bold 20px Arial";
    this.ctx.strokeStyle = "grey";
    this.ctx.fillStyle = "#CC33AA";
    this.ctx.strokeText("hp: " + this.character.hp, 20, 40);
    this.ctx.fillText("hp: " + this.character.hp, 20, 40);
    this.ctx.strokeText("coins: " + this.character.coins, 20, 70);
    this.ctx.fillText("coins: " + this.character.coins, 20, 70);
    this.ctx.strokeText("bubbles: " + this.character.bubbles, 20, 100);
    this.ctx.fillText("bubbles: " + this.character.bubbles, 20, 100);

  }

  /**
   * Flips whole canvas to insert object in mirrored orientation,
   * corrects position of object for it's width
   * @param {object} mo - movable Object that is drawn to ctx
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /** Flips the canvas back so next mo will be drawn in
   * non-mirrored orientation again and resets x-value for mo
   * @param {object} mo - movable object that is drawn to ctx
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  gameOverScreen() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.strokeStyle = "white";
    this.ctx.strokeWidth = 5;
    this.ctx.font = "50px Georgia";
    this.ctx.fillStyle = "grey";
    this.ctx.strokeText("GAME OVER", 210, canvas.height / 2);
    this.ctx.fillText("GAME OVER", 210, canvas.height / 2);
  }

  loadLevelContents() {
    this.level = level1;
    this.enemies = this.level.enemies;
    this.light = this.level.light;
    this.backgroundObjects = this.level.backgroundObjects;
  }
}
