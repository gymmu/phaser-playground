import Phaser from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, number) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = true
    this.setOrigin(0, 0)

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
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update() {
    console.log("p update")
    const { body } = this
    const { left, right, space } = this.cursor
    if (left.isDown) {
      body.setVelocityX(-100)
      this.anims.play("player_left", true)
    } else if (right.isDown) {
      this.body.setVelocityX(100)
      this.anims.play("player_right", true)
    } else {
      this.body.setVelocityX(0)
      this.anims.play("player_idle", true)
    }
    if (space.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-250)
    }
  }
}
