import Base2DScene from "../base-2d-scene"

/**
 * Spiellogik für das Level01.
 */
export default class Level01 extends Base2DScene {
  constructor() {
    super({ key: "level-01" })
  }

  preload() {
    // Hier muss nur noch die Karte für das Level geladen werden.
    this.load.tilemapTiledJSON(
      "map-level-01",
      "./assets/maps/map-level-01.json",
    )
  }

  create() {
    super.create("map-level-01")
  }
}
