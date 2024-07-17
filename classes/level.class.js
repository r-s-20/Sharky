export class Level {
  enemies;
  light;
  collectables;
  backgroundObjects = [];
  level_end_x = 1450;

  constructor(enemies, light, backgroundObjects, collectables, level_end_x) {
    this.enemies = enemies;
    this.light = light;
    this.backgroundObjects = backgroundObjects;
    this.collectables = collectables;
    this.level_end_x = level_end_x;
  }
}
