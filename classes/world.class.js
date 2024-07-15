import { createLevel1 } from "../levels/level1.js";
import { createLevel2 } from "../levels/level2.js";
import { Character } from "./character.class.js";
import { DrawableObject } from "./drawable.object.class.js";
import { BackgroundObject } from "./background.object.class.js";
// import { Endboss } from "./endboss.class.js";
import { StatusBar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Enemy } from "./enemy.class.js";
import { Endboss } from "./endboss.class.js";
import { Screen } from "./screen.class.js";
import { AudioControl } from "../utils/audioControls.class.js";

export class World {
  audio = new AudioControl();
  gameState = {
    START: "START",
    LOADING: "LOADING",
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
    CONTROLS: "CONTROLS",
    GAMEOVER: "GAMEOVER",
  };
  bubbles = [];
  isCreatingBubble = false;
  gameOverScreen;
  level;
  levels = ["level1", "level2"];
  soundsMuted = false;
  currentLevel = this.levels[0];
  score = 0;
  startActive = false;
  startScreenBackground = new BackgroundObject("./img/TitleBackground/Sharky.png", 0);
  attackRunning = false;

  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.gameState = "START";

    this.loadScreens();

    this.character = new Character(this);
    this.statusBarHp = new StatusBar("HP", this.character.maxHp);
    this.statusBarCoins = new StatusBar("COINS", this.character.maxCoins);
    this.statusBarBubbles = new StatusBar("BUBBLES", this.character.maxBubbles);
    this.camera_x = 0;

    this.ctx = canvas.getContext("2d");
    this.screen = new Screen(this);
    this.update();
    this.draw();
    this.updateSoundControls();
  }

  update() {
    let frameCount = 0;
    setInterval(() => {
      frameCount++;

      // console.log("start active is", this.startActive);
      if (this.gameState == "GAMEOVER") {
        this.applyGameOverStatus();
      } else if (this.gameState == "START") {
        this.applyStartStatus();
      } else if (this.gameState == "CONTROLS") {
        this.applyControlsStatus();
      } else if (this.gameState == "LOADING") {
        this.applyLoadingStatus();
      } else if (this.gameState == "RUNNING") {
        this.applyRunningStatus(frameCount);
      }
    }, 1000 / 60);
  }

  updateSoundControls() {
    setInterval(() => {
      // console.log("interval running");
      if (keyboard.MUTE && this.soundsMuted) {
        this.soundsMuted = false;
        this.audio.unmuteAll();
        console.log("unmuting sounds", this.soundsMuted);
      } else if (keyboard.MUTE && !this.soundsMuted) {
        this.soundsMuted = true;
        this.audio.muteAll();
        console.log("muting sounds", this.soundsMuted);
      }
    }, 1000 / 15);
  }

  applyStartStatus() {
    setTimeout(() => {
      if (this.gameState == "START" && this.startActive == false) this.startActive = true;
    }, 1000);
    this.showStartButtons();
    if (keyboard.ENTER && this.startActive) {
      // console.log("setting start active to false");
      this.startActive = false;
      this.gameState = "LOADING";
      this.score = 0;
    } else if (keyboard.CONTROLS) {
      this.startActive = false;
      this.gameState = "CONTROLS";
    }
  }

  showStartButtons() {
    this.textForScreenButton("START GAME");
    this.showButtons("screenBtn");
    this.hideButtons("menu");
    this.hideButtons("hud-container");
  }

  applyControlsStatus() {
    this.showControlsButtons();
    if (keyboard.ESC) {
      this.gameState = "START";
    }
  }

  showControlsButtons() {
    this.textForScreenButton("GO BACK");
    this.hideButtons("screenBtn");
    this.showButtons("menu");
    this.hideButtons("hud-container");
  }

  applyLoadingStatus() {
    this.showLoadingButtons();
    this.loadLevelContents();
    setTimeout(() => {
      this.gameState = "RUNNING";
      if (this.gameState != "RUNNING") this.character.position.y = 50;
    }, 1200);
  }

  showLoadingButtons() {
    this.hideButtons("screenBtn");
    this.hideButtons("menu");
    this.hideButtons("hud-container");
  }

  applyGameOverStatus() {
    this.showGameOverButtons();
    if (keyboard.ENTER) {
      if (this.lastLevel() || this.character.isDead()) {
        this.currentLevel = this.levels[0];
        this.gameState = "START";
      } else {
        this.currentLevel = this.getNextLevel();
        this.gameState = "LOADING";
      }
      this.character.reset();
    }
  }

  showGameOverButtons() {
    this.showButtons("start-btn");
    this.hideButtons("hud-container");
    this.hideButtons("controls-btn");
    this.hideButtons("menu");
    this.textForScreenButton("Continue");
    if (this.character.isDead() || this.lastLevel()) this.textForScreenButton("Restart");
  }

  applyRunningStatus(frameCount) {
    this.showButtons("hud-container");
    this.hideButtons("screenBtn");
    this.updateStatusBars();
    this.checkCollisions();
    this.handleBubbles(frameCount);
    // this.checkEnemyDamage();
    this.handleDeadEnemies();
    this.checkFinalBossAppeared();
  }

  /**
   * Adjusts the button text of "Enter"-Button for start and loading screens
   * @param {string} text - button-text
   */
  textForScreenButton(text) {
    document.getElementById("start-btn").innerHTML = text;
  }

  /**Shows all buttons of provided class
   * @param {string} buttonClass - css-class of elements to be shown
   */
  showButtons(buttonClass) {
    let buttons = document.getElementsByClassName(buttonClass);
    for (let button of buttons) {
      button.classList.remove("d-none");
    }
  }

  /**Hides all buttons of provided class
   * @param {string} buttonClass - css-class of elements to be hidden
   */
  hideButtons(buttonClass) {
    let buttons = document.getElementsByClassName(buttonClass);
    for (let button of buttons) {
      button.classList.add("d-none");
    }
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
      // console.log("attack running", this.attackRunning);
      if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.isDead()) {
        if (this.character.currentState == this.character.state.ATTACK && !this.attackRunning) {
          if (this.attackRunning == false) {
            this.performFinslapHit(enemy);
          }
        } else {
          this.character.hit(2);
          this.checkCharacterDying();
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
          this.audio.playCoinSound();
        } else if (item.type == "POISON") {
          this.audio.effects.poison.play();
          this.character.bubbles++;
        }
      }
    });
  }

  collisionsBubbles() {
    this.bubbles.forEach((bubble) => {
      this.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy) && !bubble.isDead() && !enemy.isDead()) {
          this.audio.effects.woosh.play();
          this.handleBubbleCollision(bubble, enemy);
        }
      });
    });
  }

  /** Calculate effects of bubble hitting enemy
   * @param {ThrowableObject} bubble - bubble that collided with enemy
   * @param {Enemy} enemy - enemy that collided with bubble
   */
  handleBubbleCollision(bubble, enemy) {
    bubble.hp = 0;
    enemy.hit(bubble.damage);
    this.checkEnemyDying();
  }
  performFinslapHit(enemy) {
    this.attackRunning = true;
    enemy.hit(3);
    this.audio.effects.hit.play();
    console.log("doing 3 damage");
    this.checkEnemyDying();
    console.log("attack running", this.attackRunning);
    setTimeout(() => (this.attackRunning = false), 1000);
  }

  renderScoreInfo(enemy) {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "blue";
    this.ctx.fillText(`+ ${enemy.score}`, enemy.position.x + enemy.offset.x + 20, enemy.position.y + enemy.offset.y);
  }

  checkCharacterDying() {
    if (this.character.hp <= 0) {
      this.character.playDeathAnimation();
      setTimeout(() => {
        this.gameState = "GAMEOVER";
        console.log("game over");
      }, 1000);
    }
  }

  /** Checks if an enemy is dying after an attack
   * if enemy is dead, player score is increased and if
   * final boss is dead, level or game is set to gameover
   */
  checkEnemyDying() {
    this.enemies.forEach((enemy) => {
      if (enemy.hp <= 0) {
        this.score += enemy.score;
        if (enemy instanceof Endboss) {
          this.gameState = "GAMEOVER";
          this.audio.menu.levelComplete.play();
        }
      }
    });
  }

  handleDeadEnemies() {
    this.enemies.forEach((enemy, index) => {
      if (enemy.isDead()) {
        enemy.update();
        if (enemy.position.y <= -20) {
          this.enemies.splice(index, 1);
        }
      }
    });
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

  checkThrowing() {
    if (keyboard.SHOOT && !this.isCreatingBubble && !this.character.isHurt()) {
      this.isCreatingBubble = true;
      this.audio.effects.bubble.play();
      setTimeout(() => {
        this.audio.effects.bubble.play();
        this.createBubble();
      }, 400);
      setTimeout(() => {
        this.isCreatingBubble = false;
        this.audio.effects.bubble.pause();
      }, 1000);
    }
  }

  /**creates a bubble to attack enemies
   * if character has poison, the bubble will be poisoned
   * (is green and does more damage)
   */
  createBubble() {
    let bubble;
    if (this.character.bubbles > 0) {
      this.character.bubbles--;
      bubble = new ThrowableObject(this.character, "poison");
    } else {
      bubble = new ThrowableObject(this.character);
    }
    this.bubbles.push(bubble);
  }

  checkFinalBossAppeared() {
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
      this.renderStartScreen("");
    } else if (this.gameState == "LOADING") {
      this.renderStartScreen(`${this.currentLevel} loading...`);
    } else if (this.gameState == "CONTROLS") {
      this.renderControlsScreen();
    } else if (this.gameState == "RUNNING" || this.gameState == "GAMEOVER") {
      this.drawGameContents();
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

  lastLevel() {
    if (!this.getNextLevel()) return true;
    else return false;
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
    this.drawCollisionRects();
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
    this.renderStatusTexts();
  }

  renderStatusTexts() {
    this.ctx.font = "bold 20px LuckiestGuy";
    this.ctx.strokeStyle = "grey";
    this.ctx.fillStyle = "#CC33AA";
    this.ctx.strokeText("poison: " + this.character.bubbles, (canvas.width / 6) * 3, 45);
    this.ctx.fillText("poison: " + this.character.bubbles, (canvas.width / 6) * 3, 45);
    this.ctx.strokeText("coins: " + this.character.coins, (canvas.width / 6) * 4, 45);
    this.ctx.fillText("coins: " + this.character.coins, (canvas.width / 6) * 4, 45);
    this.ctx.strokeText("score: " + this.score, (canvas.width / 6) * 5, 45);
    this.ctx.fillText("score: " + this.score, (canvas.width / 6) * 5, 45);
  }

  renderStartScreen(message) {
    this.ctx.fillStyle = "rgba(100,100,250,0.2)";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.addToMap(this.startScreenBackground);
    this.screen.renderGameTitle();
    this.screen.renderStartMessage(message);
  }

  renderControlsScreen() {
    this.ctx.fillStyle = "rgba(100,100,250,0.2)";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  renderEndScreen(message) {
    this.screen.renderTransparentBackground();
    this.screen.renderMainMessage(message);
    // this.screen.renderLineRestart();
    if (this.character.isDead() || !this.getNextLevel()) this.screen.renderLineScore();
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
    this.gameOverScreen.loadImage("img/6.Botones/Tittles/Game Over/Recurso 9.png");
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
