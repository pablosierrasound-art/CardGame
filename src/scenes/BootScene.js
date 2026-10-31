import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() { super("BootScene"); }
  create() {
    this.add.text(480, 230, "CARDGAME", { fontFamily: "monospace", fontSize: "48px", color: "#ffffff" }).setOrigin(0.5);
    this.add.text(480, 300, "Proyecto 2D listo para empezar", { fontFamily: "monospace", fontSize: "20px", color: "#9ca3af" }).setOrigin(0.5);
  }
}
