/**
 * @file core.js
 * @description Core calculation functionality 
 */

import { ERROR_MESSAGE } from './constants.js';

/**
 * Class for handling core operations
 * @class
 */
class Core {
    /**
     * Creates an instance of class
     * @param {Object} calci - Calculator instance 
     * @constructor
     */
    constructor(calci) {
      /** @type {Object} Reference to the calculator instance */
      this.calci = calci;
      
      /** @type {string} Error message to display when calculations fail */
      this.ERROR = ERROR_MESSAGE;
      
      // Bind methods to this instance
      this.equals = this.equals.bind(this);
      this.backspace = this.backspace.bind(this);
    }
  
    /**
     * Evaluates the current expression
     * Adds the calculation to history if successful
     * @returns {void}
     */
    equals() {
      if (this.calci.evalstr === this.ERROR || this.calci.evalstr === "") {
        return;
      }
      try {
        const expressionToShow = this.calci.resultstr;
        let result = eval(this.calci.evalstr);
        result = Number(result.toFixed(3));
        this.calci.History.addToHistory(expressionToShow, result);
        this.calci.evalstr = result.toString();
        this.calci.resultstr = this.calci.evalstr;
      } catch (error) {
        this.calci.evalstr = this.ERROR;
        this.calci.resultstr = this.ERROR;
      } finally {
        this.calci.renderDisplay();
      }
    }
  
    /**
     * Removes the last character from the current expression
     * Handles special cases like exponents with multiple characters
     * @returns {void}
     */
    backspace() {
      if (!this.calci.evalstr) {
        return;
      }
      if (this.calci.evalstr === this.ERROR) {
        this.clearCalc();
        return;
      }
      if (this.calci.evalstr.endsWith("**")) {
        this.calci.evalstr = this.calci.evalstr.slice(0, -2);
        this.calci.resultstr = this.calci.resultstr.slice(0, -1);
      } else if (this.calci.evalstr.endsWith("**2") || this.calci.evalstr.endsWith("**3")) {
        this.calci.evalstr = this.calci.evalstr.slice(0, -3);
        this.calci.resultstr = this.calci.resultstr.slice(0, -1);
      } else {
        this.calci.evalstr = this.calci.evalstr.slice(0, -1);
        this.calci.resultstr = this.calci.resultstr.slice(0, -1);
      }
      this.calci.renderDisplay();
    }
  
    /**
     * Clears the calculator's current expression and result
     * @returns {void}
     */
    clearCalc() {
      this.calci.evalstr = "";
      this.calci.resultstr = "";
      this.calci.renderDisplay();
    }
  }
  
  export default Core;