//tempat meyimpan data dan kondisi kalkulator
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
    history: []
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
    if (calculator.waitingForSecondNumber && calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
        calculator.waitingForSecondNumber = false;
    } else if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

//menambah titik desimal
function inputDecimal() {
    if (!calculator.displayNumber.includes('.')) {
        calculator.displayNumber += '.';
    }
}

//mengubah angka menjadi negatif atau positif
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = (parseFloat(calculator.displayNumber) * -1).toString();
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

//menambahkan ke riwayat
function addToHistory(firstNumber, operator, secondNumber, result) {
    const calculation = {
        firstNumber: firstNumber,
        operator: operator,
        secondNumber: secondNumber,
        result: result
    };
    
    calculator.history.push(calculation);
    updateHistoryDisplay();
}

//update tampilan riwayat
function updateHistoryDisplay() {
    const historyList = document.getElementById("historyList");
    
    // Bersihkan konten sebelumnya
    historyList.innerHTML = "";
    
    // Tambahkan semua riwayat ke dalam tabel
    for (let calc of calculator.history) {
        const row = document.createElement("tr");
        
        const firstNumberCell = document.createElement("td");
        firstNumberCell.textContent = calc.firstNumber;
        
        const operatorCell = document.createElement("td");
        operatorCell.textContent = calc.operator;
        
        const secondNumberCell = document.createElement("td");
        secondNumberCell.textContent = calc.secondNumber;
        
        const resultCell = document.createElement("td");
        resultCell.textContent = calc.result;
        
        row.appendChild(firstNumberCell);
        row.appendChild(operatorCell);
        row.appendChild(secondNumberCell);
        row.appendChild(resultCell);
        
        historyList.appendChild(row);
    }
}

//menjalankan kalkulasi
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    const firstNumber = parseFloat(calculator.firstNumber);
    const secondNumber = parseFloat(calculator.displayNumber);
    
    switch(calculator.operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "×": // Perkalian
            result = firstNumber * secondNumber;
            break;
        case "÷": // Pembagian
            if (secondNumber === 0) {
                alert("Tidak dapat membagi dengan nol!");
                clearCalculator();
                updateDisplay();
                return;
            }
            result = firstNumber / secondNumber;
            break;
    }
    
    // Tambahkan ke riwayat
    addToHistory(firstNumber.toString(), calculator.operator, secondNumber.toString(), result.toString());
    
    // Set hasil kalkulasi ke displayNumber dan reset kondisi
    calculator.displayNumber = result.toString();
    calculator.waitingForSecondNumber = false;
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
        //menjalankan fungsi decimal
        if (target.classList.contains('decimal')) {
            inputDecimal();
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
        updateDisplay();
    });
}