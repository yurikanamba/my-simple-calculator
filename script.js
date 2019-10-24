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
    this.previousInputElement.innerText = this.previousInput;
  }

  clear() {
    this.currentInput = "";
    this.previousInput = "";
    this.updateDisplay();
  }

  delete() {
    //get the last string and delete it
    this.currentInput = this.currentInput.slice(
      0,
      this.currentInput.length - 1
    );
    this.updateDisplay();
  }

  chooseOperation(operation) {
    //only enable this operation once
    if (
      this.previousInput !== "" &&
      this.previousInput.includes("÷" || "*" || "+" || "-")
    )
      return;
    //if possible display all previous inputs
    else if (this.currentInput !== "" && this.previousInput !== "") {
      console.log("hey");
      let calculation =
        parseFloat(this.previousInput) + parseFloat(this.currentInput);
      this.previousInput = String(calculation) + " " + this.operation;
      this.currentInput = "";
      this.updateDisplay();
    } else {
      this.operation = String(operation);
      this.previousInput = this.currentInput + " " + this.operation;
      this.currentInput = "";
      this.updateDisplay();
    }
  }

  calculate() {
    //only enable once
    let calculation =
      parseFloat(this.previousInput) + parseFloat(this.currentInput);
    this.currentInput = String(calculation);
    this.previousInput = "";
    this.updateDisplay();
    this.currentInput = "";
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
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  });
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
});

const calculator = new Calculator(previousInputElement, currentInputElement);
