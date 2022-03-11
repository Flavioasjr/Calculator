function add(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'error';
    return num1 + num2;
}

function subtract(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'error';
    return num1 - num2;
}

function multiply(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'error';
    return num1 * num2;
}

function divide(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'error';
    return num1 / num2;
}

function operate(operator, num1, num2) {
    let result = 0;

    if (operator === '+') {
        result = add(num1, num2);
    }

    if (operator === '-') {
        result = subtract(num1, num2);
    }

    if (operator === '*') {
        result = multiply(num1, num2);
    }

    if (operator === '/') {
        result = divide(num1, num2);
    }

    return result;
}

function prepareToOperate(firstPart, finalPart) {
    const operator = firstPart[firstPart.length - 1];
    const num1 = Number(firstPart.slice(0, firstPart.length - 1));
    const num2 = Number(finalPart);
    
    const result = operate (operator, num1, num2);

    return result;
}

let firstPartValue = '';
let finalPartValue = '';

function showDisplay() {
    const buttons = document.querySelector('.buttons');
    const display = document.querySelector('.display');
    const input = document.querySelector('#calculator');

    buttons.addEventListener('click', e => {
        input.value += e.target.textContent;
        const lastValue = input.value[input.value.length - 1];

        if (lastValue === '+' || lastValue === '-' ||
            lastValue === '/' || lastValue === '*') {
            firstPartValue = input.value;
        }

        if (lastValue === '=') {
            finalPartValue = input.value.substr(firstPartValue.length,
                input.value.length - firstPartValue.length - 1);
            const result = prepareToOperate(firstPartValue, finalPartValue);
            input.value = result;    
        }


    });
}

showDisplay();