import Phaser from "phaser"

import Level01 from "./scenes/levels/level-01.js"
import Level02 from "./scenes/levels/level-02.js"
import LoadingScene from "./scenes/loading-scene.js"
import Level03 from "./scenes/levels/level-03.js"
import UIScene from "./scenes/ui-scene.js"
import DebugScene from "./scenes/debug-scene.js"

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  width: 640,
  height: 480,
  parent: "game-canvas",
  scene: [LoadingScene, UIScene, DebugScene, Level01, Level02, Level03],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
}

const game = new Phaser.Game(config)
