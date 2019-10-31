class Calculator {
  constructor(previousInputElement, currentInputElement) {
    this.previousInputElement = previousInputElement; //previous input element
    this.currentInputElement = currentInputElement; //curent input element
    this.currentInput = ""; //where to store what to display
    this.previousInput = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    //if decimal point, only enable append once
    if (number === "." && this.currentInput.includes(".")) return;
    //pass in the button that was clicked on
    this.currentInput = String(this.currentInput) + String(number);
  }

  updateDisplay() {
    //add innertext to currentInput element
    this.currentInputElement.innerText = this.currentInput;
    //add innertext to previousInput element
    if (this.operation != null) {
      this.previousInputElement.innerText = `${this.previousInput} ${this.operation}`;
    } else {
      this.previousInputElement.innerText = this.previousInput;
    }
  }

  clear() {
    this.currentInput = "";
    this.previousInput = "";
    this.operation = undefined;
  }

  delete() {
    //get the last string and delete it
    this.currentInput = this.currentInput.slice(0, -1);
  }

  chooseOperation(operation) {
    //if you click operand without any other inputs don't display anything
    if (this.currentInput === "") return;
    //
    if (this.previousInput !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousInput = this.currentInput;
    this.currentInput = "";
  }

  calculate() {
    let calculation;
    let prev = parseFloat(this.previousInput);
    let current = parseFloat(this.currentInput);

    //if you click equals sign without any other inputs don't run
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        calculation = prev + current;
        break;
      case "-":
        calculation = prev - current;
        break;
      case "*":
        calculation = prev * current;
        break;
      case "÷":
        calculation = prev / current;
        break;
      default:
        return;
    }

    this.currentInput = calculation;
    this.operation = undefined;
    this.previousInput = "";
  }
}

const previousInputElement = document.querySelector(".previous-input");
const currentInputElement = document.querySelector(".current-input");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const clearButton = document.querySelector(".ac");
const deleteButton = document.querySelector(".del");
const equalsButton = document.querySelector(".calculate");

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
  calculator.clear();
});

const calculator = new Calculator(previousInputElement, currentInputElement);
