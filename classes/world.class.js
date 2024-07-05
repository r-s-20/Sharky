class World {
  ctx;
  level=level1;
  character = new Character(this.level);
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
    // this.character.world = this;
  }

  draw() {
    this.ctx.reset();
    this.camera_x = -(this.character.x - 50);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.light);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    // this.ctx.translate(-this.camera_x, 0);

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
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
}
