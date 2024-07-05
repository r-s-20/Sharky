let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World();
}

window.addEventListener("keydown", (e) => {
  // console.log(e);
  switch (e.key) {
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "w":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case "s":
      keyboard.DOWN = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "a":
      keyboard.LEFT = true;
      break;
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "d":
      keyboard.RIGHT = true;
      break;
    case " ":
      keyboard.SPACE = true;
      break;
  }
  // console.log(e);
  // console.log(keyboard);
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "w":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
    case "s":
      keyboard.DOWN = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "a":
      keyboard.LEFT = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "d":
      keyboard.RIGHT = false;
      break;
    case " ":
      keyboard.SPACE = false;
      break;
  }
  // console.log(keyboard);
});
