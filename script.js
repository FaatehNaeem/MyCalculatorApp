let currentInput = "";
let calculatorField = document.getElementById("calculator-field");

function numbers() {
  let element = document.getElementsByClassName("button-row-1");
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", () => {
      let x = element[i].innerHTML;
      x = parseFloat(x);
      console.log(x);
      currentInput += x;
      calculatorField.value = currentInput;
    });
  }
}

numbers();

function specialCharacters() {
  let specialCharacters = document.getElementsByClassName("special-char");
  for (let y = 0; y < specialCharacters.length; y++) {
    specialCharacters[y].addEventListener("click", () => {
      let specialValue = specialCharacters[y].innerHTML;
      console.log(specialValue);

      if (specialValue === "=") {
        try {
          // Custom calculation using regular expression
          currentInput = customEval(currentInput);
          calculatorField.value = currentInput;

          if (calculatorField.value.length >= 6) {
            const numericValue = parseFloat(calculatorField.value);
            if (!isNaN(numericValue)) {
              const roundedValue = numericValue.toFixed(3);
              calculatorField.value = roundedValue.toString();
            }
          }
        } catch (error) {
          calculatorField.value = "Error";
        }
      } else if (specialValue === "C") {
        try {
          currentInput = "";
          calculatorField.value = currentInput;
        } catch (error) {
          calculatorField.value = "Error";
        }
      } else {
        currentInput += specialValue;
        calculatorField.value = currentInput;
      }
    });
  }
}

specialCharacters();

function customEval(input) {
  // Use a regular expression to detect exponentiation (^) and evaluate it
  const regex = /(\d+)\^(\d+)/g;
  input = input.replace(regex, function (match, base, exponent) {
    return Math.pow(parseFloat(base), parseFloat(exponent));
  });
  // Use eval to evaluate any remaining expressions
  input = eval(input);
  return input;
}
