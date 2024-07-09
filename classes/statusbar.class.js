import { DrawableObject } from "./drawable.object.class.js";

export class StatusBar extends DrawableObject {
  position = { x: 10, y: 50 };
  height = 60;
  width = 200;
  IMAGES = [];
  selected = "";

  constructor(type, maxValue) {
    super();
    this.maxValue = maxValue;
    // this.statusBarTypes = {
    //   HP: "HP",
    //   COINS: "COINS",
    //   BUBBLES: "BUBBLES",
    // };
    // this.type = this.statusBarTypes[type];
    this.type = type;
    console.log("type for statusbar", this.type);
    this.position.y = this.type == "HP" ? 0 : this.type == "COINS" ? 40 : 80;

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
    this.loadImage(this.IMAGES[this.getImageIndex(percent)]);
    // // console.log("updating statusbar", value, this.maxValue, percent);
    // if (percent == 0) {
    //   this.loadImage(this.IMAGES[0]);
    // } else if (percent <= 20) {
    //   this.loadImage(this.IMAGES[1]);
    // } else if (percent > 20 && percent <= 40) {
    //   this.loadImage(this.IMAGES[2]);
    // } else if (percent > 40 && percent <= 60) {
    //   this.loadImage(this.IMAGES[3]);
    // } else if (percent > 60 && percent <= 80) {
    //   this.loadImage(this.IMAGES[4]);
    // } else if (percent > 80 && percent <= 100) {
    //   this.loadImage(this.IMAGES[5]);
    // } else this.loadImage(this.IMAGES[6]);
  }

  getImageIndex(value) {
    // if (value == 100) return 5;
    if (value > 80) return 5;
    else if (value > 60) return 4;
    else if (value > 40) return 3;
    else if (value > 20) return 2;
    else if (value > 0) return 1;
    else return 0;
    // case > 80:
    //   return 4;
    //   case value > 60:
    //   return 3;
    //   case value > 40:
    //   return 2;
    //   case value > 20:
    //   return 1;
    // case value >= 0:
    //   return 0;
  }
}
