import history from "./historyClass.js";
class ScientificCalculator {
  constructor() {
    this.ERROR = "Error";
    this.evalstr = "";
    this.resultstr = "";
    this.secondbtn = false;
    this.deg = true;
    this.exp = false;
    this.memory = null;
    this.COUNT = 5;
    this.display = document.querySelector(".result");
    this.renderDisplay();
    this.updateMemoryButtons();

    this.History = new history(this);
    console.log("hello");

    this.clickHandler = this.clickHandler.bind(this);
    this.backspaceHandler = this.backspaceHandler.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    this.memoryhandler = this.memoryhandler.bind(this);
    this.degbtnHandler = this.degbtnHandler.bind(this);

    this.initEventListeners();
  }

  initEventListeners() {
    document.querySelector(".keypad").addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (button) {
        this.clickHandler(e);
      }
    });

    document.addEventListener("keydown", this.backspaceHandler);
    document.addEventListener("keypress", this.keyHandler);

    document
      .querySelector(".trigno-dropdown")
      .addEventListener("click", this.clickHandler);

    document
      .querySelector(".func-dropdown")
      .addEventListener("click", this.clickHandler);

    document
      .querySelector(".memory-btn")
      .addEventListener("click", this.memoryhandler);

    document
      .querySelector(".toggle-btn")
      .addEventListener("click", this.degbtnHandler);

    const historyBtn = document.querySelector(".history-toggle-btn");
    if (historyBtn) {
      historyBtn.addEventListener("click", () =>
        this.History.toggleHistoryDisplay()
      );
    }

    const clearHistoryBtn = document.querySelector(".clear-history-btn");
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener("click", () =>
        this.History.clearHistory()
      );
    }
  }

  renderDisplay() {
    this.display.textContent = this.resultstr || "0";
  }

  backspaceHandler(e) {
    if (e.key === "Backspace") {
      this.backspace();
    }
  }

  keyHandler(e) {
    let keylist = new Set([
      "Enter",
      "Backspace",
      "(",
      ")",
      "*",
      "-",
      "+",
      "/",
      ".",
      "=",
    ]);
    let key = e.key;

    if ((key >= "0" && key <= "9") || keylist.has(key)) {
      if (key === "Enter" || key === "=") {
        this.equals();
      } else {
        if (this.evalstr === this.ERROR) return;
        this.evalstr += key;
        this.resultstr += key;
        this.renderDisplay();
      }
    }
  }

  clickHandler(e) {
    let targetbtn = e.target.closest("button");
    let currentKey = targetbtn?.value;

    if (!currentKey) {
      console.log("No button value found");
      return;
    }

    switch (currentKey) {
      case "=":
        this.equals();
        break;
      case "backspace":
        this.backspace();
        break;
      case "2nd":
        this.changeMode();
        break;
      case "sin":
        this.evalstr += this.deg ? "Math.sin((Math.PI/180)*" : "Math.sin(";
        this.resultstr += "sin(";
        this.renderDisplay();
        break;
      case "cos":
        this.evalstr += this.deg ? "Math.cos((Math.PI/180)*" : "Math.cos(";
        this.resultstr += "cos(";
        this.renderDisplay();
        break;
      case "tan":
        this.evalstr += this.deg ? "Math.tan((Math.PI/180)*" : "Math.tan(";
        this.resultstr += "tan(";
        this.renderDisplay();
        break;
      case "C":
        this.evalstr = "";
        this.resultstr = "";
        this.renderDisplay();
        break;
      case "e":
        this.exponent();
        break;
      case "floor":
        this.evalstr += "Math.floor(";
        this.resultstr += "floor(";
        this.renderDisplay();
        break;
      case "ceil":
        this.evalstr += "Math.ceil(";
        this.resultstr += "ceil(";
        this.renderDisplay();
        break;
      case "log":
        this.evalstr += "Math.log(";
        this.resultstr += "log(";
        this.renderDisplay();
        break;
      case "ln":
        this.evalstr += "Math.log10(";
        this.resultstr += "ln(";
        this.renderDisplay();
        break;
      case "abs":
        this.evalstr += "Math.abs(";
        this.resultstr += "abs(";
        this.renderDisplay();
        break;
      case "square":
        this.square();
        break;
      case "squareroot":
        if (this.secondbtn) {
          this.evalstr += "Math.cbrt(";
          this.resultstr += "∛(";
        } else {
          this.evalstr += "Math.sqrt(";
          this.resultstr += "√(";
        }
        this.renderDisplay();
        break;
      case "10^x":
        this.tenx();
        break;
      case "xy":
        this.xy();
        break;
      case "inverse":
        this.inverse();
        break;
      case "+/-":
        this.signChange();
        break;
      case "factorial":
        this.factorialHandler();
        break;
      case "pi":
        this.pi();
        break;
      case "exponential":
        this.expi();
        console.log("exp");
        break;
      default:
        this.evalstr += currentKey;
        this.resultstr += currentKey;
        break;
    }

    this.renderDisplay();
  }

  equals() {
    if (this.evalstr === this.ERROR || this.evalstr === "") {
      return;
    }
    try {
      const expressionToShow = this.resultstr;
      let result = eval(this.evalstr);
      result = Number(result.toFixed(3));
      this.History.addToHistory(expressionToShow, result);
      this.evalstr = result.toString();
      this.resultstr = this.evalstr;
    } catch (error) {
      this.evalstr = this.ERROR;
      this.resultstr = this.ERROR;
    } finally {
      this.renderDisplay();
    }
  }

  backspace() {
    console.log("hello");
    if (!this.evalstr) {
      return;
    }
    if (this.evalstr === this.ERROR) {
      this.clearCalc();
      return;
    }
    if (this.evalstr.endsWith("**")) {
      this.evalstr = this.evalstr.slice(0, -2);
      this.resultstr = this.resultstr.slice(0, -1);
    } else if (this.evalstr.endsWith("**2") || this.evalstr.endsWith("**3")) {
      this.evalstr = this.evalstr.slice(0, -3);
      this.resultstr = this.resultstr.slice(0, -1);
    } else {
      this.evalstr = this.evalstr.slice(0, -1);
      this.resultstr = this.resultstr.slice(0, -1);
    }
    this.renderDisplay();
  }
  square() {
    this.evalstr = this.evalstr.replace(/\*\*3$|\*\*2$/, "");
    this.resultstr = this.resultstr.replace(/[²³]$/, "");

    if (this.evalstr === "" || /[*+\-/^]$/.test(this.evalstr)) return;

    if (this.secondbtn) {
      this.evalstr += "**3";
      this.resultstr += "³";
    } else {
      this.evalstr += "**2";
      this.resultstr += "²";
    }

    this.renderDisplay();
  }

  tenx() {
    if (this.evalstr === "" || /[\+\-\*\/\(]$/.test(this.evalstr)) {
      this.evalstr += "10**";
      this.resultstr += "10^";
    } else {
      this.evalstr += "*10**";
      this.resultstr += "*10^";
    }
    this.renderDisplay();
  }

  xy() {
    if (!this.evalstr.endsWith("**")) {
      this.evalstr += "**";
      this.resultstr += "^";
      this.renderDisplay();
    }
  }
  pi() {
    if (this.evalstr && !isNaN(this.evalstr[this.evalstr.length - 1])) {
      this.evalstr += "*Math.PI";
      this.resultstr += "*π";
    } else {
      this.evalstr += "Math.PI";
      this.resultstr += "π";
    }
    this.renderDisplay();
  }

  exponent() {
    if (this.evalstr && !isNaN(this.evalstr[this.evalstr.length - 1])) {
      this.evalstr += "*Math.E";
      this.resultstr += "*e";
    } else {
      this.evalstr += "Math.E";
      this.resultstr += "e";
    }
    this.renderDisplay();
  }

  factorial(n) {
    try {
      if (n === 0 || n === 1) {
        return 1;
      }

      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }

      return result;
    } catch (error) {
      return this.ERROR;
    }
  }

  factorialHandler() {
    try {
      if (this.evalstr === "" || isNaN(this.evalstr[this.evalstr.length - 1])) {
        return;
      }

      let num = "";
      let i = this.evalstr.length - 1;

      while (i >= 0 && !isNaN(this.evalstr[i])) {
        num = this.evalstr[i] + num;
        i--;
      }
      if (num !== "") {
        let factValue = this.factorial(Number(num));
        this.evalstr = this.evalstr.slice(0, i + 1) + factValue;
        this.resultstr += "!";
      }
    } catch (error) {
      this.evalstr = this.ERROR;
      this.resultstr = this.ERROR;
    } finally {
      this.renderDisplay();
    }
  }

  signChange() {
    if (this.evalstr === "") this.evalstr = "0";
    if (typeof this.evalstr !== "string")
      this.evalstr = this.evalstr.toString();

    let match = this.evalstr.match(/(-?\d+(\.\d+)?)$/);
    if (match) {
      let num = Number(match[1]);
      let toggled = num * -1;
      this.evalstr = this.evalstr.replace(/(-?\d+(\.\d+)?)$/, `${toggled}`);
      this.resultstr = this.evalstr;
    }
    this.renderDisplay();
  }

  inverse() {
    if (typeof this.evalstr !== "string")
      this.evalstr = this.evalstr.toString();
    let match = this.evalstr.match(/(\d+(\.\d+)?)$/);
    if (match) {
      let num = Number(match[1]);
      let inverse = `1/(${num})`;
      this.evalstr = this.evalstr.replace(/(\d+(\.\d+)?)$/, inverse);
      this.resultstr = this.evalstr;
    }
    this.renderDisplay();
  }

  changeMode() {
    this.secondbtn = !this.secondbtn;

    document.querySelector("[value='square']").textContent = this.secondbtn
      ? "x³"
      : "x²";
    document.querySelector("[value='squareroot']").textContent = this.secondbtn
      ? "∛x"
      : "√x";
  }

  degree() {
    this.deg = !this.deg;
    document.querySelector(".unit").textContent = this.deg ? "DEG" : "RAD";

    if (this.evalstr && !isNaN(Number(this.evalstr))) {
      this.renderDisplay();
    }
  }

  getMemory() {
    const savedMemory = localStorage.getItem("memoryKey");
    this.memory = savedMemory ? parseFloat(savedMemory) : null;
  }

  setMemory() {
    if (this.memory !== null) {
      localStorage.setItem("memoryKey", this.memory.toString());
    } else {
      localStorage.removeItem("memoryKey");
    }
  }

  updateMemoryButtons() {
    const hasMemory = this.memory !== null;
    const mcButton = document.querySelector('[value="MC"]');
    const mrButton = document.querySelector('[value="MR"]');

    if (mcButton) mcButton.classList.toggle("shadow-color", !hasMemory);
    if (mrButton) mrButton.classList.toggle("shadow-color", !hasMemory);
  }

  memoryhandler(e) {
    const button = e.target.closest("button");
    if (!button) return;

    const action = button.textContent.trim();
    let currentValue = 0;

    try {
      if (this.evalstr && this.evalstr !== this.ERROR) {
        currentValue = parseFloat(eval(this.evalstr));
      }
    } catch (error) {
      console.error("Error calculating current value:", error);
      return;
    }

    switch (action) {
      case "MC":
        this.memory = null;
        break;
      case "MR":
        if (this.memory !== null) {
          this.evalstr = this.memory.toString();
          this.resultstr = this.evalstr;
        }
        break;
      case "M+":
        if (this.memory === null) {
          this.memory = currentValue;
        } else {
          this.memory += currentValue;
        }
        break;
      case "M-":
        if (this.memory === null) {
          this.memory = -currentValue;
        } else {
          this.memory -= currentValue;
        }
        break;
      case "MS":
        this.memory = currentValue;
        break;
    }
    this.setMemory();
    this.updateMemoryButtons();
    this.renderDisplay();
  }

  expi() {
    if (!this.evalstr || isNaN(Number(this.evalstr))) return;
    let num = Number(this.evalstr);
    this.exp = !this.exp;
    if (this.exp) {
      let exponentStr = num.toExponential(2);
      let [mantissa, exponent] = exponentStr.split("e");
      this.evalstr = num.toString();
      this.resultstr = `${mantissa}×10^${Number(exponent)}`;
    } else {
      this.evalstr = num.toString();
      this.resultstr = this.evalstr;
    }
    this.renderDisplay();
  }

  degbtnHandler(e) {
    let currentKey = e.target.closest("button")?.value;
    switch (currentKey) {
      case "degree":
        this.degree();
        break;
      case "F-E":
        this.expi();
        break;
      default:
        break;
    }
  }
}
const calculator = new ScientificCalculator();
