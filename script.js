const display = document.querySelector('#display-text');
display.textContent = '_';

let num1, num2, operator, result;

//Restarts num1, num2, operator
function reSet() {
    num1 = '';
    num2 = '';
    operator = '';
};

reSet();

function add(a,b) { return parseFloat(a)+parseFloat(b); };
function subtract(a,b) { return a-b};
function multiply(a,b) { return a*b};
function divide(a,b) { return a/b};

function operate(op,a,b) {
    switch(op) {
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case 'x':
            result = multiply(a,b);
            break;
        case '/':
            result = divide(a,b);
            break;
    }
};

const buttons = Array.from(document.querySelectorAll('button'));

function updateDisplay(newChar) {
    if (display.textContent == '_') { display.textContent = newChar }
    else {
        display.textContent += newChar
    };
    
};



//LIMIT DISPLAY
//When there is a result, what happens if i press DEL?

buttons.forEach((button) => button.addEventListener('click', () => {
    switch(button.className) {
        case 'op-button':
            operator = button.textContent;
            updateDisplay(button.textContent);
            break;
        case 'sp-button':
            switch(button.textContent) {
                case '=':
                    operate(operator,num1,num2);
                    display.textContent = result;
                    reSet();
                    break;
                case 'AC':
                    reSet();
                    display.textContent = '_';
                    break;
                case 'DEL':
                    if (display.textContent == '_') { break }
                    else {
                        if (operator !== '') {
                            if (num2 == '') { operator = '' } //If there is already an operator, replace
                            else { num2 = num2.slice(0,num2.length - 1) };
                        }
                        else {
                            num1 = num1.slice(0,num1.length - 1);
                        };
                    }
                    display.textContent = display.textContent.slice(0,display.textContent.length - 1);
                    break;
            }
            break;
        default:
            if (operator !== '') { num2 += button.textContent}
            else {num1 += button.textContent};
            updateDisplay(button.textContent);
            break;
    }

}));