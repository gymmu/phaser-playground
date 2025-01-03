import Phaser from "phaser"
import Player from "../player"
import Mushroom from "../mushroom"
import Cave from "../cave"

export default class Intro extends Phaser.Scene {
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
  }

  pickUp(actor, item) {
    item.destroy()
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

    createObjects(this, map, "Items", "Mushroom", Mushroom, this.items)
    createObjects(this, map, "Doors", "Cave", Cave, this.items)
    const spawnPoint = map.findObject(
      "SpawnPoints",
      (obj) => obj.name === "SpawnPlayer",
    )
    this.player = new Player(this, spawnPoint.x, spawnPoint.y)
  }
}

function createObjects(
  scene,
  map,
  objectLayer,
  objectName,
  objectClass,
  targetGroup,
) {
  const mushrooms = map.filterObjects(
    objectLayer,
    (obj) => obj.name === objectName,
  )
  mushrooms &&
    mushrooms.forEach((mushroom) => {
      targetGroup.add(new objectClass(scene, mushroom.x, mushroom.y))
    })
}
