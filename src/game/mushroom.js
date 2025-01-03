import Phaser from "phaser"

export default class Mushroom extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y - 32, "pickups", "mushroom")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setAllowGravity(false)
    this.body.setImmovable(true)

    this.setOrigin(0, 0)
    this.setSize(16, 16)
    this.setOffset(16, 16)
  }
}
