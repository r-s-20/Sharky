import { MovableObject } from "./movable.object.class.js";

/**
 * Provides two kinds of collectable objects: Coins and poison.
 *
 * @export
 * @class CollectableObject
 * @extends {MovableObject}
 */
export class CollectableObject extends MovableObject {
  IMAGES = [];
  itemPaths = {
    "POISON": "img/4. Marcadores/Posión/Animada/",
    "COIN": "img/4. Marcadores/1. Coins/",
  };
  itemSpeed = {
    "POISON": 15,
    "COIN": 6
  }
  imageCount = {
    "POISON": 8,
    "COIN": 4,
  };
  height = 50;
  width = 50;

  /**
   * Creates an instance of CollectableObject.
   * y-Position is calculated randomly based on canvas height.
   * x-Position is calculated randomly, but are on x-axis can be specified.
   * Default for x-Position makes enemy appear near character spawn position.
   * @param {string} type - might be "COIN" or "POISON"
   * @param {number} [areaX=900] - the area on x-axis where object shall spawn.
   * @memberof CollectableObject
   */
  constructor(type, areaX=900) {
    super();
    this.type = type;
    this.speed = this.itemSpeed[type];
    this.position.x = 50 + Math.random() *areaX;
    this.position.y = 10 + 340 * Math.random();
    this.loadImagePaths(this.IMAGES, this.imageCount[type], this.itemPaths[type]);
    this.loadImages(this.IMAGES);
    this.loadImage(this.IMAGES[1]);
  this.animate();
  }

  /**
   * Plays a simple animation in endless loop based on itemSpeed (number)
   * @memberof CollectableObject
   */
  animate() {
    setInterval( () => {
    this.playAnimation(this.IMAGES);
}, 1000/this.speed);

  }
}
