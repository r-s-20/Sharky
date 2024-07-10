export class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  SHOOT = false;

  constructor() {
    window.addEventListener("keydown", (e) => {
      // console.log(e);
      switch (e.key) {
        case "ArrowUp":
          this.UP = true;
          break;
        case "w":
          this.UP = true;
          break;
        case "ArrowDown":
          this.DOWN = true;
          break;
        case "s":
          this.DOWN = true;
          break;
        case "ArrowLeft":
          this.LEFT = true;
          break;
        case "a":
          this.LEFT = true;
          break;
        case "ArrowRight":
          this.RIGHT = true;
          break;
        case "d":
          this.RIGHT = true;
          break;
        case " ":
          this.SPACE = true;
          break;
        case "e":
          this.SHOOT = true;
          break;
        case "Enter":
          this.ENTER = true;
          break;
      }
      // console.log(e);
      // console.log(this);
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.UP = false;
          break;
        case "w":
          this.UP = false;
          break;
        case "ArrowDown":
          this.DOWN = false;
          break;
        case "s":
          this.DOWN = false;
          break;
        case "ArrowLeft":
          this.LEFT = false;
          break;
        case "a":
          this.LEFT = false;
          break;
        case "ArrowRight":
          this.RIGHT = false;
          break;
        case "d":
          this.RIGHT = false;
          break;
        case " ":
          this.SPACE = false;
          break;
        case "e":
          this.SHOOT = false;
          break;
        case "Enter":
          this.ENTER = false;
          break;
      }
      // console.log("release", this);
    });
  }
}
