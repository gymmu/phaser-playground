import Phaser from "phaser"

export class CameraManager {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    this.scene = scene
    this.cameraMaskRadius = 120
  }

  createCamera() {
    this.scene.cameras.main.setSize(640, 480)
    this.scene.cameras.main.startFollow(this.scene.player)
    this.setCameraMask()
  }

  setCameraMask() {
    // Create a circular hole in the center of the screen
    this.scene.cameraMask = new Phaser.Geom.Circle(
      this.scene.cameras.main.width / 2,
      this.scene.cameras.main.height / 2,
      this.cameraMaskRadius,
    )

    // Create a mask from the circle geometry
    const maskShape = this.scene.make.graphics()
    maskShape.fillCircleShape(this.scene.cameraMask)

    const mask = maskShape.createGeometryMask()

    // Invert the mask by applying it to the black rectangle
    this.scene.cameras.main.setMask(mask)
  }

  shakeCamera() {
    this.scene.cameras.main.shake(200, 0.01)
  }

  zoomIn() {
    this.scene.cameras.main.zoom += 0.5
    if (this.scene.cameras.main.zoom > 4) {
      this.scene.cameras.main.zoom = 4
    }
  }
  zoomOut() {
    this.scene.cameras.main.zoom -= 0.5
    if (this.scene.cameras.main.zoom < 0.5) {
      this.scene.cameras.main.zoom = 0.5
    }
  }
}
