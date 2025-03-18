/**
 * @class Mode
 * @description Manages calculator mode states
 */

import {
  TOGGLE_BTN_SELECTOR,
  UNIT_SELECTOR,
  BTN_DEGREE,
  BTN_FE,
  MODE_DEG,
  MODE_RAD,
  CUBE_DISPLAY,
  SQUARE_DISPLAY,
  CUBE_ROOT_DISPLAY,
  SQUARE_ROOT_DISPLAY,
  BTN_SQUARE,
  BTN_SQUAREROOT
} from './constants.js';


class Mode {
  /**
   * @constructor
   * @param {Object} calci - Calculator instance 
   */
  constructor(calci) {
    this.calci = calci;
    this.secondbtn = false;
    this.deg = true;

    this.degbtnHandler = this.degbtnHandler.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.degree = this.degree.bind(this);

    this.initEventListeners();
  }

  /**
   * @method initEventListeners
   * @description Sets up event listeners 
   */
  initEventListeners() {
    document
      .querySelector(TOGGLE_BTN_SELECTOR)
      .addEventListener("click", this.degbtnHandler);
  }

  /**
   * @method changeMode
   * @description Toggles between primary and secondary function modes
   * @returns {void}
   */
  changeMode() {
    this.secondbtn = !this.secondbtn;

    document.querySelector(`[value='${BTN_SQUARE}']`).textContent = this.secondbtn
      ? CUBE_DISPLAY
      : SQUARE_DISPLAY;
    document.querySelector(`[value='${BTN_SQUAREROOT}']`).textContent = this.secondbtn
      ? CUBE_ROOT_DISPLAY
      : SQUARE_ROOT_DISPLAY;
  }

  /**
   * @method degree
   * @description Toggles between degree (DEG) and radian (RAD) modes
   * @returns {void}
   */
  degree() {
    this.deg = !this.deg;
    document.querySelector(UNIT_SELECTOR).textContent = this.deg ? MODE_DEG : MODE_RAD;

    if (this.calci.evalstr && !isNaN(Number(this.calci.evalstr))) {
      this.calci.renderDisplay();
    }
  }

  /**
   * @method degbtnHandler
   * @description Event handler for degree/FE button clicks
   * @param {Event} e - Click event object
   * @returns {void}
   */
  degbtnHandler(e) {
    let currentKey = e.target.closest("button")?.value;
    switch (currentKey) {
      case BTN_DEGREE:
        this.degree();
        break;
      case BTN_FE:
        this.calci.mathOperations.expi();
        break;
      default:
        break;
    }
  }
}

export default Mode;