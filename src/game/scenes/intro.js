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
    this.load.tilemapTiledJSON("map", "./assets/maps/level-01.json")

    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  create() {
    this.loadMap()

    // Create the level here
    this.player = new Player(this, 100, 200)

    this.physics.add.collider(this.player, this.obstacles)
    this.physics.add.overlap(
      this.player,
      this.decorations,
      this.pickUp,
      () => true,
      this,
    )
  }

  pickUp(actor, item) {
    if (actor === this.player) {
      //console.log("Item", item)
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
    this.obstacles.setCollisionByProperty({ collide: true })

    this.decorations = map.createLayer(2, tiles, 0, 0)
    this.decorations.setCollisionByProperty({ pickup: true })

    map.createFromObjects("Items", {
      name: "mushrooms",
      classType: Plattform,
    })
  }
}
