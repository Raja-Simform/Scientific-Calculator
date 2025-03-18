
class CalculatorBase {
  constructor() {
    this.ERROR = "Error";
    this.evalstr = "";
    this.resultstr = "";
    this.display = document.querySelector(".result");
    
    this.renderDisplay = this.renderDisplay.bind(this);
    this.clearCalc = this.clearCalc.bind(this);
  }

  renderDisplay() {
    this.display.textContent = this.resultstr || "0";
  }

  clearCalc() {
    this.evalstr = "";
    this.resultstr = "";
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
      
     
      if (this.historyManager) {
        this.historyManager.addToHistory(expressionToShow, result);
      }
      
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
}

export default CalculatorBase;