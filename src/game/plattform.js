import Phaser from "phaser"

export default class Plattform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "pickups", "mushroom")
    this.scene.add.existing(this)
    //this.scene.textures.setTexture("tileset", "mushroom")
    this.scene.physics.add.existing(this)
    this.body.setAllowGravity(false)
    this.body.setImmovable(true)

    this.setOrigin(0, 0)
  }
}
