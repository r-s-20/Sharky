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
  IMAGES_DEAD_POISON = [];
  IMAGES_HURT_POISON = [];
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
    this.loadImagePaths(
      this.IMAGES_DEAD_POISON,
      12,
      "./img/1.Sharkie/6.dead/1.Poisoned/"
    );
    this.loadImagePaths(this.IMAGES_HURT_POISON, 4, "img/1.Sharkie/5.Hurt/1.Poisoned/");

    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD_POISON);
    this.loadImages(this.IMAGES_HURT_POISON);

    this.loadImage(this.IMAGES_IDLE[0]);
    this.animate();
    this.level = this.world.level;
  }

  animate() {
    this.idle();
    this.applyGravity();
    let intervalBaseAnimation = setInterval(() => {
      this.rain_sound.pause();
      if (!this.isDead()) {
        // this.world.enemies.forEach((enemy) => {
        //   if (this.isColliding(enemy)) {
        //     console.log("collision detected");
        //   }
        // });
        if (keyboard.RIGHT && this.x < this.level.level_end_x) {
          this.otherDirection = false;
          this.swim();
        } else if (keyboard.LEFT && this.x > -50) {
          this.otherDirection = true;
          this.swim();
        } else {
          if (this.isHurt()) {
            console.log("has a recent hit");
            this.hurt();
          }
          this.idling = true;
        }
        if (keyboard.UP) {
          this.jump();
        }
      }
    }, 1000 / 30);

    // setInterval(() => {
    //   if (this.isHurt()) {
    //     console.log("has a recent hit");
    //     this.hurt();
    //   }
    // }, 1000 / 60);
  }

  idle() {
    this.intervalAnimation = setInterval(() => {
      if (this.idling) {
        let i = this.currentImage % this.IMAGES_IDLE.length;
        let path = this.IMAGES_IDLE[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 1000 / 15);
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

  hurt(IMAGES = this.IMAGES_HURT_POISON) {
    this.currentImage = 0;
    let counter = 0;
    let hurtInterval = setInterval(() => {
      this.idling = false;
      if (!this.isDead()) {
        if (this.isHurt()) {
          clearInterval(hurtInterval);
        }
        this.playAnimation(IMAGES);
        counter++;
      }
    }, 1000 / 30);
    this.idling = true;
  }
}
