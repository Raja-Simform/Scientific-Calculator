
class MathOperations {
  constructor(calculator) {
    this.calculator = calculator;
    this.exp = false;
    
    
    this.square = this.square.bind(this);
    this.tenx = this.tenx.bind(this);
    this.xy = this.xy.bind(this);
    this.pi = this.pi.bind(this);
    this.exponent = this.exponent.bind(this);
    this.factorial = this.factorial.bind(this);
    this.factorialHandler = this.factorialHandler.bind(this);
    this.signChange = this.signChange.bind(this);
    this.inverse = this.inverse.bind(this);
    this.expi = this.expi.bind(this);
  }

  square() {
    this.calculator.evalstr = this.calculator.evalstr.replace(/\*\*3$|\*\*2$/, "");
    this.calculator.resultstr = this.calculator.resultstr.replace(/[²³]$/, "");
    
    if (this.calculator.evalstr === "" || /[*+\-/^]$/.test(this.calculator.evalstr)) return;
    
    if (this.calculator.modeManager.secondbtn) {
      this.calculator.evalstr += "**3";
      this.calculator.resultstr += "³";
    } else {
      this.calculator.evalstr += "**2";
      this.calculator.resultstr += "²";
    }
    
    this.calculator.renderDisplay();
  }

  tenx() {
    if (
      this.calculator.evalstr === "" ||
      /[\+\-\*\/\(]$/.test(this.calculator.evalstr)
    ) {
      this.calculator.evalstr += "10**";
      this.calculator.resultstr += "10^";
    } else {
      this.calculator.evalstr += "*10**";
      this.calculator.resultstr += "*10^";
    }
    
    this.calculator.renderDisplay();
  }

  xy() {
    if (!this.calculator.evalstr.endsWith("**")) {
      this.calculator.evalstr += "**";
      this.calculator.resultstr += "^";
      this.calculator.renderDisplay();
    }
  }

  pi() {
    if (
      this.calculator.evalstr &&
      !isNaN(this.calculator.evalstr[this.calculator.evalstr.length - 1])
    ) {
      this.calculator.evalstr += "*Math.PI";
      this.calculator.resultstr += "*π";
    } else {
      this.calculator.evalstr += "Math.PI";
      this.calculator.resultstr += "π";
    }
    
    this.calculator.renderDisplay();
  }

  exponent() {
    if (
      this.calculator.evalstr &&
      !isNaN(this.calculator.evalstr[this.calculator.evalstr.length - 1])
    ) {
      this.calculator.evalstr += "*Math.E";
      this.calculator.resultstr += "*e";
    } else {
      this.calculator.evalstr += "Math.E";
      this.calculator.resultstr += "e";
    }
    
    this.calculator.renderDisplay();
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
      return this.calculator.ERROR;
    }
  }

  factorialHandler() {
    try {
      if (
        this.calculator.evalstr === "" ||
        isNaN(this.calculator.evalstr[this.calculator.evalstr.length - 1])
      ) {
        return;
      }
      
      let num = "";
      let i = this.calculator.evalstr.length - 1;
      
      while (i >= 0 && !isNaN(this.calculator.evalstr[i])) {
        num = this.calculator.evalstr[i] + num;
        i--;
      }
      
      if (num !== "") {
        let factValue = this.factorial(Number(num));
        this.calculator.evalstr = this.calculator.evalstr.slice(0, i + 1) + factValue;
        this.calculator.resultstr += "!";
      }
    } catch (error) {
      this.calculator.evalstr = this.calculator.ERROR;
      this.calculator.resultstr = this.calculator.ERROR;
    } finally {
      this.calculator.renderDisplay();
    }
  }

  signChange() {
    if (this.calculator.evalstr === "") this.calculator.evalstr = "0";
    
    if (typeof this.calculator.evalstr !== "string")
      this.calculator.evalstr = this.calculator.evalstr.toString();
    
    let match = this.calculator.evalstr.match(/(-?\d+(\.\d+)?)$/);
    
    if (match) {
      let num = Number(match[1]);
      let toggled = num * -1;
      this.calculator.evalstr = this.calculator.evalstr.replace(
        /(-?\d+(\.\d+)?)$/,
        `${toggled}`
      );
      this.calculator.resultstr = this.calculator.evalstr;
    }
    
    this.calculator.renderDisplay();
  }

  inverse() {
    if (typeof this.calculator.evalstr !== "string")
      this.calculator.evalstr = this.calculator.evalstr.toString();
    
    let match = this.calculator.evalstr.match(/(\d+(\.\d+)?)$/);
    
    if (match) {
      let num = Number(match[1]);
      let inverse = `1/(${num})`;
      this.calculator.evalstr = this.calculator.evalstr.replace(
        /(\d+(\.\d+)?)$/,
        inverse
      );
      this.calculator.resultstr = this.calculator.evalstr;
    }
    
    this.calculator.renderDisplay();
  }

  expi() {
    if (!this.calculator.evalstr || isNaN(Number(this.calculator.evalstr))) return;
    
    let num = Number(this.calculator.evalstr);
    this.exp = !this.exp;
    
    if (this.exp) {
      let exponentStr = num.toExponential(2);
      let [mantissa, exponent] = exponentStr.split("e");
      this.calculator.evalstr = num.toString();
      this.calculator.resultstr = `${mantissa}×10^${Number(exponent)}`;
    } else {
      this.calculator.evalstr = num.toString();
      this.calculator.resultstr = this.calculator.evalstr;
    }
    
    this.calculator.renderDisplay();
  }
}

export default MathOperations;