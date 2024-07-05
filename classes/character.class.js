class Character extends MovableObject {
  height = 200;
  width = 200;
  IMAGES_IDLE = [];
  otherDirection = false;
  intervalAnimation;
  level;
  idling = true;
  woosh_sound = new Audio("./audio/Arm Whoosh A.ogg");
  rain_sound = new Audio("./audio/Rain.ogg");

  // swimming_sound = new Audio( <pfad zum Audio>)

  constructor(level) {
    super();
    this.loadImage("./img/1.Sharkie/1.IDLE/1.png");
    this.x = 50;
    this.y = 150;
    this.loadImagePaths(this.IMAGES_IDLE, 18, "img/1.Sharkie/1.IDLE/");
    this.loadImages(this.IMAGES_IDLE);
    this.animate();
    this.level = level;
  }

  animate() {
    this.idle();
    let intervalBaseAnimation = setInterval(() => {
      this.rain_sound.pause();
      if (keyboard.RIGHT && this.x < this.level.level_end_x) {
        // clearInterval(this.intervalAnimation);
        this.idling = false;
        this.otherDirection = false;
        this.x += 5;
        this.rain_sound.play();
      } else if (keyboard.LEFT && this.x > -50) {
        this.idling = false;
        // clearInterval(this.intervalAnimation);
        this.otherDirection = true;
        this.x -= 5;
        this.rain_sound.play();
      } else {
        this.idling = true;
      }
    }, 1000 / 60);
  }

  idle() {
    this.intervalAnimation = setInterval(() => {
      if (this.idling) {
        let i = this.currentImage % this.IMAGES_IDLE.length;
        let path = this.IMAGES_IDLE[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 1000 / 5);
  }

  jump() {}
}
