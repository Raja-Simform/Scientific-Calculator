/**
 * @file display.js
 * @description Manages the display functionality 
 */

/**
 * Class responsible for rendering 
 * @class
 */
class Display {
  /**
   * Creates an instance of the Display 
   * @param {Object} calci - Calculator instance 
   * @constructor
   */
  constructor(calci) {
    /** @type {Object} Reference to the calculator instance */
    this.calci = calci;
    
    /** @type {HTMLElement} DOM element representing the calculator display */
    this.display = document.querySelector(".result");
    
    // Bind methods to this instance
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  /**
   * Updates the calculator display 
   * Shows "0" if no result string is available
   * @returns {void}
   */
  renderDisplay() {
    this.display.textContent = this.calci.resultstr || "0";
  }
}

export default Display;