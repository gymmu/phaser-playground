import EVENTS from "../events"

export default class UIScene extends Phaser.Scene {
  hpElement = null
  hpValue = 0

  constructor() {
    super({ key: "ui-scene", active: true })
  }

  create() {
    this.hpElement = this.add.text(this.cameras.main.width, 0, "HP: --", {
      color: "#00ff00",
      align: "right",
    })
    this.hpElement.setOrigin(1, 0)
    const emitter = EVENTS.on("update-hp", this.updateHp, this)
    emitter.emit("update-hp")
  }

  updateHp(value) {
    this.hpValue = value
    this.hpElement.setText(`HP: ${this.hpValue}`)
  }
}
