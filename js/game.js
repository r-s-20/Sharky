import { World } from "../classes/world.class.js";
import {Keyboard} from "../classes/keyboard.class.js";

export let keyboard = new Keyboard();
globalThis.keyboard = keyboard;

let canvas;
let world;

window.addEventListener("load", () => {
  canvas = document.getElementById("canvas");
  globalThis.world = new World(canvas);
});



