import { MovableObject } from "./movable.object.class.js";

export class ThrowableObject extends MovableObject {
  width = 35;
  height = 35;
  type;
  damage;

  constructor(character, type = "normal") {
    super();
    this.type = type;
    this.character = character;
    this.direction = this.getDirection();
    this.position.x = this.getPosition(character);
    this.position.y = character.position.y + character.offset.y + this.width / 2;
    if (this.type == "normal") this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    else this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    this.damage = this.type == "normal" ? 1 : 5;
  }

  getPosition(character) {
    if (character.otherDirection == true) return character.position.x;
    else return character.position.x + (character.width + character.offset.width + this.width);
  }

  update() {
    this.position.x += 1 * this.direction;
  }

  getDirection() {
    if (this.character.otherDirection) {
      return -1;
    }
    return 1;
  }
}
