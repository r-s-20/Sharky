import { createLevel1 } from "../levels/level1.js";
import { createLevel2 } from "../levels/level2.js";
import { Character } from "./character.class.js";
import { StatusSymbol } from "./statusSymbol.class.js";
import { BackgroundObject } from "./background.object.class.js";
import { StatusBar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Enemy } from "./enemy.class.js";
import { Endboss } from "./endboss.class.js";
import { Screen } from "./screen.class.js";
import { AudioControl } from "./audioControls.class.js";
import { MovableObject } from "./movable.object.class.js";

export class World {
  audio = new AudioControl();
  soundsMuted = true;
  statusSymbolCoins = new StatusSymbol("img/4. Marcadores/green/Coin_Symbol.png", 420, 12.5);
  statusSymbolBubbles = new StatusSymbol("img/4. Marcadores/green/Bubbles_Symbol.png", 305, 5);

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

    this.character = new Character(this);
    this.statusBarHp = new StatusBar("HP", this.character.maxHp);

    this.camera_x = 0;

    this.ctx = canvas.getContext("2d");
    this.screen = new Screen(this);
    this.update();
    this.draw();
    if (this.soundsMuted) {
      this.audio.muteAll();
    }
    this.updateSoundControls();
  }

  /**
   * Updates game states
   */
  update() {
    setInterval(() => {
      this.updateSoundIcon();
      if (this.gameState == "GAMEOVER") {
        this.applyGameOverStatus();
      } else if (this.gameState == "START") {
        this.applyStartStatus();
      } else if (this.gameState == "CONTROLS") {
        this.applyControlsStatus();
      } else if (this.gameState == "LOADING") {
        this.applyLoadingStatus();
      } else if (this.gameState == "RUNNING") {
        this.applyRunningStatus();
      }
    }, 1000 / 60);
  }

  /**
   * Toggles audio-off and -on-icons based on muted-status
   *
   * @memberof World
   */
  updateSoundIcon() {
    if (this.soundsMuted) {
      document.getElementById("audio-off").classList.remove("d-none");
      document.getElementById("audio-on").classList.add("d-none");
    } else {
      document.getElementById("audio-off").classList.add("d-none");
      document.getElementById("audio-on").classList.remove("d-none");
    }
  }

  /** an interval that toggles muted and unmuted states for sounds */
  updateSoundControls() {
    setInterval(() => {
      if (keyboard.MUTE && this.soundsMuted) {
        this.soundsMuted = false;
        this.audio.unmuteAll();
      } else if (keyboard.MUTE && !this.soundsMuted) {
        this.soundsMuted = true;
        this.audio.muteAll();
      }
    }, 1000 / 15);
  }

  /**
   * Controls audio, keyboard inputs and appearance of start screen for start status
   */
  applyStartStatus() {
    if (this.soundsMuted == false) {
      this.audio.background.menu.play();
    }
    setTimeout(() => {
      if (this.gameState == "START" && this.startActive == false) this.startActive = true;
    }, 1000);
    this.showStartButtons();
    if (keyboard.ENTER && this.startActive) {
      this.audio.background.menu.pause();
      this.audio.menu.button.play();
      this.startActive = false;
      this.gameState = "LOADING";
      this.score = 0;
    } else if (keyboard.CONTROLS) {
      this.audio.menu.button.play();
      this.startActive = false;
      this.gameState = "CONTROLS";
    }
  }

  showStartButtons() {
    this.textForScreenButton("START GAME");
    this.showButtons("audioControl");
    this.showButtons("screenBtn");
    this.hideButtons("curtain");
    this.hideButtons("menu");
    this.hideButtons("hud-container");
  }

  /**
   * Controls keyboard inputs and appearance of controls screen for controls status
   */
  applyControlsStatus() {
    this.showControlsButtons();
    if (keyboard.ESC) {
      this.gameState = "START";
      this.audio.menu.button.play();
    }
  }

  showControlsButtons() {
    this.showButtons("curtain");
    this.hideButtons("audioControl");
    this.hideButtons("screenBtn");
    this.showButtons("menu");
    this.hideButtons("hud-container");
  }
  /**
   * Controls keyboard inputs and appearance of loading screen
   */
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

  /**
   * Controls keyboard inputs and appearance of end screens (end of level or gameOver)
   */
  applyGameOverStatus() {
    this.audio.background.level.pause();
    this.showGameOverButtons();
    if (keyboard.ENTER) {
      this.audio.menu.button.play();
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

  /**
   * Controls keyboard inputs and appearance while game is Running.
   * also induces intervals to handle collisions, bubbles, dead enemies and
   * appearance of endboss
   */
  applyRunningStatus() {
    this.audio.background.level.play();
    this.showButtons("hud-container");
    this.hideButtons("screenBtn");
    this.updateStatusBars();
    this.checkCollisions();
    this.handleBubbles();
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
    this.statusBarEndboss.update(this.enemies[this.enemies.length - 1].hp);
  }

  checkCollisions() {
    this.collisionsEnemies();
    this.collisionsCollectables();
    this.collisionsBubbles();
  }

  /**
   * Checks if enemies are colliding with character and will induce action
   * and apply damage to enemy or character based on character states
   *
   * @memberof World
   */
  collisionsEnemies() {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.isDead()) {
        if (this.character.currentState == this.character.state.ATTACK && !this.attackRunning) {
          if (this.attackRunning == false) {
            this.handleFinslapHit(enemy);
          }
        } else {
          this.character.hit(2);
          this.checkCharacterDying();
        }
      }
    });
  }

  /**
   * Handles collisions of character with collectable objects like coins and poison
   *
   * @memberof World
   */
  collisionsCollectables() {
    this.collectables.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        this.collectables.splice(index, 1);
        if (item.type == "COIN") {
          this.character.coins++;
          this.score++;
          this.audio.playCoinSound();
        } else if (item.type == "POISON") {
          this.character.bubbles++;
          this.audio.effects.poison.play();
        }
      }
    });
  }

  /**
   * Detects collisions of bubbles with enemies
   */
  collisionsBubbles() {
    this.bubbles.forEach((bubble) => {
      this.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy) && !bubble.isDead() && !enemy.isDead()) {
          this.audio.effects.bubbleHit.play();
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

  /**
   * Handles damage calculation & timeout and plays a sound if finslap attack
   * hits an enemy
   * @param {Enemy} enemy - enemy that has been hit with finslap attack
   * @memberof World
   */
  handleFinslapHit(enemy) {
    this.attackRunning = true;
    enemy.hit(3);
    this.audio.effects.hit.play();
    this.checkEnemyDying();
    setTimeout(() => (this.attackRunning = false), 1000);
  }

  /**
   * Renders a score-info near an enemy if that enemy is killed by character
   * @param {Enemy} enemy
   */
  renderScoreInfo(enemy) {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "blue";
    this.ctx.fillText(`+ ${enemy.score}`, enemy.position.x + enemy.offset.x + 20, enemy.position.y + enemy.offset.y);
  }

  /**
   * Induces change of game state if character is dead and induces death sound and animation
   */
  checkCharacterDying() {
    if (this.character.hp <= 0) {
      this.character.playDeathAnimation();
      this.audio.effects.charDead.play();
      setTimeout(() => {
        this.gameState = "GAMEOVER";
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
          this.updateStatusBars();
          this.gameState = "GAMEOVER";
          this.audio.menu.levelComplete.play();
        }
      }
    });
  }

  /**
   * Removes dead enemies if they have floated above canvas height
   */
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

  handleBubbles() {
    this.checkThrowing();
    this.bubbles.forEach((bubble, bubbleIndex) => {
      if (bubble.isDead()) {
        this.bubbles.splice(bubbleIndex, 1);
      }
    });
  }

  /**
   * Checks if a bubble can be created and sets a cooldown for bubble creation
   * to ensure synchronization with character animation
   */
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

  /**
   * Will let final boss appear if player approaches boss x position
   *
   * @memberof World
   */
  checkFinalBossAppeared() {
    let finalEnemy = this.enemies[this.enemies.length - 1];
    if (this.character.position.x > finalEnemy.position.x - 400 && !finalEnemy.hasEntered) {
      finalEnemy.currentImage = 0;
      finalEnemy.introAnimation();
      finalEnemy.position.y = 0;
    }
  }

  /** If we don't want to provide the world to character as parameter */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Animation frame that controls if either game screens or game contents are drawn
   * based on gamestate.
   * Will draw as fast as possible on player machine.
   *
   * @memberof World
   */
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

  /**
   * Find out if another level exists.
   * @return {number or boolean} next level or false if no next level exists
   * @memberof World
   */
  getNextLevel() {
    let index = this.levels.indexOf(this.currentLevel);
    if (index < this.levels.length - 1) {
      return this.levels[index + 1];
    }
    return false;
  }

  /** Checks if the current level is the last level
   *
   * @return {boolean} - true if last level is reached, otherwise false
   * @memberof World
   */
  lastLevel() {
    if (!this.getNextLevel()) return true;
    else return false;
  }

  /**
   * Executing functions to add objects and score information to canvas,
   *  adjust camera movement and might also induce drawing of collision frames
   *
   * @memberof World
   */
  drawGameContents() {
    this.camera_x = -(this.character.position.x - 50);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.light);
    this.addObjectsToMap(this.enemies);
    this.enemies.forEach((enemy) => {
      if (enemy.recentDead()) {
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

  /**
   * Adds objects from an array to the map
   * @param {array} objects - an array containing Movable Objects
   * @memberof World
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a movable object to the map
   *
   * @param {MovableObject} mo
   * @memberof World
   */
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
    if (this.enemies[this.enemies.length - 1].hasEntered) {
      this.addToMap(this.statusBarEndboss);
    }
    this.addToMap(this.statusSymbolBubbles);
    this.addToMap(this.statusSymbolCoins);
    this.renderStatusTexts();
  }

  renderStatusTexts() {
    this.ctx.font = "bold 30px LuckiestGuy";
    this.ctx.strokeStyle = "grey";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.character.bubbles, (canvas.width / 6) * 3, 50);
    this.ctx.fillText(this.character.coins, (canvas.width / 6) * 4, 50);
    this.ctx.fillText(this.score, (canvas.width / 6) * 4.8, 50);
  }

  /**
   * Render-function for START and LOADING-states.
   * Renders a background screen, game title and a custom textline to canvas
   * @param {string} message - a message to be rendered on lower part of canvas
   * @memberof World
   */
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

  /**
   * Render-function used for screen after finishing a level or for game over
   * a custom textline can be provided and is rendered as canvas textline
   *
   * @param {string} message - message to be displayed on the screen
   * @memberof World
   */
  renderEndScreen(message) {
    this.screen.renderTransparentBackground();
    this.screen.renderMainMessage(message);
    if (this.character.isDead() || !this.getNextLevel()) this.screen.renderLineScore();
  }

  /**
   * Loads the contents of level selected in currentLevel.
   * Hands over arrays with level contents to world and adjusts
   * settings for some objects.
   *
   * @memberof World
   */
  loadLevelContents() {
    if (this.currentLevel == "level1") {
      this.level = createLevel1();
    } else this.level = createLevel2();
    this.enemies = this.level.enemies;
    this.light = this.level.light;
    this.backgroundObjects = this.level.backgroundObjects;
    this.collectables = this.level.collectables;
    let endboss = this.enemies[this.enemies.length - 1];
    endboss.character = this.character;
    endboss.audio = this.audio;
    this.statusBarEndboss = new StatusBar("HP", endboss.maxHp);
    this.statusBarEndboss.position.x = canvas.width/5*3;
    this.statusBarEndboss.position.y = 380;
  }

  /**
   * Can be used to draw collision frames (with and without offsets) for character, enemies and bubbles
   * @memberof World
   */
  drawCollisionRects() {
    this.character.drawCollisionRect(this.ctx);
    this.enemies.forEach((enemy) => enemy.drawCollisionRect(this.ctx));
    this.character.drawCollisionRectOuter(this.ctx);
    this.enemies.forEach((enemy) => enemy.drawCollisionRectOuter(this.ctx));
    this.bubbles.forEach((bubble) => bubble.drawCollisionRectOuter(this.ctx));
  }
}
