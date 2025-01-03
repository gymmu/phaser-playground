import Phaser from "phaser"
import Player from "../player"
import Mushroom from "../mushroom"
import Cave from "../cave"
import HelperScene from "./helper-scene"

/**
 * Spiellogik für das Level01.
 */
export default class Level01 extends HelperScene {
  player
  items
  doors

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
    console.log("Enter door to Level " + door.props.goToWorld)
    const { goToWorld } = door.props
    if (goToWorld != null) {
      this.scene.start(goToWorld)
    }
  }

  update() {
    // Updates for the game loop
    if (this.player) this.player.update()
  }

  loadMap() {
    const map = this.make.tilemap({ key: "map-level-01" })
    const tiles = map.addTilesetImage("tileset")
    map.createLayer(0, tiles, 0, 0)
    this.obstacles = map.createLayer(1, tiles, 0, 0)

    this.createObjects(map, "Items", "Mushroom", Mushroom, this.items)
    this.createObjects(map, "Doors", "Cave", Cave, this.doors)
    this.player = this.createSingleObject(
      map,
      "SpawnPoints",
      "SpawnPlayer",
      Player,
    )
  }
}
