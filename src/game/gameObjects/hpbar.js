import Phaser from "phaser"

/**
 * HpBar: A reusable health bar for any game object.
 * Usage:
 *   this.hpBar = new HpBar(scene, { width, height, offsetY });
 *   this.hpBar.setMaxHp(maxHp);
 *   this.hpBar.setHp(currentHp);
 *   this.hpBar.setPosition(x, y);
 *   this.hpBar.destroy(); // when no longer needed
 */
export default class HpBar {
  /**
   * @param {Phaser.Scene} scene - The scene to add the bar to.
   * @param {object} options - { width, height, offsetY }
   */
  constructor(scene, options = {}) {
    this.scene = scene
    this.width = options.width || 28
    this.height = options.height || 5
    this.offsetY = options.offsetY || -20
    this.maxHp = 100
    this.hp = 100

    this.graphics = scene.add.graphics()
    this.graphics.setDepth(options.depth || 10)
  }

  setMaxHp(maxHp) {
    this.maxHp = maxHp
    this.draw()
  }

  setHp(hp) {
    this.hp = hp
    this.draw()
  }

  setPosition(x, y) {
    // Position the bar above the object
    this.x = x
    this.y = y + this.offsetY
    this.draw()
  }

  draw() {
    if (!this.graphics) return
    const barWidth = this.width
    const barHeight = this.height
    const x = (this.x || 0) - barWidth / 2
    const y = (this.y || 0) - barHeight / 2

    // HP percent
    const hpPercent = Phaser.Math.Clamp(this.hp / this.maxHp, 0, 1)

    this.graphics.clear()

    // Background (dark gray)
    this.graphics.fillStyle(0x222222, 0.7)
    this.graphics.fillRect(x, y, barWidth, barHeight)

    // HP (green -> yellow -> red)
    let color = 0x2ecc40 // green
    if (hpPercent < 0.3)
      color = 0xff4136 // red
    else if (hpPercent < 0.6) color = 0xffdc00 // yellow

    this.graphics.fillStyle(color, 1)
    this.graphics.fillRect(
      x + 1,
      y + 1,
      (barWidth - 2) * hpPercent,
      barHeight - 2,
    )

    // Border
    this.graphics.lineStyle(1, 0x000000, 1)
    this.graphics.strokeRect(x, y, barWidth, barHeight)
  }

  destroy() {
    if (this.graphics) {
      this.graphics.destroy()
      this.graphics = null
    }
  }
}
