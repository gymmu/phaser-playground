import Phaser from "phaser"

export default class Plattform extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 32 * Phaser.Math.Between(1, 4), 32, 0xff0000)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setAllowGravity(false)
    this.body.setImmovable(true)
  }
}
