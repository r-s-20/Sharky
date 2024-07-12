import { World } from "../classes/world.class.js";
import { Keyboard } from "../classes/keyboard.class.js";

export let keyboard = new Keyboard();
globalThis.keyboard = keyboard;

let canvas;
let world;
globalThis.CANVAS_WIDTH = 720;
globalThis.CANVAS_HEIGHT = 480;

window.addEventListener("load", () => {
  canvas = document.getElementById("canvas");
  globalThis.world = new World(canvas);
});

window.addEventListener("keydown", (e) => {
  let container = document.querySelector(".canvas-container");
  let elem = document.getElementById("canvas");
  if (e.key == "f") {
    if (elem.requestFullscreen) {
      // elem.requestFullscreen();
      container.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    }
  }
});
