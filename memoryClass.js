/**
 * @class memoryClass
 * @description Manages calculator memory operations
 */
import { 
  MEMORY_STORAGE_KEY, 
  MEMORY_BTN_SELECTOR, 
  BTN_MC, 
  BTN_MR, 
  BTN_MPLUS, 
  BTN_MMINUS, 
  BTN_MS, 
  DISABLED_CLASS, 
  ERROR_MESSAGE 
} from './constants.js';
class memoryClass {
  /**
   * @constructor
   * @param {Object} calci - Calculator instance 
   */
  constructor(calci) {
    this.calci = calci;
    this.memory = null;

    this.getMemory = this.getMemory.bind(this);
    this.setMemory = this.setMemory.bind(this);
    this.updateMemoryButtons = this.updateMemoryButtons.bind(this);
    this.memoryhandler = this.memoryhandler.bind(this);

    this.getMemory();
    this.updateMemoryButtons();

    document
      .querySelector(MEMORY_BTN_SELECTOR)
      .addEventListener("click", this.memoryhandler);
  }

  /**
   * @method getMemory
   * @description Retrieves memory value from local storage
   * @returns {void}
   */
  getMemory() {
    const savedMemory = localStorage.getItem(MEMORY_STORAGE_KEY);
    this.memory = savedMemory ? parseFloat(savedMemory) : null;
  }

  /**
   * @method setMemory
   * @description Saves current memory value to local storage
   * @returns {void}
   */
  setMemory() {
    if (this.memory !== null) {
      localStorage.setItem(MEMORY_STORAGE_KEY, this.memory.toString());
    } else {
      localStorage.removeItem(MEMORY_STORAGE_KEY);
    }
  }

  /**
   * @method updateMemoryButtons
   * @description Updates the state of memory-related buttons
   * @returns {void}
   */
  updateMemoryButtons() {
    const hasMemory = this.memory !== null;
    const mcButton = document.querySelector(`[value="${BTN_MC}"]`);
    const mrButton = document.querySelector(`[value="${BTN_MR}"]`);

    if (mcButton) {
      mcButton.disabled = !hasMemory;
      mcButton.classList.toggle(DISABLED_CLASS, !hasMemory);
    }
    if (mrButton) {
      mrButton.disabled = !hasMemory;
      mrButton.classList.toggle(DISABLED_CLASS, !hasMemory);
    }
  }

  /**
   * @method memoryhandler
   * @description Event handler for memory operation button clicks
   * @param {Event} e - Click event object
   * @returns {void}
   */
  memoryhandler(e) {
    const button = e.target.closest("button");
    if (!button || button.disabled) return;

    const action = button.textContent.trim();
    let currentValue = 0;

    try {
      if (this.calci.evalstr && this.calci.evalstr !== ERROR_MESSAGE) {
        currentValue = parseFloat(eval(this.calci.evalstr));
      }
    } catch (error) {
      return;
    }

    switch (action) {
      case BTN_MC:
        this.memory = null;
        break;
      case BTN_MR:
        if (this.memory !== null) {
          this.calci.evalstr = this.memory.toString();
          this.calci.resultstr = this.calci.evalstr;
        }
        break;
      case BTN_MPLUS:
        if (this.memory === null) {
          this.memory = currentValue;
        } else {
          this.memory += currentValue;
        }
        break;
      case BTN_MMINUS:
        if (this.memory === null) {
          this.memory = -currentValue;
        } else {
          this.memory -= currentValue;
        }
        break;
      case BTN_MS:
        this.memory = currentValue;
        break;
    }

    this.setMemory();
    this.updateMemoryButtons();
    this.calci.renderDisplay();
  }
}

export default memoryClass;