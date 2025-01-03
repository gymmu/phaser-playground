import Phaser from "phaser"
import Player from "../player"
import Mushroom from "../mushroom"
import Cave from "../cave"

class HelperScene extends Phaser.Scene {
  constructor(options) {
    super(options)
  }

  createSingleObject(map, objectLayer, objectName, objectClass) {
    const spawnPoint = map.findObject(
      objectLayer,
      (obj) => obj.name === objectName,
    )
    return new objectClass(this, spawnPoint.x, spawnPoint.y)
  }

  createObjects(map, objectLayer, objectName, objectClass, targetGroup) {
    const objects = map.filterObjects(
      objectLayer,
      (obj) => obj.name === objectName,
    )
    if (objects != null) {
      objects.forEach((obj) => {
        console.log(obj)
        targetGroup.add(new objectClass(this, obj.x, obj.y, obj.properties))
      })
    }
  }
}

export default class Intro extends HelperScene {
  obstacles
  shapeGraphics

  constructor() {
    super({ key: "game" })
    this.player = null
    this.items = null
  }

  preload() {
    // Load the assets here
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.image("tileset", "./assets/ground_extruded.png")
    this.load.atlas(
      "pickups",
      "./assets/ground.png",
      "./assets/atlas/ground.json",
    )
    this.load.atlas("doors", "./assets/ground.png", "./assets/atlas/doors.json")
    this.load.tilemapTiledJSON("map", "./assets/maps/level-02.json")

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
    item.destroy()
  }

  enterDoor(actor, door) {
    console.log(door)
  }

  update() {
    // Updates for the game loop
    if (this.player) this.player.update()
  }

  loadMap() {
    const map = this.make.tilemap({ key: "map" })
    const tiles = map.addTilesetImage("ground_extruded", "tileset")
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
