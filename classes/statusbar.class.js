import { DrawableObject } from "./drawable.object.class.js";

export class StatusBar extends DrawableObject {
  position = { x: 10, y: 50 };
  height = 60;
  width = 220;
  maxValue;
  IMAGES = [];
  statusBarPaths = {
    "HP": "../img/4. Marcadores/energy_mixedcolors/energy_",
    "COINS": "../img/4. Marcadores/orange/coins_",
    "BUBBLES": "../img/4. Marcadores/orange/bubbles_",
  };
  statusBarPositions = {
    "HP": 0,
    "COINS": 40,
    "BUBBLES": 80,
  };

  constructor(type, maxValue) {
    super();
    this.maxValue = maxValue;
    this.position.y = this.statusBarPositions[type];

    this.loadImagePaths(this.IMAGES, 6, this.statusBarPaths[type]);
    this.loadImages(this.IMAGES);
    this.loadImage(this.IMAGES[5]);
  }

  update(value) {
    let percent = Math.round((value / this.maxValue) * 100);
    this.loadImage(this.IMAGES[this.getImageIndex(percent)]);
  }

  getImageIndex(value) {
    if (value > 80) return 5;
    else if (value > 60) return 4;
    else if (value > 40) return 3;
    else if (value > 20) return 2;
    else if (value > 0) return 1;
    else return 0;
  }
}
