let a = '';
let b = '';
let sign = '';
let finish = false;

const numDigit = ['Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9']
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '*', '/', '%', '+/-'];

const out = document.querySelector('.calc-screen p');


function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

function percentage() {
    a = (a / 100) * b;
}

function add() {
    a = (+a) + (+b);
}

function div() {
    a = a / b;
}

function minus() {
    a = a - b;
}

function mul() {
    a = a * b;
}

function keyboard(event) {

    let key = event.key
    const numKey = event.code;

    if (numDigit.includes(numKey)) {
        for (i = 0; i < 1; i++) {
            let lastNum = numKey.slice(numKey.length - 1)
            key = lastNum
        }
    }

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            if (key === '.' && a.includes('.')) {
                a += ''
                out.textContent = a;
            } else {
                a += key;
                out.textContent = a;
            }

        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else if (key === '.' && b.includes('.')) {
            a += '';
            out.textContent = b
        } else {
            b += key;
            out.textContent = b;
        }
        return;
    }

    if (action.includes(key)) {
        if (key === '*') {
            sign = 'x'
            out.textContent = sign;
        } else {
            sign = key;
            out.textContent = sign;
        }

        if (action.includes(key)) {
            if (key === '+/-') {
                a = -1 * a;
                out.textContent = a
            }
        }
        return;
    }
}

function EnterNum() {

    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            if (key === '.' && a.includes('.')) {
                a += ''
                out.textContent = a;
            } else {
                a += key;
                out.textContent = a;
            }

        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else if (key === '.' && b.includes('.')) {
            a += '';
            out.textContent = b
        } else {
            b += key;
            out.textContent = b;
        }
        return;
    }


    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;

        if (action.includes(key)) {
            if (key === '+/-') {
                a = -1 * a;
                out.textContent = a
            }
        }
        return;
    }
}

function operation() {

    const key = event.target.textContent;

    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                add()
                break;
            case "-":
                minus()
                break;
            case "x":
                mul()
                break;
            case "/":
                if (b === '0') {
                    out.textContent = 'Error';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                div()
                break;
            case '%':
                percentage();
                break;
        }
        finish = true;
        out.textContent = a;
    }
}

document.querySelector('.ac').addEventListener('click', clearAll)
document.querySelector('body').addEventListener('keydown', keyboard)

document.querySelector('.buttons').addEventListener('click', function (event) {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    EnterNum()
    operation()
})