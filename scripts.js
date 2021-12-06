// Variables that will be used over and over

let operator;
let buffer;
let pending;
let wipeIt;

const display = document.querySelector('.display');
display.textContent = '0';

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
            return divide(num1, num2);     // WIP - division by zero is disallowed but operator doing nothing breaks it regardless
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
    if (display.textContent == '0') {
        clearDisplay();
    }
    if (pending) {
        buffer = makeNumber(display.textContent);
        clearDisplay();
        pending = null;
    }
    if (display.textContent.length < 12) {
        display.textContent += (button.textContent);
        pending = null;
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
        buffer = null;
        operator = null;
        pending = 1;        // Pending even though no operation is pending, because if user
    }                       // enters new numbers here, it should do new calculation, not concatenate                   
});

// In place operators

const inPlaceButtons = document.querySelectorAll('.inPlaceOp')
inPlaceButtons.forEach(button => {
    button.addEventListener('click', () => {
        operateInPlace(button);
    });
});

function operateInPlace(button) {
    let op = button.id;
    let num = makeNumber(display.textContent);
    let disp = display.textContent;
    if (op == 'percent') {
        display.textContent = num / 100;
    }
    else if (op == 'backspace') {
        if (display.textContent.length == 1) {
            display.textContent = 0;
        }
        else {
            display.textContent = disp.slice(0, -1);
        }        
    }
    else if (op == 'invert') {
        display.textContent = 1 / num;
    }
    else if (op == 'square') {
        display.textContent = num ** 2;
    }
    else if (op == 'sqrt') {
        display.textContent = Math.sqrt(num);
    }
    else if (op == 'neg') {
        display.textContent = - num;
    }
}

// CE and CE buttons

const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        deleteThings(button);
    });
});

function deleteThings(button) {
    display.textContent = '0';
    if (button.id == 'C') {
        buffer = null;
        operator = null;
        pending = null;
    }
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