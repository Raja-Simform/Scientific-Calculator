import {
  ERROR,
  ERROR_INPUT,
  POWER_2,
  POWER_3,
  POWER_TO,
  POINT_VAL,
} from "./constants.js";
import { show } from "./display.js";

export function equals(calculator) {
  try {
    if (
      calculator.expression === ERROR_INPUT ||
      calculator.expression === ERROR
    ) {
      return;
    }
    if (calculator.expression === "") return;

    let result = eval(calculator.expression);
    result = parseFloat(result.toFixed(POINT_VAL));

    calculator.expression = result.toString();
    calculator.displayVal = calculator.expression;
  } catch (error) {
    calculator.expression = ERROR;
    calculator.displayVal = ERROR;
  }
  show(calculator);
}

export function backspace(calculator) {
  if (!calculator.expression) {
    return;
  }
  if (
    calculator.expression === ERROR ||
    calculator.expression === ERROR_INPUT
  ) {
    calculator.clearbtn();
    return;
  }
  if (calculator.expression.endsWith(POWER_TO)) {
    calculator.expression = calculator.expression.slice(0, -2);
    calculator.displayVal = calculator.displayVal.slice(0, -1);
  } else if (
    calculator.expression.endsWith(POWER_2) ||
    calculator.expression.endsWith(POWER_3)
  ) {
    calculator.expression = calculator.expression.slice(0, -3);
    calculator.displayVal = calculator.displayVal.slice(0, -1);
  } else {
    calculator.expression = calculator.expression.slice(0, -1);
    calculator.displayVal = calculator.displayVal.slice(0, -1);
  }
  show(calculator);
}

export function squareRoot(calculator) {
  if (calculator.secondbtn) {
    calculator.expression += "Math.cbrt(";
    calculator.displayVal += "∛(";
  } else {
    calculator.expression += "Math.sqrt(";
    calculator.displayVal += "√(";
  }
  show(calculator);
}

export function square(calculator) {
  calculator.expression = calculator.expression.replace(/\*\*3$|\*\*2$/, "");
  calculator.displayVal = calculator.displayVal.replace(/[²³]$/, "");

  if (calculator.expression === "" || /[*+\-/^]$/.test(calculator.expression))
    return;

  if (calculator.secondbtn) {
    calculator.expression += POWER_3;
    calculator.displayVal += "³";
  } else {
    calculator.expression += POWER_2;
    calculator.displayVal += "²";
  }

  show(calculator);
}

export function tenX(calculator) {
  if (
    calculator.expression === "" ||
    /[\+\-\*\/\(]$/.test(calculator.expression)
  ) {
    calculator.expression += "10**";
    calculator.displayVal += "10^";
  } else {
    calculator.expression += "*10**";
    calculator.displayVal += "*10^";
  }
  show(calculator);
}

export function XY(calculator) {
  if (!calculator.expression.endsWith(POWER_TO)) {
    calculator.expression += POWER_TO;
    calculator.displayVal += "^";
    show(calculator);
  }
}

export function pi(calculator) {
  if (
    calculator.expression &&
    !isNaN(calculator.expression[calculator.expression.length - 1])
  ) {
    calculator.expression += "*Math.PI";
    calculator.displayVal += "*π";
  } else {
    calculator.expression += "Math.PI";
    calculator.displayVal += "π";
  }
  show(calculator);
}

export function exponent(calculator) {
  if (
    calculator.expression &&
    !isNaN(calculator.expression[calculator.expression.length - 1])
  ) {
    calculator.expression += "*Math.E";
    calculator.displayVal += "*e";
  } else {
    calculator.expression += "Math.E";
    calculator.displayVal += "e";
  }
  show(calculator);
}

export function factorial(num) {
  if (num === 0 || num === 1) return 1;
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

export function factorialHandler(calculator) {
  if (
    calculator.expression === "" ||
    isNaN(calculator.expression[calculator.expression.length - 1])
  )
    return;
  let num = "";
  let i = calculator.expression.length - 1;
  while (i >= 0 && !isNaN(calculator.expression[i])) {
    num = calculator.expression[i] + num;
    i--;
  }
  if (num !== "") {
    let factValue = factorial(Number(num));
    calculator.expression = calculator.expression.slice(0, i + 1) + factValue;
    calculator.displayVal += "!";
  }

  show(calculator);
}
