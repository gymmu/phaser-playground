import Phaser from "phaser"
import Player from "../player"
import Plattform from "../plattform"

export default class Intro extends Phaser.Scene {
  constructor() {
    super({ key: "game" })
    this.player = null

    this.NUM_PLATTFORMS = Phaser.Math.Between(2, 5)
  }

  preload() {
    //this.platformGroup = this.add.group()
    // Load the assets here
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  create() {
    this.platforms = this.add.group()
    //this.physics.add.staticGroup()
    // Create the level here
    this.player = new Player(this, 100, 200)
    for (let i = 0; i < this.NUM_PLATTFORMS; i++) {
      const new_plattform = new Plattform(
        this,
        32 * Phaser.Math.Between(0, 20),
        32 * Phaser.Math.Between(0, 15),
      )
      this.platforms.add(new_plattform)
    }

    this.physics.add.collider(this.platforms, this.player)
  }

  update() {
    // Updates for the game loop
    if (this.player) this.player.update()
  }

  hitFloor(platform, player) {
    console.log("Hit floor")
  }
}
