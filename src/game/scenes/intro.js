import Phaser from "phaser"
import Player from "../player"
import Plattform from "../plattform"

export default class Intro extends Phaser.Scene {
  obstacles
  shapeGraphics

  constructor() {
    super({ key: "game" })
    this.player = null
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
    this.loadMap()

    // Create the level here
    this.physics.add.collider(this.player, this.obstacles)
  }

  pickUp(actor, item) {
    if (actor === this.player) {
    }

    //item.disableBody(true, true)
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
      const pl = new Plattform(this, mushroom.x, mushroom.y)
      this.physics.collide(pl, this.player, this.pickUp, () => true, this)
    })
  }
}
