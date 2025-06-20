import StaticObject from "../staticObject"
import { registerGameObject } from "../registry"

export default class Flower extends StaticObject {
  constructor(scene, x, y, properties) {
    super(scene, x, y, "pickups", "flower", properties)

    this.setOrigin(0, 0)
    this.setSize(24, 32)
    this.setOffset(8, 0)

    this.name = "flower"
  }
}

// Registriere das Flower-Objekt automatisch beim Import
registerGameObject("Flower", Flower)
