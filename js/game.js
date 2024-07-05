let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World();
}

window.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key == "ArrowUp") {
    keyboard.UP = true;
  } else if (e.key == "ArrowDown") {
    keyboard.DOWN = true;
  } else if (e.key == "ArrowLeft") {
    keyboard.LEFT = true;
  } else if (e.key == "ArrowRight") {
    keyboard.RIGHT = true;
  } else if (e.keycode = 65) {
    keyboard.LEFT = true;
    console.log("a was pressed");
  } else if (e.keycode = 32) {
    keyboard.SPACE = true;
  }

  // console.log(keyboard);
});

window.addEventListener("keyup", (e) => {
  if (e.key == "ArrowUp") {
    keyboard.UP = false;
  } else if (e.key == "ArrowDown") {
    keyboard.DOWN = false;
  } else if (e.key == "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (e.key == "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (e.keycode = 32) {
    keyboard.SPACE = false;
  // } else if (e.key = "a") {
  //   keyboard.LEFT = false;
  }
  // console.log(keyboard);
});
