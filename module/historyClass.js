/**
 * @file historyClass.js
 * @description Manages calculator history, including storage, display, and interaction
 */

import {
  HISTORY_MAX_COUNT,
  HISTORY_STORAGE_KEY,
  DISPLAY_BLOCK,
  DISPLAY_NONE,
  CALCULATOR_SELECTOR,
  HISTORY_PANEL_SELECTOR,
  HISTORY_TOGGLE_BTN_SELECTOR,
  CLEAR_HISTORY_BTN_SELECTOR,
  HISTORY_LIST_SELECTOR,
  NO_HISTORY_CLASS,
  HISTORY_ITEM_CLASS
} from './constants.js';

/**
 * Class for managing calculator history operations
 * @class
 */
class history {
  /**
   * Creates a history manager instance
   * @param {Object} calci - Calculator instance
   * @constructor
   */
  constructor(calci) {
    /** @type {Array<Object>} Array of history items  */
    this.calc_history = [];
    /** @type {number} Maximum number of history */
    this.COUNT = HISTORY_MAX_COUNT;
    /** @type {Object} Reference to the calculator instance */
    this.calci = calci;
    
    // Bind methods to this instance
    this.getHistory = this.getHistory.bind(this);
    this.saveHistoryToStorage = this.saveHistoryToStorage.bind(this);
    this.addToHistory = this.addToHistory.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.toggleHistoryDisplay = this.toggleHistoryDisplay.bind(this);
    this.createHistoryPanel = this.createHistoryPanel.bind(this);
    this.renderHistoryPanel = this.renderHistoryPanel.bind(this);

    // Set up click event to close history
    document.addEventListener("click", (event) => {
      const calculatorContainer = document.querySelector(CALCULATOR_SELECTOR);
      const historyPanel = document.querySelector(HISTORY_PANEL_SELECTOR);
      if (historyPanel && historyPanel.style.display === DISPLAY_BLOCK) {
        if (!calculatorContainer.contains(event.target)) {
          historyPanel.style.display = DISPLAY_NONE;
        }
      }
    });

    // Set up history toggle button 
    const historyBtn = document.querySelector(HISTORY_TOGGLE_BTN_SELECTOR);
    if (historyBtn) {
      historyBtn.addEventListener("click", this.toggleHistoryDisplay);
    }

    // Set up clear history button 
    const clearHistoryBtn = document.querySelector(CLEAR_HISTORY_BTN_SELECTOR);
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener("click", this.clearHistory);
    }
    
    // Load history from local storage on initialization
    this.getHistory();
  }

  /**
   * Retrieves  history from local storage
   * @returns {void}
   */
  getHistory() {
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    this.calc_history = savedHistory ? JSON.parse(savedHistory) : [];
  }
  
  /**
   * Saves current history to local storage
   * @returns {void}
   */
  saveHistoryToStorage() {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(this.calc_history));
  }
  
  /**
   * Adds a new calculation to history
   * @param {string} expression - The calculation expression
   * @param {number|string} result - The calculated result
   * @returns {void}
   */
  addToHistory(expression, result) {
    this.calc_history.unshift({
      expression,
      result: result.toString(),
    });
    // Trim history to maximum allowed length
    if (this.calc_history.length > this.COUNT) {
      this.calc_history = this.calc_history.slice(0, this.COUNT);
    }
    this.saveHistoryToStorage();
  }

  /**
   * Clears all history items
   * @returns {void}
   */
  clearHistory() {
    this.calc_history = [];
    this.saveHistoryToStorage();
    const historyPanel = document.querySelector(HISTORY_PANEL_SELECTOR);
    if (historyPanel && historyPanel.style.display !== DISPLAY_NONE) {
      this.renderHistoryPanel();
    }
  }
  
  /**
   * Toggles  history panel
   * @returns {void}
   */
  toggleHistoryDisplay() {
    const historyPanel = document.querySelector(HISTORY_PANEL_SELECTOR);
    console.log("hello")
    if (historyPanel) {
      if (historyPanel.style.display === DISPLAY_NONE) {
        historyPanel.style.display = DISPLAY_BLOCK;
        this.renderHistoryPanel();
      } else {
        historyPanel.style.display = DISPLAY_NONE;
      }
    }
  }
  
  /**
   * Creates the history panel
   * @returns {void}
   */
  createHistoryPanel() {
    const panel = document.createElement("div");
    panel.className = HISTORY_PANEL_SELECTOR.substring(1);
    document.querySelector(CALCULATOR_SELECTOR).appendChild(panel);
    this.renderHistoryPanel();
  }

  /**
   * Renders the history panel
   * @returns {void}
   */
  renderHistoryPanel() {
    const panel = document.querySelector(HISTORY_PANEL_SELECTOR);
    if (!panel) return;
    const historyList = panel.querySelector(HISTORY_LIST_SELECTOR);
    historyList.innerHTML = "";
    
    // Show placeholder if history is empty
    if (this.calc_history.length === 0) {
      historyList.innerHTML = `<p class="${NO_HISTORY_CLASS}">No calculations yet</p>`;
      return;
    }
    
    // Create and append history items
    this.calc_history.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.className = HISTORY_ITEM_CLASS;
      listItem.textContent = `${item.expression} = ${item.result}`;
      
      // Allow clicking on history item to restore that result
      listItem.addEventListener("click", () => {
        this.calci.evalstr = item.result;
        this.calci.resultstr = item.result;
        this.calci.renderDisplay();

        panel.style.display = DISPLAY_NONE;
      });
      historyList.appendChild(listItem);
    });
  }
}

export default history;