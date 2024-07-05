class World {
  ctx;
  level = level1;
  character = new Character(this);
  enemies = this.level.enemies;
  light = this.level.light;
  backgroundObjects = this.level.backgroundObjects;
  camera_x = 0;

  constructor() {
    this.ctx = canvas.getContext("2d");
    this.draw();
    // this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.reset();
    this.camera_x = -(this.character.x - 50);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.light);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    this.character.drawCollisionRectChar(this.ctx);
    this.enemies.forEach((enemy) => enemy.drawCollisionRectInner(this.ctx));
    // this.character.drawCollisionRectOuter(this.ctx);
    // this.enemies.forEach((enemy) => enemy.drawCollisionRectOuter(this.ctx));

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
}
