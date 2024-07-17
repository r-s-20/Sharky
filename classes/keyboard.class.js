export class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  SHOOT = false;
  ENTER = false;
  MUTE = false;

  constructor() {
    document.getElementById("start-btn").addEventListener("click", (e) => {
      this.ENTER = true;
      setTimeout(() => (this.ENTER = false), 100);
    });

    document.getElementById("audio-on").addEventListener("mousedown", (e) => {
      this.MUTE = true;
    });

    document.getElementById("audio-on").addEventListener("touchstart", (e) => {
      this.MUTE = true;
    });

    document.getElementById("audio-on").addEventListener("touchend", (e) => {
      this.MUTE = false;
    });

    document.getElementById("audio-on").addEventListener("mouseup", (e) => {
      this.MUTE = false;
    });

    document.getElementById("audio-off").addEventListener("mousedown", (e) => {
      this.MUTE = true;
    });

    document.getElementById("audio-off").addEventListener("mouseup", (e) => {
      this.MUTE = false;
    });

    document.getElementById("audio-off").addEventListener("touchstart", (e) => {
      this.MUTE = true;
    });

    document.getElementById("audio-off").addEventListener("touchend", (e) => {
      this.MUTE = false;
    });

    document.getElementById("controls-btn").addEventListener("click", (e) => {
      this.CONTROLS = true;
      setTimeout(() => (this.CONTROLS = false), 100);
    });

    document.getElementById("close-menu-btn").addEventListener("click", (e) => {
      this.ESC = true;
      setTimeout(() => (this.ESC = false), 100);
    });

    document.getElementById("close-menu-btn").addEventListener("click", (e) => {
      this.ESC = true;
      setTimeout(() => (this.ESC = false), 100);
    });

    document.getElementById("curtain").addEventListener("click", (e) => {
      this.ESC = true;
      setTimeout(() => (this.ESC = false), 100);
    });

    document.getElementById("curtain").addEventListener("click", (e) => {
      this.ESC = true;
      setTimeout(() => (this.ESC = false), 100);
    });

    document.getElementById("btn-right").addEventListener("mousedown", (e) => {
      this.RIGHT = true;
    });

    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });

    document.getElementById("btn-right").addEventListener("mouseup", (e) => {
      this.RIGHT = false;
    });

    document.getElementById("btn-right").addEventListener("touchend", (e) => {
      this.RIGHT = false;
    });

    document.getElementById("btn-right").addEventListener("mouseout", (e) => {
      this.RIGHT = false;
    });

    document.getElementById("btn-left").addEventListener("mousedown", (e) => {
      this.LEFT = true;
    });

    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });

    document.getElementById("btn-left").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    document.getElementById("btn-left").addEventListener("mouseup", (e) => {
      this.LEFT = false;
    });

    document.getElementById("btn-left").addEventListener("mouseout", (e) => {
      this.LEFT = false;
    });

    document.getElementById("btn-up").addEventListener("mousedown", (e) => {
      this.UP = true;
    });

    document.getElementById("btn-up").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.UP = true;
    });

    document.getElementById("btn-up").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.UP = false;
    });

    document.getElementById("btn-up").addEventListener("mouseup", (e) => {
      this.UP = false;
    });

    document.getElementById("btn-up").addEventListener("mousein", (e) => {
      this.UP = true;
    });

    document.getElementById("btn-up").addEventListener("mouseout", (e) => {
      this.UP = false;
    });

    document.getElementById("btn-down").addEventListener("mousedown", (e) => {
      this.DOWN = true;
    });

    document.getElementById("btn-down").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.DOWN = true;
    });

    document.getElementById("btn-down").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.DOWN = false;
    });

    document.getElementById("btn-down").addEventListener("mouseup", (e) => {
      this.DOWN = false;
    });

    document.getElementById("btn-down").addEventListener("mouseout", (e) => {
      this.DOWN = false;
    });

    document.getElementById("btn-shoot").addEventListener("mousedown", (e) => {
      this.SHOOT = true;
    });

    document.getElementById("btn-shoot").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SHOOT = true;
    });

    document.getElementById("btn-shoot").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SHOOT = false;
    });

    document.getElementById("btn-shoot").addEventListener("mouseup", (e) => {
      this.SHOOT = false;
    });

    document.getElementById("btn-shoot").addEventListener("mouseout", (e) => {
      this.SHOOT = false;
    });

    document.getElementById("btn-finslap").addEventListener("mousedown", (e) => {
      this.FINSLAP = true;
    });

    document.getElementById("btn-finslap").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.FINSLAP = true;
    });

    document.getElementById("btn-finslap").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.FINSLAP = false;
    });

    document.getElementById("btn-finslap").addEventListener("mouseup", (e) => {
      this.FINSLAP = false;
    });

    document.getElementById("btn-finslap").addEventListener("mouseout", (e) => {
      this.FINSLAP = false;
    });

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
        case "Escape":
          this.ESC = true;
          break;
        case "c":
          this.CONTROLS = true;
          break;
        case "q":
          this.FINSLAP = true;
          break;
        case "m":
          this.MUTE = true;
          break;
      }
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
        case "Escape":
          this.ESC = false;
          break;
        case "c":
          this.CONTROLS = false;
          break;
        case "q":
          this.FINSLAP = false;
          break;
        case "m":
          this.MUTE = false;

          break;
      }
    });
  }
}
