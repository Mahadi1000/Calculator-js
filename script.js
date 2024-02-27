const previousOperandTextElement = document.querySelector('[data-previous-operand]')
        const currentOperandTextElement = document.querySelector('[data-current-operand]')
        const numberButtons = document.querySelectorAll('[data-number]')
        const operationButtons = document.querySelectorAll('[data-operation]')
        const equalsButton = document.querySelector('[data-equals]')
        const deleteButton = document.querySelector('[data-delete]')
        const allClearButton = document.querySelector('[data-all-clear]')

        let currentOperand = ''; 
        let previousOperand = '';
        let operation = undefined;

        // Function to update display
        function updateDisplay() {
            currentOperandTextElement.innerText = currentOperand;
            if (operation != null) {
                previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
            } else {
                previousOperandTextElement.innerText = '';
            }
        }

        // Add event listeners for number buttons
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                appendNumber(button.innerText);
                updateDisplay();
            });
        });

        // Function to append number to current operand
        function appendNumber(number) {
            if (number === '.' && currentOperand.includes('.')) return;
            currentOperand = currentOperand.toString() + number.toString();
        }

        // Add event listeners for operation buttons
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                chooseOperation(button.innerText);
                updateDisplay();
            });
        });

        // Function to choose operation
        function chooseOperation(op) {
            if (currentOperand === '') return;
            if (previousOperand !== '') {
                compute();
            }
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '';
        }

        // Function to perform computation
        function compute() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '÷':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            currentOperand = computation;
            operation = undefined;
            previousOperand = '';
        }

        // Add event listener for equals button
        equalsButton.addEventListener('click', () => {
            compute();
            updateDisplay();
        });

        // Add event listener for all clear button
        allClearButton.addEventListener('click', () => {
            clear();
            updateDisplay();
        });

        // Function to clear
        function clear() {
            currentOperand = '';
            previousOperand = '';
            operation = undefined;
        }

        // Add event listener for delete button
        deleteButton.addEventListener('click', () => {
            currentOperand = currentOperand.slice(0, -1);
            updateDisplay();
        });
                                               