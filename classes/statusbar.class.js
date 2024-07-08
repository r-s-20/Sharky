import { DrawableObject } from "./drawable.object.class.js";

export class StatusBar extends DrawableObject {
  x = 10;
  y = 50;
  height = 60;
  width = 200;
  IMAGES = [];
  selected = "";

  constructor(type, maxValue) {
    super();
    this.maxValue = maxValue;
    this.statusBarTypes = {
      1: "HP",
      2: "COINS",
      3: "BUBBLES",
    };
    this.y = type == "HP" ? 0 : type == "COINS" ? 40 : 80;

    if (type == "HP") {
      this.selected = "img/4. Marcadores/orange/energy_";
    } else if (type == "COINS") {
      this.selected = "img/4. Marcadores/orange/coins_";
    } else if (type === "BUBBLES") {
      this.selected = "img/4. Marcadores/orange/bubbles_";
    }

    this.loadImagePaths(this.IMAGES, 6, this.selected);
    this.loadImage(this.IMAGES[5]);
  }

  update(value) {
    let percent = Math.round((value / this.maxValue) * 100);
    // console.log("updating statusbar", value, this.maxValue, percent);
    if (percent == 0) {
      this.loadImage(this.IMAGES[0]);
    } else if (percent <= 20) {
      this.loadImage(this.IMAGES[1]);
    } else if (percent > 20 && percent <= 40) {
      this.loadImage(this.IMAGES[2]);
    } else if (percent > 40 && percent <= 60) {
      this.loadImage(this.IMAGES[3]);
    } else if (percent > 60 && percent <= 80) {
      this.loadImage(this.IMAGES[4]);
    } else if (percent > 80 && percent <= 100) {
      this.loadImage(this.IMAGES[5]);
    } else this.loadImage(this.IMAGES[6]);
  }
}
