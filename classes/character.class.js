class Character extends MovableObject {
  height = 200;
  width = 200;
  speedY = 0;
  speedX = 5;
  offsetX = 38;
  offsetY = 95;
  offsetHeight = -137;
  offsetWidth = -75;
  acceleration = 0.2;
  IMAGES_IDLE = [];
  IMAGES_SWIM = [];
  otherDirection = false;
  intervalAnimation;
  level;
  world;
  idling = true;
  swimming = false;
  woosh_sound = new Audio("./audio/Arm Whoosh A.ogg");
  rain_sound = new Audio("./audio/Rain.ogg");

  constructor(world) {
    super();
    this.world = world;
    this.x = 50;
    this.y = 50;
    this.loadImagePaths(this.IMAGES_IDLE, 18, "img/1.Sharkie/1.IDLE/");
    this.loadImagePaths(this.IMAGES_SWIM, 6, "img/1.Sharkie/3.Swim/");

    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIM);

    this.loadImage(this.IMAGES_IDLE[0]);
    this.animate();
    this.level = this.world.level;
  }

  animate() {
    let frameCount = 0;
    this.idle();
    this.applyGravity();
    let intervalBaseAnimation = setInterval(() => {
      frameCount = frameCount++;
      this.rain_sound.pause();
      this.world.enemies.forEach((enemy) => {
        if (this.isColliding(enemy)) {
          console.log("collision detected");
        }
      });
      if (keyboard.RIGHT && this.x < this.level.level_end_x) {
        this.otherDirection = false;
        this.swim();
      }
      if (keyboard.LEFT && this.x > -50) {
        this.otherDirection = true;
        this.swim();
      }
      if (keyboard.UP) {
        this.jump();
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

  swim() {
    this.idling = false;
    if (this.otherDirection) {
      this.x -= this.speedX;
    } else {
      this.x += this.speedX;
    }
    this.rain_sound.play();

    this.playAnimation(this.IMAGES_SWIM);
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 230;
  }

  stopAnimation() {
    clearInterval(this.animationInterval);
  }

  jump() {
    this.speedY = 3;
  }

  drawCollisionRectChar(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.width + this.offsetWidth,
      this.height + this.offsetHeight
    );
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  isColliding(obj) {
    return (
      // this.X + this.width >= obj.X &&
      // this.X <= obj.X + obj.width &&
      // this.Y + this.offsetY + this.height >= obj.Y &&
      // this.Y + this.offsetY <= obj.Y + obj.height
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
    );
    // obj.onCollisionCourse;
  }
}
