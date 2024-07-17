import { Level } from "../classes/level.class.js";
import { Enemy } from "../classes/enemy.class.js";
import { Pufferfish2 } from "../classes/pufferfish2.class.js";
import { Endboss } from "../classes/endboss.class.js";
import { Light } from "../classes/light.class.js";
import { BackgroundObject } from "../classes/background.object.class.js";
import { CollectableObject } from "../classes/collectable-object.class.js";

export function createLevel1() {
  const level1 = new Level(
    [new Enemy(), new Pufferfish2(), new Enemy(), new Enemy(), new Endboss(20)],
    new Light(),
    [
      new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", -CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", -CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", -CANVAS_WIDTH),

      new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0),
      new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0),

      new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", CANVAS_WIDTH),

      new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 2*CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 2*CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 2*CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 2*CANVAS_WIDTH),

      
    ],
    [
      new CollectableObject("POISON"),
      new CollectableObject("POISON"),
      new CollectableObject("POISON"),
      new CollectableObject("POISON"),
      new CollectableObject("POISON"),
      new CollectableObject("COIN"),
      new CollectableObject("COIN"),
      new CollectableObject("COIN"),
      new CollectableObject("COIN"),
      new CollectableObject("COIN"),
    ], 
    1400
  );
  return level1;
}
