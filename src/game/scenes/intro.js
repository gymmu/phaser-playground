import Phaser from "phaser"
import Player from "../player"
import Mushroom from "../plattform"

export default class Intro extends Phaser.Scene {
  obstacles
  shapeGraphics

  constructor() {
    super({ key: "game" })
    this.player = null
    this.items = null
  }

  preload() {
    //this.platformGroup = this.add.group()
    // Load the assets here
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.image("tileset", "./assets/ground.png")
    this.load.atlas(
      "pickups",
      "./assets/ground.png",
      "./assets/atlas/ground.json",
    )
    this.load.tilemapTiledJSON("map", "./assets/maps/level-01.json")

    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  create() {
    this.items = this.add.group()

    this.loadMap()

    // Create the level here
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

  hitFloor(platform, player) {
    console.log("Hit floor")
  }

  loadMap() {
    const map = this.make.tilemap({
      key: "map",
    })
    const tiles = map.addTilesetImage("ground", "tileset")
    const background = map.createLayer(0, tiles, 0, 0)
    this.obstacles = map.createLayer(1, tiles, 0, 0)
    this.obstacles.setCollisionByProperty({ collides: true })

    const spawnPoint = map.findObject(
      "SpawnPoints",
      (obj) => obj.name === "SpawnPlayer",
    )
    this.player = new Player(this, spawnPoint.x, spawnPoint.y)

    const mushrooms = map.filterObjects(
      "Items",
      (obj) => obj.name === "Mushroom",
    )
    mushrooms.forEach((mushroom) => {
      this.items.add(new Mushroom(this, mushroom.x, mushroom.y))
    })
  }
}
