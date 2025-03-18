import { ERROR, ERROR_INPUT } from "./constants.js";
import { show } from "./display.js";
import { initInputHandlers } from "./input.js";
export class ScientificCalculator {
  constructor() {
    this.expression = "";
    this.displayVal = "";
    this.secondbtn = false;
    this.deg = true;
    this.isExponential = false;
    this.display = document.querySelector(".result");
    show(this);
    initInputHandlers(this);
  }

  clearbtn() {
    this.expression = "";
    this.displayVal = "";
    show(this);
  }

  signChange() {
    if (this.expression === "") this.expression = "0";
    if (typeof this.expression !== "string")
      this.expression = this.expression.toString();
    let match = this.expression.match(/(-?\d+(\.\d+)?)$/);
    if (match) {
      let num = Number(match[1]);
      let change = num * -1;
      this.expression = this.expression.replace(
        /(-?\d+(\.\d+)?)$/,
        `${change}`
      );
      this.displayVal = this.expression;
    }
    show(this);
  }

  inversefunc() {
    if (typeof this.expression !== "string")
      this.expression = this.expression.toString();
      let match = this.expression.match(/(\d+(\.\d+)?)$/);
    if (match) {
      let num = Number(match[1]);
      let value = `1/(${num})`;
      this.expression = this.expression.replace(/(\d+(\.\d+)?)$/, value);
      this.displayVal = this.expression;
    }
    show(this);
  }
}
