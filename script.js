const display = document.querySelector('#display-text');
display.textContent = '|';

let num1, num2, operator, result;

//Restarts num1, num2, operator
function reSet() {
    num1 = '';
    num2 = '';
    operator = '';
};

reSet();


//another display limit bug 
//


function add(a,b) { return parseFloat(a)+parseFloat(b); };
function subtract(a,b) { return a-b};
function multiply(a,b) { return a*b};
function divide(a,b) { return a/b};

function operate(op = '+',a = '0',b = '0') {
    switch(op) {
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case '*':
            result = multiply(a,b);
            break;
        case '/':
            result = divide(a,b);
            break;
    };
};


function updateDisplay(newChar) {
    if (display.textContent == '|') { display.textContent = newChar }
    else {
        display.textContent += newChar
    };
    
};

// IF I WANT TO MODIFY THE RESULT, BUGS
const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach((button) => button.addEventListener('click', () => {
    switch(button.className) {
        case 'op-button':
            if (num1 == '') {
                if (display.textContent == result) {
                    num1 = result;
                    updateDisplay(button.textContent);
                    operator = button.textContent;
                } else { break };
            } 
            else if (operator == '') {
                operator = button.textContent;
                updateDisplay(button.textContent);
            }
            else if (operator !== '' && num2 == '') {
                operator = button.textContent;
                display.textContent = display.textContent.slice(0,display.textContent.length - 1);
                updateDisplay(button.textContent);
            }
            else {
                operate(operator,num1,num2);
                reSet();
                num1 = result;
                operator = button.textContent;
                display.textContent = Math.round(result * 100000) / 100000 + operator;
            }
            break;
        case 'sp-button':
            switch(button.textContent) {
                case '=':
                    if (num1 == '' || num2 == '') { break };
                    operate(operator,num1,num2);
                    display.textContent = Math.round(result * 100000) / 100000;
                    if (display.textContent == '|') { alert('ERROR') }
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
                            if (num2 == '') {operator = '' }
                            else { num2 = num2.slice(0,num2.length - 1) };
                        }
                        else {
                            num1 = num1.slice(0,num1.length - 1);
                        };
                    };
                    if (display.textContent == result) { break };
                    if (num1 == '') { display.textContent = '|' }
                    else { display.textContent = display.textContent.slice(0,display.textContent.length - 1) };
                    break;
                case 'ANS':
                    updateDisplay(result.toString);  //num2 = ANS error
                    break;
            }
            break;
        default:
            if (display.textContent.length > 15) { break }
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
        };
    };
}

document.addEventListener('keydown', (event) => {
    pressButton(event.key);
});