// Variables that will be used over and over

let operator;
let buffer;
let pending;
let wipeIt;

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
    if (wipeIt) {
        clearDisplay();             // WIP - meant to reset display if user just starts entering new numbers after finishing a calculation
        buffer = null;              // Currently also wipes display if they hit an operator to do another calculation - fix this
        operator = null;
        wipeIt = null;
    }
    if (pending) {
        buffer = makeNumber(display.textContent);
        clearDisplay();
        pending = 0;
    }
    if (display.textContent.length < 12) {
        display.textContent += (button.textContent);
        pending = 0;
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
    let num = makeNumber(display.textContent);
    if (!buffer) {
        buffer = num;
    }
    else {
        let result = operate(operator, buffer, num);
        display.textContent = result;
        buffer = result;
    }
    pending = 1;
    operator = button.id;
}

// Equals sign button

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    if (operator && buffer) {
        let num = makeNumber(display.textContent);
        let result = operate(operator, buffer, num);
        display.textContent = result;
        buffer = result;
        operator = null;
        wipeIt = 1;
    }
})


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