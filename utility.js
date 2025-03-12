let result = "";
let expression = "";
let temp = 0;
let isRadian = false;
let Error = "Error";

function display() {
  let resultDisplay = document.getElementById("calculator-display");
  resultDisplay.textContent = expression || "0";
  resultDisplay.scrollLeft = resultDisplay.scrollWidth;
}

document
  .querySelectorAll(".btn-col, .btn-col1, .btn-blue, .btn-dark")
  .forEach((btn) => {
    btn.addEventListener("click", function () {
      const value = this.value;
      if (value) {
        btnhandler(value);
      }
    });
  });

function btnhandler(val) {
  if (val === "c") {
    expression = "";
  } else if (val === "=") {
    try {
      if (expression === "0" || expression === "") {
        expression = "0";
      } else {
        temp = evaluateExpression(expression);
        result = temp;
        expression = String(temp);
      }
    } catch (error) {
      expression = Error;
    }
  } else if (val === "backspace") {
    if (expression.length === 1 || expression === "Error") {
      expression = "0";
    } else {
      expression = expression.slice(0, -1);
    }
  } else if (val === "pi") {
    insertValue(Math.PI);
  } else if (val === "e") {
    insertValue(Math.E);
  } else if (val === "square") {
    try {
      temp = Math.pow(evaluateExpression(expression), 2);
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "squareroot") {
    try {
      temp = Math.sqrt(evaluateExpression(expression));
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "inverse") {
    try {
      temp = 1 / evaluateExpression(expression);
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "abs") {
    try {
      temp = Math.abs(evaluateExpression(expression));
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "factorial") {
    try {
      temp = evaluateExpression(expression);
      if (temp < 0 || !Number.isInteger(temp)) {
        expression = Error;
      } else {
        let fac = 1;
        for (let i = 2; i <= temp; i++) {
          fac = fac * i;
        }
        expression = String(fac);
      }
    } catch (error) {
      expression = Error;
    }
  } else if (val === "log") {
    try {
      temp = Math.log10(evaluateExpression(expression));
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "ln") {
    try {
      temp = Math.log(evaluateExpression(expression));
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "10x") {
    try {
      temp = Math.pow(10, evaluateExpression(expression));
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "xy") {
    expression += "^";
  } else if (
    val === "+" ||
    val === "-" ||
    val === "*" ||
    val === "(" ||
    val === ")" ||
    val === "."
  ) {
    expression += val;
  } else if (val === "divide") {
    expression += "/";
  } else if (val === "mod") {
    expression += "%";
  } else if (val === "sin") {
    try {
      let angle = evaluateExpression(expression);
      if (!isRadian) {
        angle = (angle * Math.PI) / 180;
      }
      temp = Math.sin(angle);
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "cos") {
    try {
      let angle = evaluateExpression(expression);
      if (!isRadian) {
        angle = (angle * Math.PI) / 180;
      }
      temp = Math.cos(angle);
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "tan") {
    try {
      let angle = evaluateExpression(expression);
      if (!isRadian) {
        angle = (angle * Math.PI) / 180;
      }
      temp = Math.tan(angle);
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "ceil") {
    try {
      temp = Math.ceil(evaluateExpression(expression));
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "floor") {
    try {
      temp = Math.floor(evaluateExpression(expression));
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "exponential") {
    try {
      temp = Math.exp(evaluateExpression(expression));
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else if (val === "+/-") {
    try {
      temp = -1 * evaluateExpression(expression);
      expression = String(temp);
    } catch (error) {
      expression = Error;
    }
  } else {
    if (expression === "0" || expression === "Error") {
      expression = val;
    } else {
      expression += val;
    }
  }

  display();
}

function evaluateExpression(expr) {
  expr = expr.replace(/\^/g, "**");
  try {
    return eval(expr);
  } catch (error) {
    throw new Error("Invalid expression");
  }
}

function insertValue(value) {
  if (expression === "0" || expression === Error) {
    expression = String(value);
  } else {
    if (/[\d\)]$/.test(expression)) {
      expression += "*" + value;
    } else {
      expression += value;
    }
  }
}

document.querySelector(".unit").addEventListener("click", function () {
  isRadian = !isRadian;
  this.textContent = isRadian ? "RAD" : "DEG";
});

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (/[0-9]/.test(key)) {
    btnhandler(key);
  } else if (
    key === "+" ||
    key === "-" ||
    key === "." ||
    key === "(" ||
    key === ")"
  ) {
    btnhandler(key);
  } else if (key === "*") {
    btnhandler("*");
  } else if (key === "/") {
    btnhandler("divide");
  } else if (key === "%") {
    btnhandler("mod");
  } else if (key === "Enter" || key === "=") {
    btnhandler("=");
  } else if (key === "Backspace") {
    btnhandler("backspace");
  } else if (key === "Escape") {
    btnhandler("c");
  } else if (key === "^") {
    btnhandler("xy");
  }
});

document.querySelectorAll("#trigno-myDropdown a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    btnhandler(this.getAttribute("value"));
  });
});

document.querySelectorAll("#func-myDropdown a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    btnhandler(this.getAttribute("value"));
  });
});

display();
