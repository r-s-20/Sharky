import { Level } from "../classes/level.class.js";
import { Enemy } from "../classes/enemy.class.js";
import { Endboss } from "../classes/endboss.class.js";
import { Pufferfish2 } from "../classes/pufferfish2.class.js";
import { Light } from "../classes/light.class.js";
import { BackgroundObject } from "../classes/background.object.class.js";
import { CollectableObject } from "../classes/collectable-object.class.js";

export function createLevel2() {
  const level1 = new Level(
    [
      new Enemy(CANVAS_WIDTH),
      new Enemy(2 * CANVAS_WIDTH),
      new Enemy(2 * CANVAS_WIDTH),
      new Pufferfish2(2.8 * CANVAS_WIDTH),
      new Pufferfish2(3.8 * CANVAS_WIDTH),
      new Pufferfish2(3.8 * CANVAS_WIDTH),
      new Enemy(3.8 * CANVAS_WIDTH),
      new Enemy(3.8 * CANVAS_WIDTH),
      new Enemy(3.8 * CANVAS_WIDTH),
      new Enemy(3.5 * CANVAS_WIDTH),
      new Endboss(35, 3.8 * CANVAS_WIDTH),
    ],
    new Light(),
    [
      new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", -CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", -CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", -CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", -CANVAS_WIDTH),

      new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", 0),

      new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", CANVAS_WIDTH),

      new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", 2 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", 2 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", 2 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", 2 * CANVAS_WIDTH),

      new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", 3 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", 3 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", 3 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", 3 * CANVAS_WIDTH),

      new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", 4 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", 4 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", 4 * CANVAS_WIDTH),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", 4 * CANVAS_WIDTH),
    ],
    [
      new CollectableObject("POISON", CANVAS_WIDTH * 3.8),
      new CollectableObject("POISON", CANVAS_WIDTH * 3.8),
      new CollectableObject("POISON", CANVAS_WIDTH * 3.8),
      new CollectableObject("POISON", CANVAS_WIDTH * 3.8),
      new CollectableObject("POISON", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
      new CollectableObject("COIN", CANVAS_WIDTH * 3.8),
    ],
    4 * CANVAS_WIDTH
  );
  return level1;
}
