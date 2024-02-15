class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  };

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  };

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  };

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  };

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.operate()
    };
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  };

  operate() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    console.log('operation: ' + this.operation); // Remove
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case 'x':
        computation = prev * current;
        break;
      case '÷':
        if (prev === 0 && current === 0) {
          alert("By attemping to divide zero by zero you have created a black hole which will unstitch the fabric of the universe. Nice one.");
          this.clear();
        } else {
          computation = prev / current;
          break;
        }
      default:
        return
    };
    computation = parseFloat(computation.toFixed(10));
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  };

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    console.log("string number: " + stringNumber); // Remove
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    };
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      console.log('integer display:' + integerDisplay); // Remove
      return integerDisplay;
    };
  };

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    };
  }
};


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Keyboard support
const numCheck = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const operationArray = ['+', '-', '*', '/'];

window.addEventListener('keydown', function (e) {
  console.log('key: ' + e.key);
  if (e.key === 'Enter') {
    e.preventDefault();
    calculator.operate();
    calculator.updateDisplay();

  } else if (e.key === 'Backspace') {
    e.preventDefault();
    calculator.delete();
    calculator.updateDisplay();

  } else if (e.key === ' ') {
    calculator.clear();
    calculator.updateDisplay();

  } else if (numCheck.includes(e.key)) {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();

  } else if (operationArray.includes(e.key)) {
    let keyboardOperation = e.key;
    if (keyboardOperation == '/') { keyboardOperation = '÷' };
    if (keyboardOperation == '*') { keyboardOperation = 'x' };
    console.log("Your keyboard operation was " + keyboardOperation); // Remove
    calculator.chooseOperation(keyboardOperation);
    calculator.updateDisplay();
  };
});





const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.operate();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});