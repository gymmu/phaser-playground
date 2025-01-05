import Phaser from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = false
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)

    this.hp = 10
    this.maxHp = 100

    this.setControls()
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update() {
    const { body } = this
    const { left, right, up, down } = this.cursor
    let isIdle = true

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    if (left.isDown) {
      body.setVelocityX(-100)
      if (isIdle) this.anims.play("player_left", true)
      isIdle = false
    }
    if (right.isDown) {
      this.body.setVelocityX(100)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }

    if (up.isDown) {
      body.setVelocityY(-100)
      if (isIdle) this.anims.play("player_up", true)
      isIdle = false
    }
    if (down.isDown) {
      body.setVelocityY(100)
      if (isIdle) this.anims.play("player_down", true)
      isIdle = false
    }

    if (isIdle) {
      this.anims.play("player_idle", true)
    }
  }

  heal(value) {
    if (value == null) value = 0
    this.hp = this.hp + value
    if (this.hp > this.maxHp) {
      this.hp = this.mapHp
    }
    console.log(this.hp)
  }
}
