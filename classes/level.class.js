export class Level {
  enemies;
  light;
  collectables;
  backgroundObjects = [];
  level_end_x = 1450;

  constructor(enemies, light, backgroundObjects, collectables) {
    this.enemies = enemies;
    this.light = light;
    this.backgroundObjects = backgroundObjects;
    this.collectables = collectables;
  }
}
