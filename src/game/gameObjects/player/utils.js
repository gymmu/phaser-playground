/**
 * Returns a random direction as a string: "left", "right", "up", or "down".
 * Useful for NPC movement logic.
 *
 * @returns {"left" | "right" | "up" | "down"} A random direction.
 */
export function getRandomDirection() {
  const r = Math.floor(5 * Math.random())
  if (r === 0) {
    return new Phaser.Math.Vector2(-1, 0)
  } else if (r === 1) {
    return new Phaser.Math.Vector2(1, 0)
  } else if (r === 2) {
    return new Phaser.Math.Vector2(0, -1)
  } else if (r === 3) {
    return new Phaser.Math.Vector2(0, 1)
  } else {
    return new Phaser.Math.Vector2(0, 0)
  }
}
