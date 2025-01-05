import Phaser from "phaser"
import Mushroom from "../mushroom"
import Flower from "../flower"
import Cave from "../cave"
import Player from "../player"

/**
 * Erweiterung einer Phaser.Scene mit praktischen Funktionen um Spielobjekte
 * automatisch zu erstellen.
 */
export default class HelperScene extends Phaser.Scene {
  map = null
  tiles = null
  obstacles = null
  items = null
  doors = null
  player = null

  /**
   * Erstellt eine Instanz einer Phaser.Szene.
   *
   * @param {*} options Optionen die an eine Szene übergeben werden können.
   */
  constructor(options) {
    super(options)
  }

  create(mapKey) {
    this.items = this.add.group()
    this.doors = this.add.group()
    this.loadMap(mapKey)
    this.createCamera()
    this.setupDefaultCollisions()
  }

  loadMap(mapKey) {
    this.map = this.make.tilemap({ key: mapKey })
    this.tiles = this.map.addTilesetImage("tileset")
    this.map.createLayer(0, this.tiles, 0, 0)
    this.obstacles = this.map.createLayer(1, this.tiles, 0, 0)

    this.createObjects(this.map, "Items", "Mushroom", Mushroom, this.items)
    this.createObjects(this.map, "Items", "Flower", Flower, this.items)
    this.createObjects(this.map, "Doors", "Cave", Cave, this.doors)
    this.player = this.createSingleObject(
      this.map,
      "SpawnPoints",
      "SpawnPlayer",
      Player,
    )
  }

  createCamera() {
    this.cameras.main.setSize(640, 480)
    this.cameras.main.startFollow(this.player)
  }

  setupDefaultCollisions() {
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

  /**
   * Erstelle ein Spielobjekt an der Stelle des SpawnPoints auf der Karte.
   *
   * Diese Funktion wird verwendet um einzelne Objekte zu erstellen, wie zum
   * Beispiel den Spieler, oder einen Endgegner, sowie Spielobjekte die nur
   * einmal vorkommen.
   *
   * @param {*} map Die Karte in der das Spielobjekt definiert wurde.
   * @param {String} objectLayer Der Name des Layers in dem das Spielobjekt definiert wurde.
   * @param {String} objectName Der Name des Objekts, so wie es in der Karte
   * erstellt wurde (z.B. "SpawnPlayer").
   * @param {*} objectClass Die Klasse mit dem das neue Objekt erstellt werden
   * soll (z.B. Player).
   */
  createSingleObject(map, objectLayer, objectName, objectClass) {
    const spawnPoint = map.findObject(
      objectLayer,
      (obj) => obj.name === objectName,
    )
    return new objectClass(this, spawnPoint.x, spawnPoint.y)
  }

  /**
   * Erstelle alle Objekte aus einem Layer der Karte, mit einem bestimmten Typ.
   * Diese Funktion wird benötigt um Spielobjekte zu erstellen, mit denen ein
   * Spieler interagieren kann. Also Gegenstände die man aufsammeln kann, oder
   * auch Türen durch die man läuft.
   *
   * Diese Objekte bekommen noch die `Custom Properties` aus Tiled übergeben. So
   * können verschiedene Eigenschaften auf den Objekten gestezt werden. So
   * können zum Beispiel die Pilze verschieden viel Schaden anrichten. Man kann
   * auf Türen auch einstellen in welche Welt man gehen möchte.
   *
   * @param {*} map Die Karte in der das Spielobjekt definiert wurde.
   * @param {String} objectLayer Der Name des Layers in dem das Spielobjekt definiert wurde.
   * @param {String} objectName Der Name des Objekts, so wie es in der Karte
   * erstellt wurde (z.B. "Mushroom").
   * @param {*} objectClass Die Klasse mit dem das neue Objekt erstellt werden
   * soll (z.B. Mushroom).
   * @param {*} targetGroup Die Gruppe zu der ein Objekt hinzugefügt wird. Die
   * Gruppe wird gebraucht um auf kollision mit einem weiteren Objekt zu prüfen.
   */
  createObjects(map, objectLayer, objectName, objectClass, targetGroup) {
    const objects = map.filterObjects(
      objectLayer,
      (obj) => obj.name === objectName,
    )
    if (objects != null) {
      objects.forEach((obj) => {
        targetGroup.add(new objectClass(this, obj.x, obj.y, obj.properties))
      })
    }
  }
}
