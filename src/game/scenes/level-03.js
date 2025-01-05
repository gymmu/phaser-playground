import HelperScene from "./helper-scene"

/**
 * Spiellogik für das Level03.
 */
export default class Level03 extends HelperScene {
  constructor() {
    super({ key: "level-03" })
  }

  preload() {
    // Load the assets here
    this.load.tilemapTiledJSON(
      "map-level-03",
      "./assets/maps/map-level-03.json",
    )
  }

  create() {
    super.create("map-level-03")
  }
}
