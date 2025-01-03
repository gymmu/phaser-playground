import Phaser from "phaser"

export default class Cave extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y - 32, "doors", "cave")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setAllowGravity(false)
    this.body.setImmovable(true)

    this.setOrigin(0, 0)
  }
}
