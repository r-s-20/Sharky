export class AudioControl {
  wooshSound = new Audio("audio/Arm Whoosh A.ogg");
  splashSound = new Audio("audio/water_splashing_short.ogg");
  hitSound = new Audio("audio/hit11_short.ogg");
  hitChar = new Audio("audio/hit15.ogg");
  bubbleHit = new Audio("audio/bubbles-single3.wav");
  bubbleSound = new Audio("audio/bubbles-single2.wav");
  poison = new Audio("audio/bubbles-single1.wav");
  coin1 = new Audio("audio/coin1.mp3");
  coin2 = new Audio("audio/coin2.mp3");
  charDead = new Audio("audio/spring_07.ogg");
  backgroundLevel = new Audio("audio/underwater-ambience-6201.mp3");
  backgroundMenu = new Audio("audio/TylerSong3_Normal.ogg");
  entryEndboss = new Audio("audio/explosion-fuzzy1.wav");
  bossAttack = new Audio("audio/bossAttack.ogg");
  menuButton = new Audio("audio/switch_01.ogg");

  levelComplete = new Audio("audio/level_complete.ogg");

  background = {
    menu: this.backgroundMenu,
    level: this.backgroundLevel,
  };
  effects = {
    splash: this.splashSound,
    hitChar: this.hitChar,
    hit: this.hitSound,
    woosh: this.wooshSound,
    bubble: this.bubbleSound,
    bubbleHit: this.bubbleHit,
    poison: this.poison,
    coin1: this.coin1,
    coin2: this.coin2,
    charDead: this.charDead,
    entryEndboss: this.entryEndboss,
    bossAttack: this.bossAttack,
  };

  menu = {
    levelComplete: this.levelComplete,
    button: this.menuButton,
  };

  allSounds = [this.effects, this.menu, this.background];

  constructor() {
    this.effects.splash.loop = true;
    this.effects.splash.volume = 0.5;
    this.effects.hit.volume = 0.5;
    this.effects.hitChar.volume = 0.5;
    this.effects.bubbleHit.volume = 1;
    this.background.menu.volume = 0.3;
    this.effects.entryEndboss.volume = 0.3;
    this.effects.bossAttack.volume = 0.3;
    this.menu.button.volume = 0.4;
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
    this.allSounds.forEach((soundGroup) => this.muteSounds(soundGroup));
  }

  unmuteAll() {
    this.allSounds.forEach((soundGroup) => this.unmuteSounds(soundGroup));
  }

  unmuteSounds(soundGroup) {
    let sounds = Object.keys(soundGroup);
    sounds.forEach((sound) => (soundGroup[sound].muted = false));
  }
}
