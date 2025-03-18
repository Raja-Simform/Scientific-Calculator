import { show } from "./display.js";
import {
  equals,
  backspace,
  square,
  squareRoot,
  tenX,
  XY,
  factorialHandler,
  pi,
  exponent,
} from "./mathOperations.js";

import { degTorad, changeMode, toggleExponential } from "./ui.js";

export function initInputHandlers(calculator) {
  const boundKeyClick = (e) => {
    keyClickEventHandler(calculator, e);
  };
  const boundBackspace = (e) => {
    backSpaceKeyHandler(calculator, e);
  };

  const boundKeyPress = (e) => {
    keyPressHandler(calculator, e);
  };

  const boundDegreeClick = (e) => {
    degTorad(calculator, e);
  };

  document.querySelector(".keypad").addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      boundKeyClick(e);
    }
  });

  document
    .querySelector(".trigno-dropdown")
    .addEventListener("click", boundKeyClick);

  document
    .querySelector(".func-dropdown")
    .addEventListener("click", boundKeyClick);

  document
    .querySelector(".toggle-btn")
    .addEventListener("click", boundDegreeClick);

  document.addEventListener("keydown", boundBackspace);
  document.addEventListener("keypress", boundKeyPress);
}

export function keyClickEventHandler(calculator, e) {
  let btnval = e.target.closest("button");
  let tempval = btnval?.value;

  if (!tempval) {
    console.log(`This ${btn} is not found`);
    return;
  }

  switch (tempval) {
    case "=":
      equals(calculator);
      break;
    case "backspace":
      backspace(calculator);
      break;
    case "2nd":
      changeMode(calculator);
      break;
    case "sin":
      calculator.expression += calculator.deg
        ? "Math.sin((Math.PI/180)*"
        : "Math.sin(";
      calculator.displayVal += "sin(";
      show(calculator);
      break;
    case "cos":
      calculator.expression += calculator.deg
        ? "Math.cos((Math.PI/180)*"
        : "Math.cos(";
      calculator.displayVal += "cos(";
      show(calculator);
      break;
    case "tan":
      calculator.expression += calculator.deg
        ? "Math.tan((Math.PI/180)*"
        : "Math.tan(";
      calculator.displayVal += "tan(";
      show(calculator);
      break;
    case "C":
      calculator.clearbtn();
      break;
    case "e":
      exponent(calculator);
      break;
    case "floor":
      calculator.expression += "Math.floor(";
      calculator.displayVal += "floor(";
      show(calculator);
      break;
    case "ceil":
      calculator.expression += "Math.ceil(";
      calculator.displayVal += "ceil(";
      show(calculator);
      break;
    case "log":
      calculator.expression += "Math.log10(";
      calculator.displayVal += "log(";
      show(calculator);
      break;
    case "ln":
      calculator.expression += "Math.log(";
      calculator.displayVal += "ln(";
      show(calculator);
      break;
    case "abs":
      calculator.expression += "Math.abs(";
      calculator.displayVal += "abs(";
      show(calculator);
      break;
    case "square":
      square(calculator);
      break;
    case "squareroot":
      squareRoot(calculator);
      break;
    case "10^x":
      tenX(calculator);
      break;
    case "xy":
      XY(calculator);
      break;
    case "inverse":
      calculator.inversefunc();
      break;
    case "+/-":
      calculator.signChange();
      break;
    case "factorial":
      factorialHandler(calculator);
      break;
    case "pi":
      pi(calculator);
      break;
    case "exponential":
      toggleExponential(calculator);
      break;
    default:
      calculator.expression += tempval;
      calculator.displayVal += tempval;
      break;
  }

  show(calculator);
}

export function backSpaceKeyHandler(calculator, e) {
  if (e.key === "Backspace") {
    backspace(calculator);
  }
}

export function keyPressHandler(calculator, e) {
  let allowedKeyPress = new Set([
    "Enter",
    "Backspace",
    "(",
    ")",
    "*",
    "-",
    "+",
    "/",
    ".",
    "=",
  ]);
  let key = e.key;

  if ((key >= "0" && key <= "9") || allowedKeyPress.has(key)) {
    if (key === "Enter" || key === "=") {
      equals(calculator);
    } else {
      if (calculator.expression === calculator.ERROR) return;
      calculator.expression += key;
      calculator.displayVal += key;
      show(calculator);
    }
  }
}
