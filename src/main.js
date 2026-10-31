import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene.js";

try {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "#151923",
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 960, height: 540 },
    scene: [BootScene],
  });
  game.events.once(Phaser.Core.Events.READY, () => {
    document.getElementById("loading")?.remove();
    document.getElementById("status").textContent = "Phaser iniciado correctamente";
  });
} catch (error) {
  document.getElementById("status").textContent = "Error de inicio: " + error.message;
}
