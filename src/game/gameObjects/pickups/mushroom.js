import StaticObject from "../staticObject"
import { registerGameObject } from "../registry"

export default class Mushroom extends StaticObject {
  constructor(scene, x, y, properties) {
    super(scene, x, y, "pickups", "mushroom", properties)

    this.setOrigin(0, 0)
    this.setSize(16, 16)
    this.setOffset(16, 16)

    this.name = "mushroom"
  }
}

// Registriere das Mushroom-Objekt automatisch beim Import
registerGameObject("Mushroom", Mushroom)
