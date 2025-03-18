
class InputManager {
  constructor(calculator) {
    this.calculator = calculator;

    this.clickHandler = this.clickHandler.bind(this);
    this.backspaceHandler = this.backspaceHandler.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    
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
  }

  backspaceHandler(e) {
    if (e.key === "Backspace") {
      this.calculator.backspace();
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
        this.calculator.equals();
      } else {
        if (this.calculator.evalstr === this.calculator.ERROR) return;
        this.calculator.evalstr += key;
        this.calculator.resultstr += key;
        this.calculator.renderDisplay();
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
        this.calculator.equals();
        break;
      case "backspace":
        this.calculator.backspace();
        break;
      case "2nd":
        this.calculator.modeManager.changeMode();
        break;
      case "sin":
        this.calculator.evalstr += this.calculator.modeManager.deg
          ? "Math.sin((Math.PI/180)*"
          : "Math.sin(";
        this.calculator.resultstr += "sin(";
        this.calculator.renderDisplay();
        break;
      case "cos":
        this.calculator.evalstr += this.calculator.modeManager.deg
          ? "Math.cos((Math.PI/180)*"
          : "Math.cos(";
        this.calculator.resultstr += "cos(";
        this.calculator.renderDisplay();
        break;
      case "tan":
        this.calculator.evalstr += this.calculator.modeManager.deg
          ? "Math.tan((Math.PI/180)*"
          : "Math.tan(";
        this.calculator.resultstr += "tan(";
        this.calculator.renderDisplay();
        break;
      case "C":
        this.calculator.clearCalc();
        break;
      case "e":
        this.calculator.mathOperations.exponent();
        break;
      case "floor":
        this.calculator.evalstr += "Math.floor(";
        this.calculator.resultstr += "floor(";
        this.calculator.renderDisplay();
        break;
      case "ceil":
        this.calculator.evalstr += "Math.ceil(";
        this.calculator.resultstr += "ceil(";
        this.calculator.renderDisplay();
        break;
      case "log":
        this.calculator.evalstr += "Math.log(";
        this.calculator.resultstr += "log(";
        this.calculator.renderDisplay();
        break;
      case "ln":
        this.calculator.evalstr += "Math.log10(";
        this.calculator.resultstr += "ln(";
        this.calculator.renderDisplay();
        break;
      case "abs":
        this.calculator.evalstr += "Math.abs(";
        this.calculator.resultstr += "abs(";
        this.calculator.renderDisplay();
        break;
      case "square":
        this.calculator.mathOperations.square();
        break;
      case "squareroot":
        if (this.calculator.modeManager.secondbtn) {
          this.calculator.evalstr += "Math.cbrt(";
          this.calculator.resultstr += "∛(";
        } else {
          this.calculator.evalstr += "Math.sqrt(";
          this.calculator.resultstr += "√(";
        }
        this.calculator.renderDisplay();
        break;
      case "10^x":
        this.calculator.mathOperations.tenx();
        break;
      case "xy":
        this.calculator.mathOperations.xy();
        break;
      case "inverse":
        this.calculator.mathOperations.inverse();
        break;
      case "+/-":
        this.calculator.mathOperations.signChange();
        break;
      case "factorial":
        this.calculator.mathOperations.factorialHandler();
        break;
      case "pi":
        this.calculator.mathOperations.pi();
        break;
      case "exponential":
        this.calculator.mathOperations.expi();
        break;
      default:
        this.calculator.evalstr += currentKey;
        this.calculator.resultstr += currentKey;
        break;
    }
    
    this.calculator.renderDisplay();
  }
}

export default InputManager;