const currentNumber = document.getElementById('current-number');
const lastCalculation = document.getElementById('last-calculation');
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const clearButton = document.getElementById('clear');
const plusMinus = document.getElementById('plus-minus');
const deleteButton = document.getElementById('delete');
const decimalButton = document.getElementById('decimal');
const equalsButton = document.getElementById('equals');

numberButtons.forEach(button =>
    button.addEventListener('click', () => setNumber(button.textContent))
    )



operatorButtons.forEach(button =>
    button.addEventListener('click', () => setOperator(button.textContent))
    )

decimalButton.addEventListener('click', appendDecimal);
clearButton.addEventListener('click', resetCalc);
equalsButton.addEventListener('click', solve);
plusMinus.addEventListener('click', posOrNeg);
deleteButton.addEventListener('click', deleteNumber);
document.addEventListener('keydown', keyboardFunction);

currentNumber.textContent = '';
let firstOperand = '';
let secondOperand = '';
let operator = null;

function add(a, b) {
    return a + b;
}
function subtract (a, b) { 
    return a - b;
}
function multiply (a, b) {
    return a * b;
}
function divide (a, b) {
    if (b === 0) {
        return "cant' divide by 0!";
    }
    else return a / b;
}

function setNumber(button) {
    if (currentNumber.textContent === '0') {
        resetCalc()
    } 
    currentNumber.textContent += button;
};

function setOperator(button) {
     if (operator !== null) 
    solve();
    firstOperand = currentNumber.textContent;
    if (currentNumber.textContent === '') firstOperand = 0;
    operator = button;
    lastCalculation.textContent += `${firstOperand} ${operator} `;
    currentNumber.textContent = '';
    
};

function solve() {
    secondOperand = currentNumber.textContent;
    operate (firstOperand, secondOperand, operator);
    lastCalculation.textContent = '';
    firstOperand = '';
    secondOperand = '';
    operator = null;
};

function operate(a, b, operation) {
    a = Number(a);
    b = Number(b);
    switch (operation) {
        case '+': 
            currentNumber.textContent = add (a, b);
            break;
        case '-':
            currentNumber.textContent = subtract (a, b);
            break;
        case '*':
            currentNumber.textContent =  multiply (a, b);
            break;
        case '/':
            currentNumber.textContent = divide (a, b);
            break;
    }
}

function resetCalc() {
    currentNumber.textContent = '';
    lastCalculation.textContent = '';
    firstOperand = '';
    secondOperand = '';
    operator = null;
};

function appendDecimal() {
    if (currentNumber.textContent.includes('.'))
    return;
    else if (currentNumber.textContent === '0' || currentNumber.textContent === '' ) {
    currentNumber.textContent = '0.' 
    }
    else currentNumber.textContent += '.';
} 

function posOrNeg() {
    if (currentNumber.textContent === '') return;

    let n = currentNumber.textContent;
    n *= -1;
    currentNumber.textContent = n;
} 

function deleteNumber() {
    currentNumber.textContent = currentNumber.textContent.toString().slice(0, -1)

    if (currentNumber.textContent === '-') 
    currentNumber.textContent = '';
}
function keyboardFunction(e) {
    if (e.key === '+') setOperator('+');
        else if (e.key === '-') setOperator('-');
        else if (e.key === '*') setOperator('*');
        else if (e.key === '/') setOperator('/');
        else if (e.key === '.') appendDecimal();
        else if (e.key === 'Backspace') deleteNumber();
        else if (e.key >= 0 || e.key <= 9) setNumber(e.key);
        else if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        solve()};
}