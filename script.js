const display = document.querySelector('#display-text');
display.textContent = '|';

let num1, num2, operator;
let result = '';

//Restarts num1, num2, operator
function reSet() {
    num1 = '';
    num2 = '';
    operator = '';
};

reSet();

function add(a,b) { return parseFloat(a)+parseFloat(b) };
function subtract(a,b) { return a-b };
function multiply(a,b) { return a*b };
function divide(a,b) { return a/b };

function operate(op = '+',a = '0',b = '0') {
    switch(op) {
        case '+':
            result = Math.trunc(add(a,b) * 100000) / 100000;
            break;
        case '-':
            result = Math.trunc(subtract(a,b) * 100000) / 100000;
            break;
        case '*':
            result = Math.trunc(multiply(a,b) * 100000) / 100000;
            break;
        case '/':
            result = Math.trunc(divide(a,b) * 100000) / 100000;
            break;
    };
};


function updateDisplay(newChar) {
    if (display.textContent == '|') { display.textContent = newChar }
    else { display.textContent += newChar };
};

const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach((button) => button.addEventListener('click', () => {
    switch(button.className) {
        case 'op-button':
            if (num1 === '') {
                if (display.textContent == result) {
                    num1 = result;
                    updateDisplay(button.textContent);
                    operator = button.textContent;
                } else if (button.textContent == '-') {
                    num1 += button.textContent;
                    updateDisplay(button.textContent);
                } else { break };
            }
            else if (operator == '') {
                operator = button.textContent;
                updateDisplay(button.textContent);
            }
            else if (operator !== '' && num2 === '') {
                if (button.textContent == '-') {
                    num2 += button.textContent;
                    updateDisplay(button.textContent);
                } else {
                    operator = button.textContent;
                    display.textContent = display.textContent.slice(0,display.textContent.length - 1);
                    updateDisplay(button.textContent);
                }
            }
            else {
                operate(operator,num1,num2);
                reSet();
                num1 = result;
                operator = button.textContent;
                if (result == 'NaN') { display.textContent = 'Check your syntax!' }
                else { display.textContent = result + operator };
            };
            break;
        case 'sp-button':
            switch(button.textContent) {
                case '=':
                    if (num1 === '' || num2 === '') { break };
                    operate(operator,num1,num2);
                    if (result == 'NaN') { display.textContent = 'Check your syntax!' }
                    else { display.textContent = result };
                    reSet();
                    break;
                case 'AC':
                    reSet();
                    display.textContent = '|';
                    break;
                case 'DEL':
                    if (display.textContent == '|') { break }
                    else {
                        if (operator !== '') {
                            if (num2 === '') {operator = '' }
                            else { num2 = num2.slice(0,num2.length - 1) };
                        }
                        else {
                            num1 = num1.slice(0,num1.length - 1);
                        };
                    };
                    if (display.textContent == result) { break };
                    if (num1 === '') { display.textContent = '|' }
                    else { display.textContent = display.textContent.slice(0,display.textContent.length - 1) };
                    break;
                case 'ANS':
                    if (result !== '') {
                        if (display.textContent == result) { break }
                        else {
                            if (num1 === '') {
                                num1 = result;
                                updateDisplay(result);
                            }
                            else if (num2 === '') {
                                num2 = result;
                                updateDisplay(result);
                            };
                        };
                        }
                    break;
            }
            break;
        default:
            if ((display.textContent.length > 15) || (display.textContent == result)) { break }
            else {
                if (operator !== '') { num2 += button.textContent}
                else {num1 += button.textContent};
                updateDisplay(button.textContent);
            }
            break;
    }
}));

function pressAnimate(btn) {
    btn.classList.add('pressed');
    setTimeout(function() { btn.classList.remove("pressed") }, 90);
};

function pressButton(code) {
    let i = 0;
    let ok = true;
    if ((code >= 0 && code < 11) || code == '+' || code == '-' || code == '*' || code == '/' || code == '.') {
        while (ok) {
            if (buttons[i].textContent == code && ok) {
                buttons[i].click();
                pressAnimate(buttons[i]);
                ok = false;
            };
            i++;
        };
    } else {
        switch(code) {
            case 'Enter':
                buttons[18].click();
                pressAnimate(buttons[18]);
                break;
            case 'Backspace':
                buttons[12].click();
                pressAnimate(buttons[12]);
                break;
            case 'Delete':
                buttons[13].click();
                buttons[13].classList.add('pressed');
                pressAnimate(buttons[13]);
                break;
            case 'a':
                buttons[11].click();
                buttons[11].classList.add('pressed');
                pressAnimate(buttons[11]);
                break;
        };
    };
}

document.addEventListener('keydown', (event) => {
    pressButton(event.key);
});