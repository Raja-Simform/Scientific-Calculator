/**
 * @fileoverview Main calculator module that initializes  calculator components
 * @module ScientificCalculator
 */

import History from "./historyClass.js";
import MemoryClass from "./memoryClass.js";
import MathOperations from "./mathOperation.js";
import Display from "./display.js";
import InputHandler from "./input.js";
import Mode from "./mode.js";
import Core from "./core.js";

/**
 * Scientific calculator that coordinates display, input handling, history tracking,
 * memory operations, and calculation functionality
 * @class
 */
class ScientificCalculator {
  /**
   * Creates a new scientific calculator instance 
   * @constructor
   */
  constructor() {
    /**
     * Default error message 
     * @type {string}
     */
    this.ERROR = "Error";
    
    /**
     * String  of the current expression to be evaluated
     * @type {string}
     */
    this.evalstr = "";
    
    /**
     * String  of the current calculation result
     * @type {string}
     */
    this.resultstr = "";

    /**
     * Manages the calculator display
     * @type {Display}
     */
    this.displayManager = new Display(this);
    
    /**
     * Handles core calculation operations
     * @type {Core}
     */
    this.coreCalculator = new Core(this);
    
    /**
     * Manages calculation history
     * @type {History}
     */
    this.History = new History(this);
    
    /**
     * Handles memory operations (MS, MR, MC, M+, M-)
     * @type {MemoryClass}
     */
    this.Memory = new MemoryClass(this);
    
    /**
     * Provides mathematical operation handlers
     * @type {MathOperations}
     */
    this.mathOperations = new MathOperations(this);
    
    /**
     * Manages calculator modes (DEG/RAD, scientific notation)
     * @type {Mode}
     */
    this.modeManager = new Mode(this);
    
    /**
     * Processes user input from buttons and keyboard
     * @type {InputHandler}
     */
    this.inputHandler = new InputHandler(this);

    // Initialize the display on startup
    this.renderDisplay();
  }

  /**
   * Updates the calculator display with current values
   * @returns {void}
   */
  renderDisplay() {
    this.displayManager.renderDisplay();
  }

  /**
   * Removes the last character from the current expression
   * @returns {void}
   */
  backspace() {
    this.coreCalculator.backspace();
  }

  /**
   * Evaluates the current expression and displays the result
   * @returns {void}
   */
  equals() {
    this.coreCalculator.equals();
  }
}

/**
 * The calculator instance used throughout the application
 * @type {ScientificCalculator}
 */
const calculator = new ScientificCalculator();