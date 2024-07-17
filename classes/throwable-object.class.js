import { MovableObject } from "./movable.object.class.js";

/**
 * Throwable object is a normal or a poisoned bubble based on provided type
 * this object will move and can collide with other objects
 *
 * @export
 * @class ThrowableObject
 * @extends {MovableObject}
 */
export class ThrowableObject extends MovableObject {
  width = 35;
  height = 35;
  type;
  damage;

  /**
   * Creates an instance of ThrowableObject.
   * Needs character to calculate x- und y-positions for creation
   * and to set direction of movement
   * @param {Character} character
   * @param {string} [type="normal"] - will create a blue bubble if normal, otherwise a green bubble
   * @memberof ThrowableObject
   */
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

  /**
   * Returns refined x-position for creating the bubble depending on direction,
   *  offsets and width-values
   * @param {Character} character 
   * @returns {number}
   */
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
