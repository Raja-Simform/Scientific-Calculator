
class MemoryManager {
  constructor(calculator) {
    this.calculator = calculator;
    this.memory = null;
    

    this.getMemory = this.getMemory.bind(this);
    this.setMemory = this.setMemory.bind(this);
    this.updateMemoryButtons = this.updateMemoryButtons.bind(this);
    this.memoryhandler = this.memoryhandler.bind(this);
    
   
    this.getMemory();
    this.updateMemoryButtons();
    
 
    document
      .querySelector(".memory-btn")
      .addEventListener("click", this.memoryhandler);
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
      if (
        this.calculator.evalstr &&
        this.calculator.evalstr !== this.calculator.ERROR
      ) {
        currentValue = parseFloat(eval(this.calculator.evalstr));
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
          this.calculator.evalstr = this.memory.toString();
          this.calculator.resultstr = this.calculator.evalstr;
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
    this.calculator.renderDisplay();
  }
}

export default MemoryManager;