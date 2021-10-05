//tempat meyimpan data dan kondisi kalkulator
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};
//mengupdate tampilan web
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

//mereset kalkulator
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}
//menginput angka
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}
//mengubah angka menjadi negatif atau positif
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}
//menetapkan operator
function handOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}
//menjalankan kalkulasi
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    calculator.displayNumber = result;
}

const buttons = document.querySelectorAll('.button');
for (let button of buttons) {
    button.addEventListener('click', function(event) {

        //mendapatkan objek elemen yang di klik
        const target = event.target;

        //menjalankan fungsi clearCalculator
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        //menjalankan fungsi inverse number
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        //menjalankan fungsi perform calculation
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
        //menjalankan fungsi hand operator
        if (target.classList.contains('operator')) {
            handOperator(target.innerText);
            return;
        }

        //memasukan hasil ke dalam inner text dan menampilkannya
        inputDigit(target.innerText);
        updateDisplay()
    });
}