const display = document.querySelector('#display-text');
display.textContent = '_';

let num1 = '', num2 = '', operator = '', result;

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


buttons.forEach((button) => button.addEventListener('click', () => {
    updateDisplay(button.textContent);
    switch(button.className) {
        case 'op-button':
            operator = button.textContent;
            break;
        case 'sp-button':
            switch(button.textContent) {
                case '=':
                    operate(operator,num1,num2);
                    display.textContent = result;
                    num1 = '';
                    num2 = '';
                    operator = '';
                    break;
                case 'AC':
                    num1 = '';
                    num2 = '';
                    operator = '';
                    display.textContent = '_';
                    break;
                
            }
            break;
        default:
            if (operator !== '') { num2 += button.textContent}
            else {num1 += button.textContent};
    }

}));