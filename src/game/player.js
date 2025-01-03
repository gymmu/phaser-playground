import Phaser from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, number) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = true
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)

    this.setControls()

    this.scene.anims.create({
      key: "player_idle",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 1,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.scene.anims.create({
      key: "player_right",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.scene.anims.create({
      key: "player_left",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    })
    this.scene.anims.create({
      key: "player_up",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    })
    this.scene.anims.create({
      key: "player_down",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    })
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
}
