import Phaser from "phaser"
import Player from "../player"

export default class Intro extends Phaser.Scene {
  constructor() {
    super({ key: "game" })
    this.player = null
  }

  preload() {
    // Load the assets here
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  create() {
    // Create the level here
    this.player = new Player(this, 100, 200)
  }

  update() {
    // Updates for the game loop
    if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
      this.jump()
    }
  }

  jump() {
    this.player.body.setVelocityY(-300)
  }
}
