/* 🔥 Requirements

1) Should see calculations in real time - Done
2) Should allow decimal point - Done
3) Should allow clearing the previous calculation - Done
4) Should use the data first principle - Done


⭐ Extras 

1) Convert the result to words → 50 becomes fifty, 69 becomes sixty nine - Done
2) Convert the result to roman numerals → 10 becomes X,  14 becomes XIV. Utilize stack overflow for conversion solutions - Done

*/

// Selectors
const body = document.querySelector("body");
const nums = document.querySelectorAll(".num");
const ops = document.querySelectorAll(".op");
const clear = document.querySelector(".clear");
const text = document.querySelector(".text");
const roman = document.querySelector(".roman");
const divide = document.querySelector(".divide");
const multiply = document.querySelector(".multiply");
const subtract = document.querySelector(".minus");
const add = document.querySelector(".plus");
const equal = document.querySelector(".equal");
const percent = document.querySelector(".percent");
const result = document.querySelector(".cal__result");
const liveCal = document.querySelector(".cal__live");
const decimal = document.querySelector(".decimal");
const activate = document.querySelector(".cal__activateBtn");

// Variables
let liveCalValue = "";
let currentValue = "";
let previousValue = "";
let solvedValue = "";

// Event Listeners
window.addEventListener("load", onLoadActions);
equal.addEventListener("click", runCalculations);
add.addEventListener("click", runCalculations);
subtract.addEventListener("click", runCalculations);
multiply.addEventListener("click", runCalculations);
divide.addEventListener("click", runCalculations);
percent.addEventListener("click", runCalculations);
clear.addEventListener("click", resetCalculator);
decimal.addEventListener("click", addDecimal);
roman.addEventListener("click", runRomanCalculations);
text.addEventListener("click", runTextCalculations);
activate.addEventListener("click", activateCalculator);

// Helper functions

nums.forEach((num) => {
  num.addEventListener("click", () => {
    let btnValue = num.innerText;
    currentValue += btnValue;
    liveCalValue += btnValue;
    liveCal.innerText = liveCalValue;
    result.innerText = currentValue;

    // Fuck my life this took way longer to get right. Reseting livedisplayValue after user has equalled in his previous cal
    if (currentValue !== "" && liveCalValue === previousValue + currentValue) {
      liveCalValue = currentValue;
      liveCal.innerText = liveCalValue;
    }
  });
});

ops.forEach((op) => {
  op.addEventListener("click", () => {
    ops.forEach((o) => o.classList.remove("active"));
    op.classList.add("active");
    if (currentValue !== "") {
      previousValue = currentValue;
    }
    currentValue = "";
    if (currentValue === "") {
      liveCalValue = previousValue;
    }
    setLiveCalOps();
  });
});

function setLiveCalOps() {
  if (add.classList.contains("active")) {
    liveCal.innerText = liveCalValue += "+";
  } else if (subtract.classList.contains("active")) {
    liveCal.innerText = liveCalValue += "-";
  } else if (multiply.classList.contains("active")) {
    liveCal.innerText = liveCalValue += "*";
  } else if (divide.classList.contains("active")) {
    liveCal.innerText = liveCalValue += "/";
  } else if (percent.classList.contains("active")) {
    liveCal.innerText = liveCalValue += "%";
  }
}

function runTextAndRomanCalculations(fn, cvn, pvn) {
  let currentValueNum = cvn;
  let previousValueNum = pvn;

  if (currentValueNum <= 5000 || currentValueNum >= 1) {
    result.innerText = fn(currentValueNum);
  } else if (
    currentValue === "." ||
    previousValueNum < 1 ||
    currentValueNum < 1
  ) {
    result.innerText = "Number is < 1";
  } else {
    result.innerText = "Number is large";
  }

  if (currentValue === "") {
    if (previousValueNum <= 5000) {
      result.innerText = fn(previousValueNum);
    } else {
      result.innerText = "Number is large";
    }
    if (previousValueNum < 0) {
      result.innerText = "Number is negative";
    } else if (
      previousValueNum === 0 ||
      previousValueNum === "" ||
      previousValue === ""
    ) {
      result.innerText = "Start Calculations";
    } else if (previousValueNum < 1) {
      result.innerText = "Number is < 1";
    }
  }
}

// Functions
function onLoadActions() {
  body.classList.add("loaded");
}

function activateCalculator() {
  body.classList.toggle("activated");
}

function runCalculations() {
  body.classList.remove("decimalAdded");
  if (add.classList.contains("active")) {
    solvedValue = Number(previousValue) + Number(currentValue);
    setCurrentAndResultValues();
  } else if (subtract.classList.contains("active")) {
    solvedValue = Number(previousValue) - Number(currentValue);
    setCurrentAndResultValues();
  } else if (multiply.classList.contains("active")) {
    solvedValue = Number(previousValue) * Number(currentValue);
    setCurrentAndResultValues();
  } else if (divide.classList.contains("active")) {
    solvedValue = Number(previousValue) / Number(currentValue);
    setCurrentAndResultValues();
  } else if (percent.classList.contains("active")) {
    solvedValue = (
      (Number(previousValue) / Number(currentValue)) *
      100
    ).toFixed(2);
    setCurrentAndResultValues();
  }
}

function setCurrentAndResultValues() {
  currentValue = solvedValue.toString();
  result.innerText = solvedValue.toLocaleString("en-US");
  previousValue = currentValue;
  currentValue = "";
  liveCalValue = "";
}

function addDecimal() {
  body.classList.add("decimalAdded");
}

function convertToRoman(number) {
  const numerals = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    3: "III",
    2: "II",
    1: "I",
  };

  let romanized = "";
  const decimalKeys = Object.keys(numerals).reverse();

  decimalKeys.forEach((key) => {
    while (key <= number) {
      romanized += numerals[key];
      number -= key;
    }
  });
  return romanized;
}

function convertToWords(number) {
  const numbersToWords = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
  };

  if (number in numbersToWords) return numbersToWords[number];

  let words = "";

  if (number >= 100) {
    words += convertToWords(Math.floor(number / 100)) + " hundred";

    number %= 100;
  }

  if (number > 0) {
    if (words !== "") words += " and ";

    if (number < 20) words += numbersToWords[number];
    else {
      words += numbersToWords[Math.floor(number / 10) * 10];

      if (number % 10 > 0) {
        words += "-" + numbersToWords[number % 10];
      }
    }
  }

  return words;
}

function runRomanCalculations() {
  let currentValueNum = Number(currentValue);
  let previousValueNum = Number(previousValue);
  runTextAndRomanCalculations(
    convertToRoman,
    currentValueNum,
    previousValueNum
  );
}

function runTextCalculations() {
  let currentValueNum02 = Number(currentValue).toFixed();
  let previousValueNum02 = Number(previousValue).toFixed();
  runTextAndRomanCalculations(
    convertToWords,
    currentValueNum02,
    previousValueNum02
  );
}

function resetCalculator() {
  currentValue = "";
  previousValue = "";
  solvedValue = "";
  liveCalValue = "";
  result.innerText = 0;
  liveCal.innerText =
    "How many monsters are good at math? None unless you count Dracula!";
  body.classList.remove("decimalAdded");
}
