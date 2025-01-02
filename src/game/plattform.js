import Phaser from "phaser"

export default class Plattform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "pickups", 0)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setAllowGravity(false)
    this.body.setImmovable(true)

    this.texture.get("mushroom")
  }
}
