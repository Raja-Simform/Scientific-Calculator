
class ModeManager {
  constructor(calculator) {
    this.calculator = calculator;
    this.secondbtn = false;
    this.deg = true;
    
   
    this.changeMode = this.changeMode.bind(this);
    this.degree = this.degree.bind(this);
    this.degbtnHandler = this.degbtnHandler.bind(this);
    
  
    document
      .querySelector(".toggle-btn")
      .addEventListener("click", this.degbtnHandler);
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
    
    if (this.calculator.evalstr && !isNaN(Number(this.calculator.evalstr))) {
      this.calculator.renderDisplay();
    }
  }

  degbtnHandler(e) {
    let currentKey = e.target.closest("button")?.value;
    
    switch (currentKey) {
      case "degree":
        this.degree();
        break;
      case "F-E":
        this.calculator.mathOperations.expi();
        break;
      default:
        break;
    }
  }
}

export default ModeManager;