import Phaser from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, number) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = true

    this.setControls()
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update() {
    const { body } = this
    const { left, right, space } = this.cursor
    if (left.isDown) {
      body.setVelocityX(-100)
    } else if (right.isDown) {
      this.body.setVelocityX(100)
    } else {
      this.body.setVelocityX(0)
    }
    if (space.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-250)
    }
  }
}
