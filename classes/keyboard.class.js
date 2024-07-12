export class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  SHOOT = false;
  ENTER = false;

  constructor() {
    document.getElementById("start-btn").addEventListener("click", (e) => {
      this.ENTER = true;
      setTimeout(() => (this.ENTER = false), 200);
    });

    document.getElementById("controls-btn").addEventListener("click", (e) => {
      this.CONTROLS = true;
      setTimeout(() => (this.CONTROLS = false), 200);
    });

    document.getElementById("close-menu-btn").addEventListener("click", (e) => {
      this.ESC = true;
      setTimeout(() => (this.ESC = false), 200);
    });

    document.getElementById("close-menu-btn").addEventListener("click", (e) => {
      this.ESC = true;
      setTimeout(() => (this.ESC = false), 200);
    });

    document.getElementById("btn-right").addEventListener("mousedown", (e) => {
      this.RIGHT = true;
      console.log(this);
    });
    
    document.getElementById("btn-right").addEventListener("mouseup", (e) => {
      this.RIGHT = false;
      console.log(this);
    });

    document.getElementById("btn-right").addEventListener("mouseout", (e) => {
      this.RIGHT = false;
      console.log(this);
    });

    document.getElementById("btn-left").addEventListener("mousedown", (e) => {
      this.LEFT = true;
      console.log(this);
    });
    
    document.getElementById("btn-left").addEventListener("mouseup", (e) => {
      this.LEFT = false;
      console.log(this);
    });

    document.getElementById("btn-left").addEventListener("mouseout", (e) => {
      this.LEFT = false;
      console.log(this);
    });

    document.getElementById("btn-up").addEventListener("mousedown", (e) => {
      this.UP = true;
      console.log(this);
    });
    
    document.getElementById("btn-up").addEventListener("mouseup", (e) => {
      this.UP = false;
      console.log(this);
    });

    document.getElementById("btn-up").addEventListener("mouseout", (e) => {
      this.UP = false;
      console.log(this);
    });

    document.getElementById("btn-down").addEventListener("mousedown", (e) => {
      this.DOWN = true;
      console.log(this);
    });
    
    document.getElementById("btn-down").addEventListener("mouseup", (e) => {
      this.DOWN = false;
      console.log(this);
    });

    document.getElementById("btn-down").addEventListener("mouseout", (e) => {
      this.DOWN = false;
      console.log(this);
    });
    
    document.getElementById("btn-shoot").addEventListener("mousedown", (e) => {
      this.SHOOT = true;
      console.log(this);
    });
    
    document.getElementById("btn-shoot").addEventListener("mouseup", (e) => {
      this.SHOOT = false;
      console.log(this);
    });
    
    document.getElementById("btn-shoot").addEventListener("mouseout", (e) => {
      this.SHOOT = false;
      console.log(this);
    });

    window.addEventListener("keydown", (e) => {
      console.log(e);
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
        case "Escape":
          this.ESC = false;
          break;
        case "c":
          this.CONTROLS = false;
          break;
      }
      // console.log("release", this);
    });
  }
}
