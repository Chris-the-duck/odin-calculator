// WIP: Something is fundamentally broken with the "pending" logic, I was just able to keep entering numbers and hitting enter and it kept adding them for no reason
// Annd trying to reproduce with click input rather than keyboard broke it entirely
// Rethink equals button logic, that thing is a piece of shit

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
            return divide(num1, num2);    
        }
        return 'Error!'
    }
    else if (operator == 'x') {
        return multiply(num1, num2);
    }
}

// Make numbers buttons work

const numberButtons = document.querySelectorAll('.num');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        displayNumber(button.textContent);
    });
});

function displayNumber(number) {
    if (display.textContent == '0' || display.textContent == 'Error!') {
        clearDisplay();
    }
    if (number == '.' && display.textContent.indexOf('.') >= 0) {  // Make sure no decimal points can be entered if there's already one there
        return;
    }

    if (pending) {
        buffer = makeNumber(display.textContent);
        clearDisplay();
        pending = null;
    }
    if (display.textContent.length < 12) {
        display.textContent += number;
        pending = null;
    }
}


// Make operators work

const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        dealWithOperator(button.id);
    });
});

function dealWithOperator(button) {
    let num = (display.textContent == 'Error!') ? 0 : makeNumber(display.textContent); 
    if (!buffer) {
        buffer = num;
    }
    else {
        let result = operate(operator, buffer, num);
        display.textContent = result;
        buffer = result;
    }
    pending = 1;
    operator = button;
}

// Equals sign button

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    equalsFunction();       // needs to be separate named function so I can call it on keyboard input
});

function equalsFunction() {
    if (operator && buffer) {
        let num = makeNumber(display.textContent);
        let result = operate(operator, buffer, num);
        display.textContent = result;
        buffer = null;
        operator = null;
        pending = 1;        // Pending even though no operation is pending, because if user
    }                       // enters new numbers here, it should do new calculation, not concatenate      
}

// In place operators

const inPlaceButtons = document.querySelectorAll('.inPlaceOp')
inPlaceButtons.forEach(button => {
    button.addEventListener('click', () => {
        operateInPlace(button.id);
    });
});

function operateInPlace(action) {
    let num = (display.textContent == 'Error!') ? 0 : makeNumber(display.textContent);
    let disp = display.textContent;
    if (action == 'percent') {
        display.textContent = num / 100;
    }
    else if (action == 'backspace') {
        if (display.textContent.length == 1) {
            display.textContent = 0;
        }
        else {
            display.textContent = disp.slice(0, -1);
        }        
    }
    else if (action == 'invert') {
        if (num !== 0) {
            display.textContent = 1 / num;
        } else {display.textContent = 'Error!'}
    }
    else if (action == 'square') {
        display.textContent = num ** 2;
    }
    else if (action == 'sqrt') {
        display.textContent = Math.sqrt(num);
    }
    else if (action == 'neg') {
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

// Keyboard support

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (!isNaN(keyName) || keyName == '.') {
        displayNumber(keyName);
    }
    if (keyName == 'Backspace') {
        operateInPlace('backspace');       /* I should've made the button IDs the same as the keyboard input names, but OH WELL */
    }
    if (keyName == 'Enter') {
        equalsFunction();
    }
    if (keyName == '+' || keyName == '-') {
        dealWithOperator(keyName);
    }
    if (keyName == '/') {
        dealWithOperator('divide');
    }
    if (keyName == '*') {
        dealWithOperator('x');
    }
    console.log(keyName);
});