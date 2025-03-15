import Phaser from "phaser"
import EVENTS from "../../events"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  keys = {}
  hp = 10
  maxHp = 100
  #speed = 100

  constructor(scene, x, y) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = false
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)

    this.setControls()
  }

  /**
   * Setze die Geschwindigkeit des Spielers. Kann nicht grösser als 960 sein, da
   * der Spieler sonst durch die Spielobjekte geht. Kann auch nicht kleiner als
   * 100 sein.
   *
   * @param {integer} value Die Geschwindigkeit der Spielers.
   */
  set speed(value) {
    this.#speed = Math.min(value, 960)
    this.#speed = Math.max(100, this.#speed)
  }

  /** Geschwindigkeit des Spielers. */
  get speed() {
    return this.#speed
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
      body.setVelocityX(-this.speed)
      if (isIdle) this.anims.play("player_left", true)
      isIdle = false
    }
    if (right.isDown) {
      this.body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }

    if (up.isDown) {
      body.setVelocityY(-this.speed)
      if (isIdle) this.anims.play("player_up", true)
      isIdle = false
    }
    if (down.isDown) {
      body.setVelocityY(this.speed)
      if (isIdle) this.anims.play("player_down", true)
      isIdle = false
    }

    if (isIdle) {
      this.anims.play("player_idle", true)
    }

    EVENTS.emit("update-hp", this.hp)
  }

  heal(value) {
    if (value == null) value = 0
    this.hp = this.hp + value
    if (this.hp > this.maxHp) {
      this.hp = this.mapHp
    }
    EVENTS.emit("update-hp", this.hp)
  }

  damage(value) {
    if (value == null) value = 0
    this.hp = this.hp - value
    if (this.hp <= 0) {
      this.hp = 0
    }
    EVENTS.emit("update-hp", this.hp)
  }

  addKey(keyName) {
    if (this.keys[keyName] == null) {
      this.keys[keyName] = 1
    } else {
      this.keys[keyName] += 1
    }
  }

  removeKey(keyName) {
    if (this.keys[keyName] == null) return
    this.keys[keyName] -= 1
  }
}
