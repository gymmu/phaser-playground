import Phaser from "phaser"
import EVENTS from "../../events"

/**
 * Speichert den Spielerstatus in der Registry.
 *
 * @param {Phaser.Scene} scene Die Szene, in der der Spieler gespeichert werden soll.
 * @param {Player} player Der Spieler, dessen Status gespeichert werden soll.
 */
export function savePlayerState(scene, player) {
  scene.registry.set("playerState", {
    hp: player.hp,
    maxHp: player.maxHp,
    inventory: player.inventory,
    keys: player.keys,
    x: player.x,
    y: player.y,
  })
}

/**
 * Lädt den Spielerstatus aus der Registry oder setzt Standardwerte.
 *
 * @param {Phaser.Scene} scene Die Szene, in der der Spieler geladen werden soll.
 * @param {object} map Die Karte, aus der der Spawnpunkt geladen werden kann.
 * @returns {object} Ein Objekt mit den Spielerdaten und Spawnkoordinaten.
 */
export function loadPlayerState(scene, map) {
  // Spielerstatus aus Registry laden oder Standardwerte setzen
  const savedPlayerState = scene.registry.get("playerState") || {
    hp: 10,
    maxHp: 100,
    inventory: new Array(6).fill(null),
    keys: {},
    x: null,
    y: null,
  }

  // Spieler an Spawnpunkt erstellen oder an gespeicherter Position
  let spawnX = savedPlayerState.x
  let spawnY = savedPlayerState.y

  // Falls keine gespeicherte Position, Spawnpunkt aus Karte holen
  if (spawnX == null || spawnY == null) {
    const spawnPoint = map
      ? map.findObject("SpawnPoints", (obj) => obj.name === "SpawnPlayer")
      : null
    if (spawnPoint) {
      spawnX = spawnPoint.x
      spawnY = spawnPoint.y
    } else {
      spawnX = 0
      spawnY = 0
    }
  }

  return {
    playerState: savedPlayerState,
    spawnX,
    spawnY,
  }
}

/**
 * Erstellt einen Spieler in der angegebenen Szene und lädt seinen Status.
 *
 * @param {Phaser.Scene} scene Die Szene, in der der Spieler erstellt werden soll.
 * @param {object} map Die Karte, aus der der Spawnpunkt geladen werden kann.
 * @returns {Player} Der erstellte Spieler.
 */
export function createPlayer(scene, map) {
  // Spielerstatus laden
  const { playerState, spawnX, spawnY } = loadPlayerState(scene, map)

  // Spieler erstellen
  const player = new Player(scene, spawnX, spawnY)

  // Spielerstatus setzen
  player.hp = playerState.hp
  player.maxHp = playerState.maxHp
  player.inventory = playerState.inventory
  player.keys = playerState.keys

  return player
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  keys = {}
  hp = 10
  maxHp = 100
  speed = 100
  gotHit = false
  inventory = new Array(6).fill(null) // Inventar mit 6 Slots initialisieren

  constructor(scene, x, y) {
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = false
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)

    this.setControls()

    // Hier schicken wir ein Ereignis los. Phaser schnappt das auf, und führt
    // die Funktion aus, die beim Emitter von "update-hp" definiert wurde. So
    // können wir bequem über verschiedene Objekte kommunizieren.
    EVENTS.emit("update-hp", this.hp)
  }

  /**
   * Füge ein Item zum Inventar hinzu.
   *
   * Das Item wird in den ersten freien Slot gelegt. Wenn das Inventar voll ist,
   * wird das Item nicht hinzugefügt.
   *
   * @param {any} item Das Item, das hinzugefügt werden soll.
   * @returns {boolean} Gibt zurück, ob das Hinzufügen erfolgreich war.
   */
  addItemToInventory(item) {
    const index = this.inventory.indexOf(null)
    if (index !== -1) {
      this.inventory[index] = item
      EVENTS.emit("update-inventory", this.inventory)
      return true
    }
    return false
  }

  /**
   * Entferne ein Item aus dem Inventar.
   *
   * Das Item wird aus dem angegebenen Slot entfernt.
   *
   * @param {number} index Der Index des Slots, aus dem das Item entfernt werden soll.
   * @returns {any} Das entfernte Item oder null, wenn der Slot leer war.
   */
  removeItemFromInventory(index) {
    if (index >= 0 && index < this.inventory.length) {
      const item = this.inventory[index]
      this.inventory[index] = null
      return item
    }
    return null
  }

  /**
   * Erhöhe die Geschwindigkeit des Spielers.
   *
   * Die Geschwindigkeit kann den Wert von 960 nicht übersteigen.
   *
   * @param {integer} value Die Geschwindigkeit der Spielers.
   */
  increaseSpeed(value) {
    this.speed = Math.min(this.speed + value, 960)
  }

  /**
   * Vermindere die Geschwindigkeit des Spielers.
   *
   * Die Geschwindigkeit kann den Wert 100 nicht unterschreiten.
   *
   * @param {integer} value Um welchen Wert die Geschwindigkeit vermindert
   * werden soll.
   */
  decreaseSpeed(value) {
    this.speed = Math.max(100, this.speed - value)
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update() {
    const { left, right, up, down } = this.cursor
    let isIdle = true

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    if (left.isDown) {
      this.body.setVelocityX(-this.speed)
      if (isIdle) this.anims.play("player_left", true)
      isIdle = false
    }
    if (right.isDown) {
      this.body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }

    if (up.isDown) {
      this.body.setVelocityY(-this.speed)
      if (isIdle) this.anims.play("player_up", true)
      isIdle = false
    }
    if (down.isDown) {
      this.body.setVelocityY(this.speed)
      if (isIdle) this.anims.play("player_down", true)
      isIdle = false
    }

    if (isIdle) {
      this.anims.play("player_idle", true)
    }

    // Wenn der Spieler getroffen wurde, lasse ihn blinken
    if (this.gotHit) {
      // Setze die Farbe des Spielers auf rot
      this.tint = 0xff0000
    } else {
      // Setze die Farbe des Spielers auf normal
      this.tint = 0xffffff
    }
  }

  /**
   * Heile den Spieler.
   *
   * Der Spieler wird um die angegebene Menge an HP geheilt. Das Maximum der
   * Lebenspunkte kann nicht überstiegen werden.
   *
   * @param {integer} value Die Menge an Lebenspunkten um die der Spieler
   * geheilt wird.
   */
  heal(value) {
    if (value == null) value = 0
    this.hp = this.hp + value
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp
    }

    // Die Lebenspunkte des Spielers wurden verändert, also schicken wir das
    // Ereignis "update-hp" los. Das wird von einer anderen Szene aufgeschnappt,
    // und die Lebenspunkte werden angepasst. So können wir einfach mit einer
    // anderen Szene kommunizieren, ohne das wir diese kennen müssen.
    EVENTS.emit("update-hp", this.hp)
  }

  /**
   * Füge dem Spielobjekt Schaden hinzu.
   *
   * Die Lebenspunkte des Spielers werden verringert. Wenn die Lebenspunkte
   * unter 0 fallen, dann soll der Spieler sterben.
   *
   * @param {integer} value Der Schaden der dem Spieler zugefügt werden soll.
   */
  damage(value) {
    if (value == null) value = 0
    this.hp = this.hp - value
    if (this.hp <= 0) {
      this.hp = 0
      // Get the key of the current scene
      const sceneKey = this.scene.key

      // Restart the same scene again
      this.scene.scene.start(sceneKey)
    }

    // Gleich wie bei `heal()`
    EVENTS.emit("update-hp", this.hp)
  }

  /**
   * Fügt dem Spieler einen Schlüssel hinzu.
   *
   * Der Spieler kann verschiedene Items haben. Eine spezielle Variante von
   * Items sind Schlüssel. Der Spieler hat eine Liste von Schlüsseln. Diese
   * haben alle einen Namen. Der Name des Schlüssels wird in den
   * `customProperties` in `tiled` gesetzt. Jedesmal wenn wir einen Schlüssel
   * hinzufügen, wird die Anzahl der Schlüssel mit dem Namen ums 1 erhöht. Wenn
   * der Schlüssel noch nicht im Inventar ist, wird er auf 1 gesetzt.
   *
   * @param {string} keyName Name des Schlüssels der hinzugefügt wird.
   */
  addKey(keyName) {
    if (this.keys[keyName] == null) {
      this.keys[keyName] = 1
    } else {
      this.keys[keyName] += 1
    }

    // Kommentiere diese Zeil ein, um die Schlüssel nach einer VEränderung
    // anzuzeigen.
    // console.log(this.keys)
  }

  /**
   * Entferne einen Schlüssel mit speziellem Namen aus dem Inventar der Spielers.
   *
   * Für mehr Informationen zu Schlüssel und Spieler, schaue in der Methode
   * `addKey()` nach.
   *
   * Ein Schlüssel wird entfernt. Wenn der Schlüssel nicht im Inventar ist,
   * passiert nichts. Wenn die Menge an Schlüssel mit dem Namen kleiner oder
   * gleich 0 ist, wird der Eintrag entfernt.
   *
   * @param {string} keyName Name des Schlüssels.
   *
   */
  removeKey(keyName) {
    if (this.keys[keyName] == null) return
    this.keys[keyName] -= 1
    if (this.keys[keyName] <= 0) {
      this.keys[keyName] = null
    }
  }
}
