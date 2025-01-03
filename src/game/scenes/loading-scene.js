import Phaser from "phaser"
import HelperScene from "./helper-scene"

/**
 * Spiellogik für das Level02.
 */
export default class LoadingScene extends HelperScene {
  constructor() {
    super({ key: "loading" })
  }

  preload() {
    // Load the assets here
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.image("tileset", "./assets/ground_extruded.png")
    this.load.atlas(
      "pickups",
      "./assets/ground.png",
      "./assets/atlas/ground.json",
    )
    this.load.atlas("doors", "./assets/ground.png", "./assets/atlas/doors.json")

    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  create() {
    this.add
      .text(320, 240, "Press SPACE to start the Game.")
      .setOrigin(0.5, 0.5)
  }

  update() {
    if (this.SPACE.isDown) {
      this.scene.start("level-01")
    }
  }
}
