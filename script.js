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

const buttons = Array.from(document.querySelectorAll('button'));

function updateDisplay(newChar) {
    if (display.textContent == '_') { display.textContent = newChar }
    else {
        display.textContent += newChar
    };
    
};



//LIMIT DISPLAY
//WHEN DELETE LEAVES BLANK?
//When there is a result, what happens if i press DEL?

//num1 !== '' && operator = ''
//num1 = ''  : no modificar nada
//operator != '' && num2 = '' : reemplazar op, y en display
//num2 !== '' : operate, num1 = result, display = num 1, new operator, num2 = ''
//display = result 


// IF I WANT TO MODIFY THE RESULT, BUGS

//Pressing = before entering all of the numbers or an operator could cause problems!



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
                display.textContent = result + operator;
            }
            break;
        case 'sp-button':
            switch(button.textContent) {
                case '=':
                    if (num1 == '' || num2 == '') { break };
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
                            if (num2 == '') {operator = '' }
                            else { num2 = num2.slice(0,num2.length - 1) };
                        }
                        else {
                            num1 = num1.slice(0,num1.length - 1);
                        };
                    };
                    if (display.textContent == result) { break };
                    display.textContent = display.textContent.slice(0,display.textContent.length - 1);
                    break;
                case 'ANS':
                    updateDisplay(result.toString);  //num2 = ANS error
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

function pressAnimate(btn) {
    btn.classList.add('pressed');
    setTimeout(function() { btn.classList.remove("pressed") }, 90);
};

function pressButton(code) {
    let i = 0;
    let ok = true;
    if ((code >= 0 && code < 10) || code == '+' || code == '-' || code == '*' || code == '/') {
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

/*
1 : 6
2 : 7
3 : 8

*/