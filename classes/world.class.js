import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { DrawableObject } from "./drawable.object.class.js";
import { StatusBar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
  gameRunning = true;
  gameOver = false;
  bubbles = [];
  gameOverScreen;
  constructor(canvas) {
    this.loadLevelContents();
    this.loadScreens();
    this.camera_x = 0;

    this.ctx = canvas.getContext("2d");
    this.character = new Character(this);
    this.statusBarHp = new StatusBar("HP", this.character.maxHp);
    this.statusBarCoins = new StatusBar("COINS", this.character.maxCoins);
    this.statusBarBubbles = new StatusBar("BUBBLES", this.character.maxBubbles);
    this.update();
    this.draw();
  }

  update() {
    if (!this.gameOver) {
      this.checkCollisions();
      this.handleBubbles();
      this.handleEnemies();
    }
  }

  checkCollisions() {
    setInterval(() => {
      // console.log("checking collision");
      this.collisionsEnemies();

      this.collisionsCollectables();

      this.collisionsBubbles();
    }, 1000 / 30);
  }

  collisionsEnemies() {
    this.enemies.forEach((enemy) => {
      // console.log(this.character.isColliding(enemy));
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
  }

  collisionsCollectables() {
    this.collectables.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        this.collectables.splice(index, 1);
        if (item.type == "COIN") this.character.coins++;
        else if (item.type == "POISON") {
          this.character.bubbles++;
        }
      }
    });
  }

  collisionsBubbles() {
    this.bubbles.forEach((bubble) => {
      this.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy) && !bubble.isDead()) {
          // console.log("bubble-enemy-collision");
          bubble.hp = 0;
          enemy.hit(5);
          // console.log(enemy);
        }
      });
      if (this.enemies[this.enemies.length-1].hp <= 0) {
        console.log("you won!");
        this.gameOver = true;
      }
    });
  }

  handleBubbles() {
    setInterval(() => {
      this.checkThrowing();

      this.bubbles.forEach((bubble, bubbleIndex) => {
        if (bubble.isDead()) {
          this.bubbles.splice(bubbleIndex, 1);
        }
      });
    }, 1000 / 10);
  }

  handleEnemies() {
    setInterval(() => {
      this.enemies.forEach((enemy, index) => {
        if (enemy.isDead()) {
          this.enemies.splice(index, 1);
        }
      }, 1000 / 10);
    });
  }

  checkThrowing() {
    if (keyboard.SHOOT) {
      if (this.character.bubbles > 0) {
        let bubble = new ThrowableObject(this.character);
        this.bubbles.push(bubble);
        this.character.bubbles--;
      }
      // console.log("observed shoot", this.bubbles);
    }
  }

  /** If we don't want to provide the world to character as parameter */
  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.reset();
    this.statusBarHp.update(this.character.hp);
    this.statusBarCoins.update(this.character.coins);
    this.statusBarBubbles.update(this.character.bubbles);

    if (this.gameRunning && !this.gameOver) {
      this.drawGameContents();
    } else if (this.gameRunning && this.gameOver) {
      if (this.character.hp <= 0){
      this.renderGameOver("GAME OVER");
    } else {
      this.renderGameOver("YOU WIN!");
    }
    } 


    requestAnimationFrame(() => {
      this.draw();
    });
  }

  drawGameContents() {
    this.camera_x = -(this.character.position.x - 50);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.light);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.collectables);
    this.ctx.translate(-this.camera_x, 0);
    // this.addStatusInfos();
    this.addToMap(this.statusBarHp);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBubbles);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    // this.drawCollisionRects();
    this.bubbles.forEach((bubble) => bubble.update());
    this.addObjectsToMap(this.bubbles);
    this.ctx.translate(-this.camera_x, 0);
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
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
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
    mo.position.x = mo.position.x * -1;
  }

  /** Flips the canvas back so next mo will be drawn in
   * non-mirrored orientation again and resets x-value for mo
   * @param {object} mo - movable object that is drawn to ctx
   */
  flipImageBack(mo) {
    mo.position.x = mo.position.x * -1;
    this.ctx.restore();
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

  renderGameOver(message) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.strokeStyle = "white";
    this.ctx.strokeWidth = 5;
    this.ctx.font = "50px Georgia";
    this.ctx.fillStyle = "grey";
    this.ctx.strokeText(message, 210, canvas.height / 2);
    this.ctx.fillText(message, 210, canvas.height / 2);
    // this.addToMap(this.gameOverScreen);
  }

  loadLevelContents() {
    this.level = level1;
    this.enemies = this.level.enemies;
    this.light = this.level.light;
    this.backgroundObjects = this.level.backgroundObjects;
    this.collectables = this.level.collectables;
  }

  loadScreens() {
    this.gameOverScreen = new DrawableObject();
    this.gameOverScreen.loadImage("../img/6.Botones/Tittles/Game Over/Recurso 9.png");
    console.log(this.gameOverScreen);
  }

  drawCollisionRects() {
    this.character.drawCollisionRect(this.ctx);
    this.enemies.forEach((enemy) => enemy.drawCollisionRect(this.ctx));
    this.character.drawCollisionRectOuter(this.ctx);
    this.enemies.forEach((enemy) => enemy.drawCollisionRectOuter(this.ctx));
    this.bubbles.forEach((bubble) => bubble.drawCollisionRectOuter(this.ctx));
  }
}
