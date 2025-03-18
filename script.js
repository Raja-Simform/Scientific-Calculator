/**
 * @fileoverview Handles dropdown menu functionality for trigonometry and function menus
 * @module DropdownController
 */

import {
  TRIGNO_DROPDOWN_SELECTOR,
  FUNC_DROPDOWN_SELECTOR,
  TRIGNO_DROPDOWN_ID,
  FUNC_DROPDOWN_ID,
  TRIGNO_DROPBTN_SELECTOR,
  FUNC_DROPBTN_SELECTOR,
  SHOW_TRIGNO_CLASS,
  SHOW_FUNC_CLASS
} from './constants.js';

/**
 * Event listener for the trigonometry dropdown menu
 * Toggles the visibility of the trigonometry functions dropdown
 * @listens click
 */
document.querySelector(TRIGNO_DROPDOWN_SELECTOR).addEventListener("click", () => {
  document.getElementById(TRIGNO_DROPDOWN_ID).classList.toggle(SHOW_TRIGNO_CLASS);
});

/**
 * Event listener for the functions dropdown menu
 * Toggles the visibility of the general functions dropdown
 * @listens click
 */
document.querySelector(FUNC_DROPDOWN_SELECTOR).addEventListener("click", () => {
  document.getElementById(FUNC_DROPDOWN_ID).classList.toggle(SHOW_FUNC_CLASS);
});

/**
 * Global click handler to close dropdown 
 * Implements a click-outside behavior 
 * @param {MouseEvent} event - The click event object
 * @listens click
 */
window.onclick = function (event) {
  // Close trigonometry dropdown when clicking outside
  if (!event.target.closest(TRIGNO_DROPBTN_SELECTOR)) {
    if (
      document
        .getElementById(TRIGNO_DROPDOWN_ID)
        .classList.contains(SHOW_TRIGNO_CLASS)
    ) {
      document
        .getElementById(TRIGNO_DROPDOWN_ID)
        .classList.remove(SHOW_TRIGNO_CLASS);
    }
  }
  
  // Close functions dropdown when clicking outside
  if (!event.target.closest(FUNC_DROPBTN_SELECTOR)) {
    if (
      document.getElementById(FUNC_DROPDOWN_ID).classList.contains(SHOW_FUNC_CLASS)
    ) {
      document.getElementById(FUNC_DROPDOWN_ID).classList.remove(SHOW_FUNC_CLASS);
    }
  }
};