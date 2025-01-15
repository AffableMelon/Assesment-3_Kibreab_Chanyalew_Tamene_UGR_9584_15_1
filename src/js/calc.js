const buttons = document.querySelectorAll("button");
const eq = document.getElementById("equals");
const cl = document.getElementById("clear");
let str = "";

cl.addEventListener("click", (e) => {
  str = "";
  check();
});

function calculate(expression) {
  try {
    return new Function("return " + expression)();
  } catch (e) {
    return "Error";
  }
}

eq.addEventListener("click", (e) => {
  str = calculate(str).toString();
  check();
});

function check() {
  document.getElementById("display").value = str;
}

buttons.forEach((button) => {
  if (button.getAttribute("data-value")) {
    button.addEventListener("click", (e) => {
      const strnum = e.target.getAttribute("data-value");
      const lastChar = str.slice(-1);

      if (
        ["+", "-", "*", "/"].includes(strnum) &&
        ["+", "-", "*", "/"].includes(lastChar)
      ) {
        str = str.slice(0, -1) + strnum;
      } else if (str === "0" && strnum === "0") {
        return;
      } else if (
        ["+", "-", "*", "/"].includes(lastChar) &&
        strnum === "0" &&
        str.slice(-2, -1) === "0"
      ) {
        return;
      } else {
        str += strnum;
      }
      check();
    });
  }
});
