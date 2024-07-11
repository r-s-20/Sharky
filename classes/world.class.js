import { createLevel1 } from "../levels/level1.js";
import { createLevel2 } from "../levels/level2.js";
import { Character } from "./character.class.js";
import { DrawableObject } from "./drawable.object.class.js";
import { BackgroundObject } from "./background.object.class.js";
import { Endboss } from "./endboss.class.js";
import { StatusBar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
  gameState = {
    START: "START",
    LOADING: "LOADING",
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
    GAMEOVER: "GAMEOVER",
  };
  bubbles = [];
  creatingBubble = false;
  gameOverScreen;
  level;
  levels = ["level1", "level2"];
  currentLevel = this.levels[0];
  score = 0;
  startScreenBackground = new BackgroundObject("./img/TitleBackground/Sharky.png", 0);

  constructor(canvas) {
    this.gameState = "START";

    this.loadScreens();

    this.character = new Character(this);
    this.statusBarHp = new StatusBar("HP", this.character.maxHp);
    this.statusBarCoins = new StatusBar("COINS", this.character.maxCoins);
    this.statusBarBubbles = new StatusBar("BUBBLES", this.character.maxBubbles);
    this.camera_x = 0;

    this.ctx = canvas.getContext("2d");
    this.update();
    this.draw();
  }

  update() {
    let active = false;
    let frameCount = 0;
    let runInterval = setInterval(() => {
      frameCount++;
      if (this.gameState == "GAMEOVER") {
        clearInterval(runInterval);
      }
      if (this.gameState == "START") {
        setTimeout(() => (active = true), 1000);
        if (keyboard.ENTER && active) {
          console.log("changing to load");
          this.gameState = "LOADING";
          this.score = 0;
        }
      }
      if (this.gameState == "LOADING") {
        this.loadLevelContents();
        setTimeout(() => {
          // console.log("changing to running", new Date().getTime());
          this.gameState = "RUNNING";
          if (this.gameState != "RUNNING") this.character.position.y = 50;
        }, 900);
      }
      if (this.gameState == "RUNNING") {
        this.updateStatusBars();
        this.checkCollisions();
        this.handleBubbles(frameCount);
        this.handleEnemies();
        this.checkFinalBossEntry();
      }
    }, 1000 / 60);
  }

  updateStatusBars() {
    this.statusBarHp.update(this.character.hp);
    this.statusBarCoins.update(this.character.coins);
    this.statusBarBubbles.update(this.character.bubbles);
  }

  checkCollisions() {
    // console.log("checking collision");
    this.collisionsEnemies();
    this.collisionsCollectables();
    this.collisionsBubbles();
  }

  collisionsEnemies() {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.isDead()) {
        this.character.hit(2);
        if (this.character.hp <= 0) {
          this.character.playDeathAnimation();
          setTimeout(() => {
            this.gameState = "GAMEOVER";
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
        if (item.type == "COIN") {
          this.character.coins++;
          this.score++;
        } else if (item.type == "POISON") {
          this.character.bubbles++;
        }
      }
    });
  }

  collisionsBubbles() {
    let endboss = this.enemies[this.enemies.length - 1];
    this.bubbles.forEach((bubble) => {
      this.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy) && !bubble.isDead() && !enemy.isDead()) {
          bubble.hp = 0;
          enemy.hit(bubble.damage);
          if (endboss.hp <= 0) {
            // console.log("you win!");
            this.gameState = "GAMEOVER";
          }
          if (enemy.hp <= 0) {
            this.score += enemy.score;
          }
        }
      });
    });
  }

  renderScoreInfo(enemy) {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "blue";
    this.ctx.fillText(`+ ${enemy.score}`, enemy.position.x + 15, enemy.position.y + 10);
  }

  handleBubbles(frameCount) {
    if (frameCount % 2 == 0) {
      this.checkThrowing();
    }
    this.bubbles.forEach((bubble, bubbleIndex) => {
      if (bubble.isDead()) {
        this.bubbles.splice(bubbleIndex, 1);
      }
    });
  }

  handleEnemies() {
    this.enemies.forEach((enemy, index) => {
      if (enemy.isDead()) {
        enemy.update();
        if (enemy.position.y <= -20) {
          this.enemies.splice(index, 1);
        }
        // console.log("is dead:", enemy);
      }
    });
  }

  checkThrowing() {
    if (keyboard.SHOOT && !this.creatingBubble && !this.character.isHurt()) {
      this.creatingBubble = true;
      setTimeout(() => {
        let bubble;
        if (this.character.bubbles > 0) {
          this.character.bubbles--;
          bubble = new ThrowableObject(this.character, "poison");
        } else {
          bubble = new ThrowableObject(this.character);
        }
        this.bubbles.push(bubble);
      }, 400);
      setTimeout(() => {
        this.creatingBubble = false;
      }, 1000);
      // console.log("observed shoot", this.bubbles);
    }
  }

  checkFinalBossEntry() {
    let finalEnemy = this.enemies[this.enemies.length - 1];
    if (this.character.position.x > 1000 && !finalEnemy.hasEntered) {
      finalEnemy.currentImage = 0;
      finalEnemy.introAnimation();
      finalEnemy.position.y = 0;
    }
  }

  /** If we don't want to provide the world to character as parameter */
  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.reset();
    if (this.gameState == "START") {
      this.renderStartScreen("Press ENTER to start game");
    } else if (this.gameState == "LOADING") {
      this.renderStartScreen(`${this.currentLevel} loading...`);
    }
    if (this.gameState == "RUNNING" || this.gameState == "GAMEOVER") {
      this.drawGameContents();
      // console.log("this is still running");
      if (this.gameState == "GAMEOVER") {
        if (this.character.isDead()) {
          this.renderEndScreen("GAME OVER");
        } else {
          if (!this.getNextLevel()) {
            this.renderEndScreen("Congrats! YOU WIN!");
          } else {
            this.renderEndScreen(`${this.currentLevel} complete!`);
          }
        }
        if (keyboard.ENTER) {
          if (!this.getNextLevel() || this.character.isDead()) {
            this.currentLevel = this.levels[0];
            this.gameState = "START";
          } else {
            this.currentLevel = this.getNextLevel();
            this.gameState = this.gameState = "LOADING";
          }
          this.character.reset();
          this.update();
        }
      }
    }

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  getNextLevel() {
    let index = this.levels.indexOf(this.currentLevel);
    if (index < this.levels.length - 1) {
      return this.levels[index + 1];
    }
    return false;
  }

  drawGameContents() {
    this.camera_x = -(this.character.position.x - 50);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.light);
    this.addObjectsToMap(this.enemies);
    this.enemies.forEach((enemy) => {
      if (enemy.recentDead()) {
        // console.log("enemy died recently");
        this.renderScoreInfo(enemy);
      }
    });
    this.addObjectsToMap(this.collectables);
    this.ctx.translate(-this.camera_x, 0);
    this.addStatusInfos();

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
    this.addToMap(this.statusBarHp);
    // this.addToMap(this.statusBarCoins);
    // this.addToMap(this.statusBarBubbles);

    this.ctx.font = "bold 20px LuckiestGuy";
    this.ctx.strokeStyle = "grey";
    this.ctx.fillStyle = "#CC33AA";
    // this.ctx.strokeText("hp: " + this.character.hp, 200, 40);
    // this.ctx.fillText("hp: " + this.character.hp, 200, 40);
    this.ctx.strokeText("poison: " + this.character.bubbles, (canvas.width / 6) * 3, 45);
    this.ctx.fillText("poison: " + this.character.bubbles, (canvas.width / 6) * 3, 45);
    this.ctx.strokeText("coins: " + this.character.coins, (canvas.width / 6) * 4, 45);
    this.ctx.fillText("coins: " + this.character.coins, (canvas.width / 6) * 4, 45);
    this.ctx.strokeText("score: " + this.score, (canvas.width / 6) * 5, 45);
    this.ctx.fillText("score: " + this.score, (canvas.width / 6) * 5, 45);
  }

  renderStartScreen(message) {
    this.ctx.reset();
    this.addToMap(this.startScreenBackground);

    this.ctx.fillStyle = "rgba(100,100,250,0.2)";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 5;
    this.ctx.font = "80px LuckiestGuy";
    this.ctx.fillStyle = "blue";
    this.ctx.textAlign = "center";
    this.ctx.strokeText("Sharky", canvas.width / 2, (canvas.height / 5) * 2);
    this.ctx.fillText("Sharky", canvas.width / 2, (canvas.height / 5) * 2);

    this.ctx.font = "40px LuckiestGuy";
    this.ctx.lineWidth = 3;
    this.ctx.fillStyle = "violet";
    this.ctx.textAlign = "center";
    this.ctx.strokeText(message, canvas.width / 2, (canvas.height / 5) * 4);
    this.ctx.fillText(message, canvas.width / 2, (canvas.height / 5) * 4);
    // this.addToMap(this.gameOverScreen);
  }

  renderEndScreen(message) {
    this.renderTransparentBackground();
    this.renderMainMessage(message);
    this.renderLineRestart();
    if (this.character.isDead() || !this.getNextLevel()) this.renderLineScore();
  }

  renderTransparentBackground() {
    this.ctx.fillStyle = "rgba(0,0,0,0.3)";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  renderMainMessage(message) {
    let gradient = this.createGradient();
    this.ctx.strokeStyle = this.character.isDead() ? "grey" : "yellow";
    this.ctx.strokeWidth = 5;
    this.ctx.font = "60px LuckiestGuy";
    this.ctx.fillStyle = this.character.isDead() ? "yellow" : gradient;
    this.ctx.textAlign = "center";
    this.ctx.lineWidth = 8;
    this.ctx.strokeText(message, canvas.width / 2, canvas.height / 2);
    this.ctx.fillText(message, canvas.width / 2, canvas.height / 2);
  }

  createGradient() {
    let gradient = this.ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "lightblue");
    gradient.addColorStop("0.5", "magenta");
    gradient.addColorStop("1.0", "orange");
    return gradient;
  }

  renderLineRestart() {
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "white";
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "magenta";
    let text = this.character.isDead() ? "Press ENTER to restart" : "Press ENTER to continue";
    this.ctx.strokeText(text, canvas.width / 2, (canvas.height / 5) * 4);
    this.ctx.fillText(text, canvas.width / 2, (canvas.height / 5) * 4);
  }
  renderLineScore() {
    this.ctx.strokeText(`Your score is: ${this.score}`, canvas.width / 2, (canvas.height / 5) * 3.3);
    this.ctx.fillText(`Your score is: ${this.score}`, canvas.width / 2, (canvas.height / 5) * 3.3);
  }

  loadLevelContents() {
    if (this.currentLevel == "level1") {
      this.level = createLevel1();
    } else this.level = createLevel2();
    this.enemies = this.level.enemies;
    this.light = this.level.light;
    this.backgroundObjects = this.level.backgroundObjects;
    this.collectables = this.level.collectables;
    this.enemies[this.enemies.length - 1].character = this.character;
  }

  loadScreens() {
    this.gameOverScreen = new DrawableObject();
    this.gameOverScreen.loadImage("../img/6.Botones/Tittles/Game Over/Recurso 9.png");
    // console.log(this.gameOverScreen);
  }

  drawCollisionRects() {
    this.character.drawCollisionRect(this.ctx);
    this.enemies.forEach((enemy) => enemy.drawCollisionRect(this.ctx));
    this.character.drawCollisionRectOuter(this.ctx);
    this.enemies.forEach((enemy) => enemy.drawCollisionRectOuter(this.ctx));
    this.bubbles.forEach((bubble) => bubble.drawCollisionRectOuter(this.ctx));
  }
}
