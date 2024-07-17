import { DrawableObject } from "./drawable.object.class.js";

export class Screen {
  /**
   * Creates an instance of Screen.
   * Provides rendering options to create text, background and color effects for
   * start, loading and end screens
   * @param {World} world
   * @memberof Screen
   */
  constructor(world) {
    this.world = world;
  }

  renderGameTitle() {
    this.world.ctx.strokeStyle = "white";
    this.world.ctx.lineWidth = 5;
    this.world.ctx.font = "80px LuckiestGuy";
    this.world.ctx.fillStyle = "blue";
    this.world.ctx.textAlign = "center";
    this.world.ctx.strokeText("Sharky", canvas.width / 2, (canvas.height / 7) * 3);
    this.world.ctx.fillText("Sharky", canvas.width / 2, (canvas.height / 7) * 3);
  }

  renderStartMessage(message) {
    this.world.ctx.font = "40px LuckiestGuy";
    this.world.ctx.lineWidth = 3;
    this.world.ctx.fillStyle = "violet";
    this.world.ctx.textAlign = "center";
    this.world.ctx.strokeText(message, canvas.width / 2, (canvas.height / 5) * 4);
    this.world.ctx.fillText(message, canvas.width / 2, (canvas.height / 5) * 4);
  }

  renderTransparentBackground() {
    this.world.ctx.fillStyle = "rgba(0,0,0,0.3)";
    this.world.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  renderMainMessage(message) {
    let gradient = this.createGradient();
    this.world.ctx.strokeStyle = this.world.character.isDead() ? "grey" : "yellow";
    this.world.ctx.strokeWidth = 5;
    this.world.ctx.font = "60px LuckiestGuy";
    this.world.ctx.fillStyle = this.world.character.isDead() ? "yellow" : gradient;
    this.world.ctx.textAlign = "center";
    this.world.ctx.lineWidth = 8;
    this.world.ctx.strokeText(message, canvas.width / 2, canvas.height / 2.1);
    this.world.ctx.fillText(message, canvas.width / 2, canvas.height / 2.1);
  }

  /**
   * Creates a color gradient from left to right over canvas
   *
   * @return {*} 
   * @memberof Screen
   */
  createGradient() {
    let gradient = this.world.ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "lightblue");
    gradient.addColorStop("0.5", "magenta");
    gradient.addColorStop("1.0", "orange");
    return gradient;
  }

  /**
   * Renders a text for endscreen based on character status.
   *
   * @memberof Screen
   */
  renderLineRestart() {
    this.world.ctx.lineWidth = 4;
    this.world.ctx.strokeStyle = "white";
    this.world.ctx.font = "30px LuckiestGuy";
    this.world.ctx.fillStyle = "magenta";
    let text = this.world.character.isDead() ? "Press ENTER to restart" : "Press ENTER to continue";
    this.world.ctx.strokeText(text, canvas.width / 2, (canvas.height / 5) * 4);
    this.world.ctx.fillText(text, canvas.width / 2, (canvas.height / 5) * 4);
  }

  /**
   * Renders a text line in magenta showing player score
   *
   * @memberof Screen
   */
  renderLineScore() {
    this.world.ctx.lineWidth = 4;
    this.world.ctx.strokeStyle = "white";
    this.world.ctx.font = "30px LuckiestGuy";
    this.world.ctx.fillStyle = "magenta";
    this.world.ctx.strokeText(`Your score is: ${this.world.score}`, canvas.width / 2, (canvas.height / 5) * 3.1);
    this.world.ctx.fillText(`Your score is: ${this.world.score}`, canvas.width / 2, (canvas.height / 5) * 3.1);
  }
}
