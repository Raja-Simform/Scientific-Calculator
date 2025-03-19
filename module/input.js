/**
 * @file input.js
 * @description Handles user input  through keyboard and mouse 
 */

import {
  ERROR_MESSAGE,
  KEYPAD_SELECTOR,
  TRIGNO_DROPDOWN_SELECTOR,
  FUNC_DROPDOWN_SELECTOR,
  BACKSPACE_KEY,
  ENTER_KEY,
  EQUALS_KEY,
  BTN_EQUALS,
  BTN_BACKSPACE,
  BTN_2ND,
  BTN_SIN,
  BTN_COS,
  BTN_TAN,
  BTN_CLEAR,
  BTN_E,
  BTN_FLOOR,
  BTN_CEIL,
  BTN_LOG,
  BTN_LN,
  BTN_ABS,
  BTN_SQUARE,
  BTN_SQUAREROOT,
  BTN_TENX,
  BTN_XY,
  BTN_INVERSE,
  BTN_SIGN_CHANGE,
  BTN_FACTORIAL,
  BTN_PI,
  BTN_EXPONENTIAL,
  ALLOWED_KEYS
} from './constants.js';

/**
 * Class responsible for  input from keyboard and mouse events
 * @class
 */
class InputHandler {
    /**
     * Creates an instance of InputHandler
     * @param {Object} calci - Calculator instance 
     * @constructor
     */
    constructor(calci) {
      this.calci = calci;
      this.clickHandler = this.clickHandler.bind(this);
      this.backspaceHandler = this.backspaceHandler.bind(this);
      this.keyHandler = this.keyHandler.bind(this);
      this.initEventListeners();
    }
  
    /**
     * Initializes all event listeners for keyboard and mouse interactions
     * @private
     */
    initEventListeners() {
      document.querySelector(KEYPAD_SELECTOR).addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (button) {
          this.clickHandler(e);
        }
      });
      document.addEventListener("keydown", this.backspaceHandler);
      document.addEventListener("keypress", this.keyHandler);
      document
        .querySelector(TRIGNO_DROPDOWN_SELECTOR)
        .addEventListener("click", this.clickHandler);
  
      document
        .querySelector(FUNC_DROPDOWN_SELECTOR)
        .addEventListener("click", this.clickHandler);
    }
  
    /**
     * Handles backspace key press events
     * @param {KeyboardEvent} e - The keyboard event
     * @private
     */
    backspaceHandler(e) {
      if (e.key === BACKSPACE_KEY) {
        this.calci.backspace();
      }
    }
  
    /**
     * Handles keyboard input events except for backspace
     * @param {KeyboardEvent} e - The keyboard event
     * @private
     */
    keyHandler(e) {
      let keylist = new Set(ALLOWED_KEYS);
      let key = e.key;
  
      if ((key >= "0" && key <= "9") || keylist.has(key)) {
        if (key === ENTER_KEY || key === EQUALS_KEY) {
          this.calci.equals();
        } else {
          if (this.calci.evalstr === ERROR_MESSAGE) return;
          this.calci.evalstr += key;
          this.calci.resultstr += key;
          this.calci.renderDisplay();
        }
      }
    }
  
    /**
     * Handles button click events 
     * @param {MouseEvent} e - The mouse event
     * @private
     */
    clickHandler(e) {
        const targetbtn = e.target.closest("button");
        const currentKey = targetbtn?.value;
      
        if (!currentKey) {
          return;
        }
      
        switch (currentKey) {
          case BTN_EQUALS:
            this.calci.equals();
            break;
          case BTN_BACKSPACE:
            this.calci.backspace();
            break;
          case BTN_2ND:
            this.calci.modeManager.changeMode();
            break;
          case BTN_SIN:
            this.calci.mathOperations.sin();
            break;
          case BTN_COS:
            this.calci.mathOperations.cos();
            break;
          case BTN_TAN:
            this.calci.mathOperations.tan();
            break;
          case BTN_CLEAR:
            this.calci.evalstr = "";
            this.calci.resultstr = "";
            this.calci.renderDisplay();
            break;
          case BTN_E:
            this.calci.mathOperations.exponent();
            break;
          case BTN_FLOOR:
            this.calci.mathOperations.floor();
            break;
          case BTN_CEIL:
            this.calci.mathOperations.ceil();
            break;
          case BTN_LOG:
            this.calci.mathOperations.log();
            break;
          case BTN_LN:
            this.calci.mathOperations.ln();
            break;
          case BTN_ABS:
            this.calci.mathOperations.abs();
            break;
          case BTN_SQUARE:
            this.calci.mathOperations.square();
            break;
          case BTN_SQUAREROOT:
            this.calci.mathOperations.squareroot();
            break;
          case BTN_TENX:
            this.calci.mathOperations.tenx();
            break;
          case BTN_XY:
            this.calci.mathOperations.xy();
            break;
          case BTN_INVERSE:
            this.calci.mathOperations.inverse();
            break;
          case BTN_SIGN_CHANGE:
            this.calci.mathOperations.signChange();
            break;
          case BTN_FACTORIAL:
            this.calci.mathOperations.factorialHandler();
            break;
          case BTN_PI:
            this.calci.mathOperations.pi();
            break;
          case BTN_EXPONENTIAL:
            this.calci.mathOperations.expi();
            break;
          default:
            this.calci.evalstr += currentKey;
            this.calci.resultstr += currentKey;
            break;
        }
        
        this.calci.renderDisplay();
      }
}
  
export default InputHandler;