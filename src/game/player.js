import Phaser from "phaser"

export default class Player extends Phaser.GameObjects.Sprite {
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

    this.setControls()
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update(timestep, delta) {
    if (this.cursor.left.isDown) {
      this.x -= 5
    }
    if (this.cursor.right.isDown) {
      this.x += 5
    }
    if (this.cursor.space.isDown) {
      this.body.setVelocityY(-300)
    }
  }
}
