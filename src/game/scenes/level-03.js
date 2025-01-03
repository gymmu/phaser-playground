import Phaser from "phaser"
import Player from "../player"
import Mushroom from "../mushroom"
import Cave from "../cave"
import HelperScene from "./helper-scene"
import Flower from "../flower"

/**
 * Spiellogik für das Level03.
 */
export default class Level03 extends HelperScene {
  player
  items
  doors

  constructor() {
    super({ key: "level-03" })
  }

  preload() {
    // Load the assets here
    this.load.tilemapTiledJSON(
      "map-level-03",
      "./assets/maps/map-level-03.json",
    )

    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  create() {
    this.items = this.add.group()
    this.doors = this.add.group()

    this.loadMap()

    this.cameras.main.setSize(640, 480)
    this.cameras.main.startFollow(this.player)

    // Create the level here
    this.obstacles.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player, this.obstacles)
    this.physics.add.overlap(
      this.player,
      this.items,
      this.pickUp,
      () => true,
      this,
    )

    this.physics.add.overlap(
      this.player,
      this.doors,
      this.enterDoor,
      () => true,
      this,
    )
  }

  pickUp(actor, item) {
    const { restoreHP } = item.props
    actor.heal(restoreHP)
    item.destroy()
  }

  enterDoor(actor, door) {
    const { goToWorld } = door.props
    this.scene.start(goToWorld)
  }

  update() {
    // Updates for the game loop
    if (this.player) this.player.update()
  }

  loadMap() {
    const map = this.make.tilemap({ key: "map-level-03" })
    const tiles = map.addTilesetImage("tileset")
    map.createLayer(0, tiles, 0, 0)
    this.obstacles = map.createLayer(1, tiles, 0, 0)

    this.createObjects(map, "Items", "Mushroom", Mushroom, this.items)
    this.createObjects(map, "Items", "Flower", Flower, this.items)
    this.createObjects(map, "Doors", "Cave", Cave, this.doors)
    this.player = this.createSingleObject(
      map,
      "SpawnPoints",
      "SpawnPlayer",
      Player,
    )
  }
}
