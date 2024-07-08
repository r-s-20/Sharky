import { World } from "../classes/world.class.js";
import {Keyboard} from "../classes/keyboard.class.js";

let canvas;
let world;
let keyboard = new Keyboard();

window.addEventListener("load", () => {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
});



