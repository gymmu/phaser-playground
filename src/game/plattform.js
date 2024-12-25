import Phaser from "phaser"

export default class Plattform extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 32 * Phaser.Math.Between(1, 4), 32, 0xff0000)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.isStatic = true
    this.body.allowGravity = false
  }
}
