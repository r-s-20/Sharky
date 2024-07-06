class World {
  ctx;
  level = level1;
  character = new Character(this);
  enemies = this.level.enemies;
  light = this.level.light;
  backgroundObjects = this.level.backgroundObjects;
  camera_x = 0;
  gameRunning = true;
  gameOver = false;

  constructor() {
    this.ctx = canvas.getContext("2d");
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
    this.camera_x = -(this.character.x - 50);
    this.ctx.translate(this.camera_x, 0);

    if (this.gameRunning && !this.gameOver) {
      this.addObjectsToMap(this.backgroundObjects);
      this.addToMap(this.light);
      this.addObjectsToMap(this.enemies);
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
    console.log("writing game over");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.strokeStyle = "white";
    this.ctx.font = "50px Georgia";
    this.ctx.strokeText("GAME OVER", this.character.x + 150, canvas.height / 2);
  }
}
