import Phaser from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, number) {
    super(scene, x, y, "player")
    this.setOrigin(0.5)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.collideWorldBounds = true
    this.setScale(1)

    this.jumping = false
    this.invincible = false
    this.health = 10
    this.body.mass = 10
    this.body.setDragY = 10
    this.body.setDragX = 10

    this.setControls()
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update(timestep, delta) {
    if (this.cursor.left.isDown) {
      this.body.setVelocityX(-100)
    }
    if (this.cursor.right.isDown) {
      this.body.setVelocityX(100)
    }
    if (this.cursor.right.isUp && this.cursor.left.isUp) {
      this.body.setVelocityX(0)
    }
    if (this.cursor.space.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-250)
    }
  }
}
