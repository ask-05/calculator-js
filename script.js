let displayText = document.getElementById("displayText")
displayText.textContent = 0;

let calcText = document.getElementById("calcText");

let calcDisplay = document.getElementById("calcDisplay");

const buttons = document.querySelectorAll('.calc-row button');

let initialValue = displayText.textContent;
let previousValue = '';
let operator = '';
let result = 0;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        
        if (button.textContent == "AC") {
            displayText.textContent = 0;
            calcText.textContent = '';
            initialValue = 0;
            previousValue = 0;
            result = 0;
        } else if (button.textContent == "±") {
            if (initialValue == 0) {
                return;
            } else {
                displayText.textContent = initialValue*-1;
                initialValue = displayText.textContent;
            }
        } else if (button.textContent == "%") {
            displayText.textContent += "%";
            initialValue = Number(initialValue)/100;
        } else if (['+', '−', '×', '÷'].includes(button.textContent)) {
            operator = button.textContent;
            previousValue = initialValue;
            initialValue = 0;
        } else if (button.textContent == "=") {
           if (previousValue === "0" || initialValue === "0") return;

           const operations = {
            "+": (a, b) => a + b,
            "−": (a, b) => a - b,
            "×": (a, b) => a * b,
            "÷": (a, b) => a / b,
           }

           const opFunc = operations[operator];

           if (opFunc) {
            result = opFunc(Number(previousValue), Number(initialValue));
            displayText.textContent = String(result);
            calcText.textContent = `${previousValue} ${operator} ${initialValue}`
            initialValue = displayText.textContent;
            previousValue = "0";
           }
        } else {
            if (displayText.textContent == "0" || initialValue == "0") {
                displayText.textContent = String(button.textContent);
                initialValue = displayText.textContent;
            } else {
                displayText.textContent = String(displayText.textContent) + String(button.textContent);
                initialValue = displayText.textContent;
            }
            

        }
    })
})