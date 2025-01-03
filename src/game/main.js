import Phaser from "phaser"

import Intro from "./scenes/intro.js"

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  width: 640,
  height: 480,
  parent: "game-canvas",
  scene: Intro,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
}

const game = new Phaser.Game(config)
