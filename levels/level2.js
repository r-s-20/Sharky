import { Level } from "../classes/level.class.js";
import { Enemy } from "../classes/enemy.class.js";
import { Endboss } from "../classes/endboss.class.js";
import { Light } from "../classes/light.class.js";
import { BackgroundObject } from "../classes/background.object.class.js";
import { CollectableObject } from "../classes/collectable-object.class.js";

export function createLevel2() {
  const level1 = new Level(
    [new Enemy(), new Enemy(), new Enemy(), new Endboss()],
    new Light(),
    [
      new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", -720),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", -720),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", -720),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", -720),

      new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", 0),

      new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", 720),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", 720),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", 720),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", 720),

      new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", 1440),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", 1440),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", 1440),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", 1440),
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
    ]
  );
  return level1;
}
