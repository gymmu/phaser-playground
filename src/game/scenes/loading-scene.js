// Damit importieren wir die Game-Engine phaser
import Phaser from "phaser"

// Damit erstellen wir die Klasse für die Lade-Szene und übernehmen die Eigenschaften von `Phaser.Szene`.
// Das müssen Sie noch nicht genau verstehen.
export default class LoadingScene extends Phaser.Scene {
  /**
   * Das ist eine spezielle Methode die bei der Instanziierung der Klasse
   * aufgerufen wird. Wir brauchen diese Methode hier, damit wir `Phaser`
   * den Namen/Schlüssel für unsere Szene übergeben können, damit wir die
   * Szene später selber aufrufen können.
   */
  constructor() {
    // Damit wir der Konstuktor von `Phaser.Scene` aufgerufen, und wir übergeben
    // den Schlüssel/Namen.
    super({ key: "loading" })
  }

  /**
   * Mit der `preload`-Methode werden alle Ressourcen wie Grafiken und Musik
   * ins Spiel geladen. Das passiert noch vor der Erstellung der Szene, damit
   * die Ressourcen dann im Game-Loop verwendet werden können.
   */
  preload() {
    // Lade das Tileset für die Karten und die Objekte.
    this.load.image("tileset", "./assets/tileset.png")

    // Lade einen Atlas von einem Tileset. Damit können einzelne Kacheln aus
    // einem Tileset definiert werden.
    this.load.atlas(
      "pickups",
      "./assets/tileset.png",
      "./assets/atlas/atlas-pickups.json",
    )

    // Wir möchten auf das Drücken der Leertaste reagieren können, daher müssen
    // wir das hier registrieren.
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  /**
   * Auch diese Methode wird von `Phaser` automatisch aufgerufen. In dieser
   * Methode erstellen wir alle Spielobjekte, die in der Szene verwendet werden.
   * Auch diese Methode wird noch vor dem Game-Loop aufgerufen.
   *
   * Meistens wird in dieser Methode die Spielkarte oder ähnliches erstellt. Für
   * die Lade-Szene brauchen wir aber nur einen Text.
   */
  create() {
    // Damit erstellen wir ein Spielobjekt Text. Wir geben die Position in x und y
    // an, und geben den Text der angezeigt werden soll an.
    const text = this.add.text(320, 240, "Press SPACE to start the Game.")

    // Damit setzen wir den Ankerpunkt von dem Textelement auf die Mitte des Elements.
    // Würden wir das nicht machen, ist die obere lenke Ecke der Ankerpunkt, und es wird
    // schwierig den Text zu zentrieren.
    text.setOrigin(0.5, 0.5)
  }

  /**
   * Diese Methode gehört zum Game-Loop und sollte 60 mal pro Sekunde aufgerufen werden.
   * In dieser Methode berechnen wir die Positionen von den Spielobjekten neu und reagieren
   * auf Eingaben.
   */
  update() {
    // Wenn die Leertaste gedrückt wird, möchten wir darauf reagieren.
    if (this.SPACE.isDown) {
      // Die Leertaste wurde gedrückt, jetzt möchten wir eine neue Szene laden.
      // Das was wir hier übergeben, ist der Schlüssel/Name der Szene, so wie
      // es im Konstruktor angegeben wurde.
      this.scene.start("level-00")
    }
  }
}
