let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

const display = document.getElementById('display');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error: Div by 0';
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

function updateDisplay() {
    display.value = displayValue;
}

function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') {
        if (value === '.' && displayValue.includes('.')) return; // Prevent multiple decimals
        displayValue += value;
    } else if (value === 'C') {
        displayValue = '';
        firstOperand = null;
        secondOperand = null;
        currentOperator = null;
    } else if (value === '←') {
        displayValue = displayValue .slice(0, -1); // Remove last character
    } else if (value === '=') {
        if (firstOperand !== null && currentOperator) {
            secondOperand = parseFloat(displayValue);
            const result = operate(currentOperator, firstOperand, secondOperand);
            displayValue = result.toString();
            firstOperand = null; // Reset for next calculation
            currentOperator = null;
        }
    } else {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
            currentOperator = value;
            displayValue = ''; // Clear display for next number
        } else if (currentOperator) {
            secondOperand = parseFloat(displayValue);
            const result = operate(currentOperator, firstOperand, secondOperand);
            displayValue = result.toString();
            firstOperand = result; // Use result as first operand for next operation
            currentOperator = value; // Update operator
        }
    }
    updateDisplay();
}

// Event listeners for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.dataset.value));
});

document.getElementById('equals').addEventListener('click', () => handleButtonClick('='));
document.getElementById('clear').addEventListener('click', () => handleButtonClick('C'));
document.getElementById('backspace').addEventListener('click', () => handleButtonClick('←'));

// Optional: Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        handleButtonClick(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
    } else if (key === 'Enter') {
        handleButtonClick('=');
    } else if (key === 'Backspace') {
        handleButtonClick('←');
    } else if (key === 'Escape') {
        handleButtonClick('C');
    }
});