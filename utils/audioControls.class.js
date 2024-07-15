export class AudioControl {
  wooshSound = new Audio("audio/Arm Whoosh A.ogg");
  splashSound = new Audio("audio/water_splashing_short.ogg");
  hitSound = new Audio("audio/hit11_short.ogg");
  hitChar = new Audio("audio/hit15.ogg");
  bubbleSound = new Audio("audio/bubbles-single2.wav");
  poison = new Audio("audio/bubbles-single1.wav");
  coin1 = new Audio("audio/coin1.mp3");
  coin2 = new Audio("audio/coin2.mp3");

  levelComplete = new Audio("audio/level_complete.ogg");

  allSounds = [this.effects, this.menu];

  effects = {
    splash: this.splashSound,
    hitChar: this.hitChar,
    hit: this.hitSound,
    woosh: this.wooshSound,
    bubble: this.bubbleSound,
    poison: this.poison,
    coin1: this.coin1,
    coin2: this.coin2,
  };

  menu = {
    levelComplete: this.levelComplete,
  };

  constructor() {
    console.log("not doing anything");
    this.effects.splash.loop = true;
    this.effects.splash.volume = 0.5;
    this.effects.hit.volume = 0.5;
    this.effects.hitChar.volume = 0.5;
  }

  playCoinSound() {
    let random = Math.random();
    if (random < 0.5) {
      this.coin1.play();
    } else this.coin2.play();
  }

  muteSounds(soundGroup) {
    let sounds = Object.keys(soundGroup);
    sounds.forEach((sound) => (soundGroup[sound].muted = true));
  }

  muteAll() {
    console.log("muting character sound effects");
    this.muteSounds(this.effects);
    this.muteSounds(this.menu);
  }

  unmuteAll() {
    console.log("unmuting sound effects");
    this.unmuteSounds(this.effects);
    this.unmuteSounds(this.menu);
  }

  unmuteSounds(soundGroup) {
    let sounds = Object.keys(soundGroup);
    sounds.forEach((sound) => (soundGroup[sound].muted = false));
  }
}
