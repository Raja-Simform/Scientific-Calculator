import { show } from "./display.js";
import {
  POWER,
  SQRT,
  SQRT_VAL,
  SQUARE_VAL,
  CBRT_VAL,
  CUBE_VAL,
  DEG_VAL,
  RAD_VAL,
} from "./constants.js";
export function changeMode(calculator) {
  calculator.secondbtn = !calculator.secondbtn;

  document.querySelector(POWER).textContent = calculator.secondbtn
    ? CUBE_VAL
    : SQUARE_VAL;
  document.querySelector(SQRT).textContent = calculator.secondbtn
    ? CBRT_VAL
    : SQRT_VAL;
}

export function degree(calculator) {
  calculator.deg = !calculator.deg;
  document.querySelector(".unit").textContent = calculator.deg
    ? DEG_VAL
    : RAD_VAL;

  if (calculator.expression && !isNaN(Number(calculator.expression))) {
    show(calculator);
  }
}

export function convetExp(calculator) {
  if (!calculator.expression || isNaN(Number(calculator.expression))) return;

  let num = Number(calculator.expression);
  calculator.isExponential = !calculator.isExponential;

  if (calculator.isExponential) {
    let valStr = num.toExponential(2);
    let [value, ten] = valStr.split("e");

    calculator.expression = num.toString();

    calculator.displayVal = `${value}×10^${Number(ten)}`;
  } else {
    calculator.expression = num.toString();
    calculator.displayVal = calculator.expression;
  }

  show(calculator);
}

export function degTorad(calculator, e) {
  let currentKey = e.target.closest("button")?.value;
  switch (currentKey) {
    case "degree":
      degree(calculator);
      break;
    case "F-E":
      convetExp(calculator);
      break;
    default:
      break;
  }
}
