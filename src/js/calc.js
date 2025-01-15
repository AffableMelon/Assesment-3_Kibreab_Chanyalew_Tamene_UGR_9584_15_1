document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");
  const eq = document.getElementById("equals");
  const cl = document.getElementById("clear");
  const display = document.getElementById("display");
  let str = "";

  cl.addEventListener("click", () => {
    str = "";
    updateDisplay();
  });

  eq.addEventListener("click", () => {
    str = evaluateExpression(str);
    updateDisplay();
  });

  buttons.forEach((button) => {
    if (button.getAttribute("data-value")) {
      button.addEventListener("click", (e) => {
        handleButtonClick(e.target.getAttribute("data-value"));
      });
    }
  });

  function handleButtonClick(value) {
    const lastChar = str.slice(-1);

    if (isOperator(value) && isOperator(lastChar)) {
      str = str.slice(0, -1) + value;
    } else if (str === "0" && value === "0") {
      return;
    } else {
      str += value;
    }
    updateDisplay();
  }

  function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
  }

  function evaluateExpression(expression) {
    try {
      return eval(expression).toString();
    } catch (e) {
      return "Error";
    }
  }

  function updateDisplay() {
    display.value = str;
  }
});
