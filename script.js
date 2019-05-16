class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        // Clear inputs to default.
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        // Check for multiple "."
        if(number === '.' && this.currentOperand.includes('.')) return
        
        // Allow multiple integer input.
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // Check for empty input:
        if(this.currentOperand === '') return
        // Check if previous operation exists.
        if(this.previousOperand !== '') {
            this.compute()
        }
        // Set the operation that is passed:
        this.operation = operation
        // Set previous to current:
        this.previousOperand = this.currentOperand
        // Clear out the value:
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // Check for empty input value.
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        // Convert number to str in order to split.
        const stringNumber = number.toString()
        // Split & get the value before the decimal place.
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        // Get the value after decimal place.
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        // Check for empty input or only decimal symbols.
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        // Display current input value:
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        // Move previous input to top of display & append operator to end.
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

};


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Set equal to Calculator class & pass data from constructor.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Number button event listener.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// Operation button event listener.
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Equals button event listener.
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// AC button event listener.
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// Delete button event listener.
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
