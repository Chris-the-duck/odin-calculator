// Variables that will be used over and over

let number1;
let number2;
let operator;

const display = document.querySelector('.display');

// Basic maths functions

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

// Operate function

function operate(operator, num1, num2) {
    if (operator == '+') {
        return add(num1, num2);
    }
    else if (operator == '-') {
        return subtract(num1, num2);
    }
    else if (operator == 'divide') {
        if (num2 !== 0) {
            return divide(num1, num2);
        }
    }
    else if (operator == 'x') {
        return multiply(num1, num2);
    }
}

// Make numbers buttons work

const numberButtons = document.querySelectorAll('.num');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        displayNumber(button);
    });
});

function displayNumber(button) {
    if (display.textContent.length < 12) {
        display.textContent += (button.textContent);
    }
}

// Make operators work

const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        dealWithOperator(button);
    });
});

function dealWithOperator(button) {
    console.log(button.id);
    if (!number1) {
        number1 = makeNumber(display.textContent);
    } else {number2 = makeNumber(display.textContent);}
    clearDisplay();
    if (number1 && number2) {
        console.log('Actual operation happens here')
    }
    else {console.log('Get the operator somehow and save it here')}
}


// Helper functions

function makeNumber(content) {
    if (content.indexOf('.') >= 0) {
        return parseFloat(content);
    }
    else {return parseInt(content);}
}

// Clear the display

function clearDisplay() {
    display.textContent = '';
}