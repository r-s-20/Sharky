import { MovableObject } from "./movable.object.class.js";

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

  constructor(type) {
    super();
    this.type = type;
    this.speed = this.itemSpeed[type];
    this.position.x = 50 + Math.random() *900;
    this.position.y = 10 + 340 * Math.random();
    this.loadImagePaths(this.IMAGES, this.imageCount[type], this.itemPaths[type]);
    this.loadImages(this.IMAGES);
    this.loadImage(this.IMAGES[1]);
  this.animate();
  }

  animate() {
    setInterval( () => {
    this.playAnimation(this.IMAGES);
}, 1000/this.speed);

  }
}
