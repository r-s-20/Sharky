import { DrawableObject } from "./drawable.object.class.js";

export class StatusBar extends DrawableObject {
  position = { x: 10, y: 50 };
  height = 60;
  width = 220;
  maxValue;
  IMAGES = [];
  statusBarPaths = {
    "HP": "./img/4. Marcadores/energy_mixedcolors/energy_",
    "COINS": "./img/4. Marcadores/orange/coins_",
    "BUBBLES": "./img/4. Marcadores/orange/bubbles_",
  };
  statusBarPositions = {
    "HP": 0,
    "COINS": 40,
    "BUBBLES": 80,
  };

  /**
   * Creates an instance of StatusBar based on type.
   * Needs a maxValue for that type to correctly calculate 100%-value for Statusbar
   * @param {string} type - might be "HP", "COINS" or "BUBBLES"
   * @param {number} maxValue - the maximal Value for type
   * @memberof StatusBar
   */
  constructor(type, maxValue) {
    super();
    this.maxValue = maxValue;
    this.position.y = this.statusBarPositions[type];

    this.loadImagePaths(this.IMAGES, 6, this.statusBarPaths[type]);
    this.loadImages(this.IMAGES);
    this.loadImage(this.IMAGES[5]);
  }

  /**
   * Calculates percentage from provided value based on maxValue and updates
   * the StatusBar image according to resulting percentage
   *
   * @param {number} value - current value of character hp, coins or bubbles
   * @memberof StatusBar
   */
  update(value) {
    let percent = Math.round((value / this.maxValue) * 100);
    this.loadImage(this.IMAGES[this.getImageIndex(percent)]);
  }

  /**
   * Assings different image versions of status bar for given percentage
   *
   * @param {number} value - up to date percent value of type (hp, coin or bubbles)
   * @return {number} - index of image that reflects the correct percentage
   * @memberof StatusBar
   */
  getImageIndex(value) {
    if (value > 80) return 5;
    else if (value > 60) return 4;
    else if (value > 40) return 3;
    else if (value > 20) return 2;
    else if (value > 0) return 1;
    else return 0;
  }
}
