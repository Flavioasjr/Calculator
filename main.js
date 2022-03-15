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

function operate(operators, num) {
    let result = 0;
    let auxAdd = 0;
    let i = 0;
    for (let operator of operators) {

        if (operator === '+') {
            if (num[i]) {
                if (!num[i + 1]) {
                    auxAdd = add(auxAdd, Number(num[i]));
                } else {
                    auxAdd += add(Number(num[i]), Number(num[i + 1]));
                }
                console.log(auxAdd);
            }
        }

        if (operator === '-') {
            if (num[i]) {
                if (!num[i + 1]) {
                    auxAdd = subtract(auxAdd, Number(num[i]));
                } else {
                    auxAdd += subtract(Number(num[i]), Number(num[i + 1]));
                }
                console.log(auxAdd);
            }
        }

        if (operator === '*') {
            if (!num[i + 1]) {
                auxAdd = multiply(auxAdd, Number(num[i]));
            } else {
                auxAdd += multiply(Number(num[i]), Number(num[i + 1]));
            }
            console.log(auxAdd);
        }

        if (operator === '/') {
            if (!num[i + 1]) {
                auxAdd = divide(auxAdd, Number(num[i]));
            } else {
                auxAdd += divide(Number(num[i]), Number(num[i + 1]));
            }
            console.log(auxAdd);
        }
        i += 2;
    }



    // if (operator === '+') {
    //     result = add(num1, num2);
    // }

    // if (operator === '-') {
    //     result = subtract(num1, num2);
    // }

    // if (operator === '*') {
    //     result = multiply(num1, num2);
    // }

    // if (operator === '/') {
    //     result = divide(num1, num2);
    // }
    result = auxAdd
    return result;
}

function prepareToOperate(value) {
    // const removided = value.pop();  // removendo o caractere '='
    // console.log(value);
    let num = value.map((element, index) => {
        if (element !== '+' && element !== '-' && element !== '*' && element !== '/' && element !== '=') return element;
    });
    let num1 = [''];
    let operator = value.filter(element => element === '+' || element === '-' || element === '*' || element === '/');
    let aux = 0;


    for (let i = 0; i < num.length - 1; i++) {
        if (num[i] !== undefined) {
            num1[aux] += num[i];
        } else {
            aux++;
            num1[aux] = '';
        }
    }

    const result = operate(operator, num1);
    return result;

}

const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');
const input = document.querySelector('#calculator');

buttons.addEventListener('click', e => {
    showDisplay(e.target);
});

function showDisplay(e) {
    input.value += e.textContent;
    const lastValue = input.value[input.value.length - 1];

    if (lastValue === 'C') {
        input.value = '';
        return;
    }

    if (lastValue === '<') {
        input.value = input.value.slice(0, -2);
        return;
    }

    if (lastValue === '=') {
        const result = prepareToOperate(input.value.split(''));

        input.value = result;
        return;
    }
}
