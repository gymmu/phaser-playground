// Auch hier müssen wir wieder unsere Game-Engine importieren.
import Phaser from "phaser"

// Hier können wir unsere eigenen Klassen importieren. Das ist die Datei die
// Sie im letzten Beispiel geschrieben haben.
import LoadingScene from "./scenes/loading-scene.js"

// Das hier ist die Konfiguration für das Spiel. Sie müssen nicht alle Teile
// davon verstehen. Die meisten sind recht selbsterklärend.
const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  width: 640, // Sollten möglichst vielfache von 32 sein, da unsere Tileset 32x32 Pixel gross sind.
  height: 480, // Gleich wie bei width.
  parent: "game-canvas", // Die ID von dem HTML-Element, in das das Spiel gezeichnet wird.
  scene: [LoadingScene], // Die Szenen des Spiels, hier können noch weitere Szenen angehängt werden.
  physics: {
    default: "arcade", // Eine einfache Physik die auf kollisionen testen kann.
    arcade: {
      debug: true, // Zeichnet zusätzliche Informationen wie Geschwindigkeit und Hitboxes
      gravity: { y: 0 }, // Keine Gravitation, da wir uns in alle 4 Richtungen bewegen möchten. Muss für Jump'n'Run geändert werden.
    },
  },
}

// Hier wird das Spiel erstellt, und startet mit der ersten Szenen in der Liste von `scene`.
const game = new Phaser.Game(config)
