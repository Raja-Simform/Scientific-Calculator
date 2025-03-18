
import CalculatorBase from './CalculatorBase.js';
import InputManager from './InputManager.js';
import MathOperations from './MathOperations.js';
import ModeManager from './ModeManager.js';
import MemoryManager from './MemoryManager.js';
import HistoryManager from './HistoryManager.js';

class ScientificCalculator extends CalculatorBase {
  constructor() {
    super();
    
    this.modeManager = new ModeManager(this);
    this.mathOperations = new MathOperations(this);
    this.memoryManager = new MemoryManager(this);
    this.historyManager = new HistoryManager(this);
    this.inputManager = new InputManager(this);
    
    
    this.renderDisplay();
  }
}

export default ScientificCalculator;