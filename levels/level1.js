import { Level } from "../classes/level.class.js";
import { Enemy } from "../classes/enemy.class.js";
import { Endboss } from "../classes/endboss.class.js";
import { Light } from "../classes/light.class.js";
import { BackgroundObject } from "../classes/background.object.class.js";

export const level1 = new Level(
  [new Enemy(), new Enemy(), new Enemy(), new Endboss()],
  new Light(),
  [
    new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", -720),
    new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", -720),
    new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -720),
    new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", -720),

    new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0),
    new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0),
    new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0),
    new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0),

    new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720),
    new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720),
    new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720),
    new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720),

    new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 1440),
    new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 1440),
    new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 1440),
    new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 1440),
  ]
);
