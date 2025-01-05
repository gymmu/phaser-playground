import HelperScene from "../helper-scene"

/**
 * Spiellogik für das Level02.
 */
export default class Level02 extends HelperScene {
  constructor() {
    super({ key: "level-02" })
  }

  preload() {
    // Load the assets here
    this.load.tilemapTiledJSON(
      "map-level-02",
      "./assets/maps/map-level-02.json",
    )
  }

  create() {
    super.create("map-level-02")
  }
}
