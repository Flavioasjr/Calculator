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
    if (typeof num1 !== 'number' || typeof num2 !== 'number' 
    || num2 === 0) return 'error';
    return num1 / num2;
}

function operate(operators, num) {
    let result = 0;
    let index = 0;

    for (let operator of operators) {

        if (operator === '+') {
            if (num[index]) {
                if (!num[index + 1] || index > 0) {
                    result = add(result, Number(num[index]));
                    index += 1; 
                } else {
                    result += add(Number(num[index]), Number(num[index + 1]));
                    index += 2;
                }
            }
            
        }

        if (operator === '-') {
            if (num[index]) {
                if (!num[index + 1] || i>0) {
                    result = subtract(result, Number(num[index]));
                    index += 1;
                } else {
                    result += subtract(Number(num[index]), Number(num[index + 1]));
                    index += 2;
                }
            }
        }

        if (operator === '*') {
            if (!num[index + 1] || index > 0) {
                result = multiply(result, Number(num[index]));
                index += 1;
            } else {
                result += multiply(Number(num[index]), Number(num[index + 1]));
                index += 2;
            }
        }

        if (operator === '/') {
            if (!num[index + 1] || index > 0) {
                result = divide(result, Number(num[index]));
                index++;
            } else {
                result += divide(Number(num[index]), Number(num[index + 1]));
                index += 2;
            }
        }
        
    }
    if (typeof result !== 'number') return 'error';
    return result;
}

function prepareToOperate(inputValue) {
    let num = inputValue.map(element => {
        if (element !== '+' && element !== '-' && element !== '*' 
        && element !== '/' && element !== '=') return element;
    });

    let numbers = [''];
    let operators = inputValue.filter(element => element === '+' 
    || element === '-' || element === '*' || element === '/');
    let aux = 0;

    for (let i = 0; i < num.length - 1; i++) {
        if (num[i] !== undefined) {
            numbers[aux] += num[i];
        } else {
            aux++;
            numbers[aux] = '';
        }
    }

    // Prioridade nos cálculos de * e /:
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*') {
            operators.unshift(operators[i]);
            operators.splice(i + 1, 1);
            numbers.unshift(numbers[i + 1]);
            numbers.unshift(numbers[i + 1]);
            numbers.splice(i + 2, 2);
        
            if(operators[i] === '-') {
                numbers[0] = Number(numbers[0] * (-1));
                operators.splice(i, 1, '+');
            }
        }

        if (operators[i] === '/') {
            operators.unshift('*');
            operators.splice(i + 1, 1);
            numbers.unshift(Number(1 / numbers[i + 1]));
            numbers.unshift(numbers[i + 1]);
            numbers.splice(i + 2, 2);

            if(operators[i] === '-') {
                numbers[0] = Number(numbers[0] * (-1));
                operators.splice(i, 1, '+');
            }
        }
    }
    const result = operate(operators, numbers);
    return result;

}

const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');
const input = document.querySelector('#calculator');
const decimal = document.querySelector('.decimal');

buttons.addEventListener('click', e => {
    showDisplay(e.target);
});

function showDisplay(e) {
    if(e.classList.length === 0) return;
    
    input.value += e.textContent;
    const lastValue = input.value[input.value.length - 1];

    if (lastValue === '+' || lastValue === '-' || lastValue === '/'
    || lastValue === '*' || lastValue === 'C') decimal.disabled = false;

    if (lastValue === 'C') {
        input.value = '';
        return;
    }

    if (lastValue === '<') {
        input.value = input.value.slice(0, -2);
        return;
    }

    if(lastValue === '.') {
        decimal.disabled = true;
    }

    if (lastValue === '=') {
        const result = prepareToOperate(input.value.split(''));

        input.value = result;
        return;
    }
}
