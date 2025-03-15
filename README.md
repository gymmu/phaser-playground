# Demo Spiel mit Phaser 3

In diesem Projekt erarbeiten wir ein Demo Spiel mit der Game-Engine Phaser. Als
Hilfmittel für das Spiel dient das
[Informatik-Skript](https://gymmu.github.io/gym-inf/game). Dort finden Sie auch
Videos in denen der Inhalt aus dem Skript erklärt wird, sowie der Code um mit
der Game-Engine umzugehen.

## Projekt starten

Auch bei diesem Projekt brauchen wir einen Webserver um alle benötigten Dateien
an den Benutzer zu liefern. Diesen können Sie wie auch schon in den anderen
Projekten mit folgendem Befehl aus dem Terminal starten.

```bash
npm run dev
```

## Struktur der Projekts

Das Projekt ist wie folgt aufgeteilt um die Dinge die nicht zusammen gehören von
einander zu trennen, und aber auch um einen Standart für Spielressourcen zu
haben, bei dem man sich im Projekt einfach orientieren kann.

- `src`: Hier ist alles drin was mit Javascript zu tun hat. Alles was mit dem
  Spiel zu tun hat, finden Sie unter `src/game`. Alle weiteren Unterordner
  sollten selbsterklärend sein.

- `public/assets`: Hier finden Sie alle Ressourcen die im Spiel verwendet
  werden. Es ist wichtig das diese zumindest im Ordner `public` sind, sonst
  werden Sie vom Webserver nicht gefunden. Alle Unterordner sollten auch hier
  selbsterklärend sein.

- `tiled`: Hier werden die Dateien für den
  [Karteneditor Tiled](https://mapeditor.org) gespeichert. Der Karteneditor
  speichert seine Konfiguration in Textdateien ab. Wir können diese also einfach
  zum Repository hinzufügen, so das wir unsere Karten auch auf Git abspeichern
  können. Um die Karten im Spiel zu verwenden, müssen diese dann nach
  `public/assets/maps/` exportiert werden.

- `asprite`: Hier werden die Bilder/Tilesets gespeichert, die wir mit dem
  Bildbearbeitungsprogramm [Libresprite](https://libresprite.github.io/#!/)
  bearbeiten. Auch hier müssen fertige Bilder wieder exportiert werden.

  **Achtung**: Damit Tilesets mit verschiebender Kamera richtig dargestellt
  werden können, müssen diese _extruded_ werden. Sie brauchen also einen Rand
  und einen Abstand zueinander. Das kann mit folgendem Befehl gemacht werden:

  ```bash
  ./node_modules/tile-extruder/bin/tile-extruder -w 32 -h 32 -m 1 -s 2 -i <Eingabe-Datei> -o <Ausgabe-Datei>
  ```

  Dabei müssen Sie den genauen Pfad für die Eingabe-Datei haben, also
  `asprite/tileset-winter.png` oder so ähnlich. und bei der Ausgabe-Datei muss
  dann folgendes hin `public/assets/tileset.winder.png`.

## Erste Schritte

Das Projekt ist leider noch nicht direkt Spielbereit. Sie müssen zuerst noch ein
paar Schritte selber machen. Weil das Projekt einer sehr spezifischen Struktur
folgt, ist es am besten wenn Sie die Schritte einfach von der
[Webseite hier](https://gymmu.github.io/gym-inf/game) übernehemen. Lesen aber
alles durch was Sie hier machen, Sie sollen später auch im Stande sein das ganze
selber zu machen.
