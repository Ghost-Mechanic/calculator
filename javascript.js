/***********************************************************
This is the script for a calculator on a webpage 
************************************************************/


// four functions for four basic operators
function add(leftNum, rightNum) {
    return leftNum + rightNum;
}

function subtract(leftNum, rightNum) {
    return leftNum - rightNum;
}

function multiply(leftNum, rightNum) {
    return leftNum * rightNum;
}

function divide(leftNum, rightNum) {
    return leftNum / rightNum;
}

// this function takes in two numbers and an operator and performs the operation accordingly
function calculate(leftNum, operator, rightNum) {
    switch (operator) {
        case "+": 
            return add(leftNum, rightNum);
        case "-":
            return subtract(leftNum, rightNum);
        case "\u00D7":
            return multiply(leftNum, rightNum);
        case "/":
            return divide(leftNum, rightNum);
        default:
            return "Invalid operation";
    }
}

// this function removes leading zeroes in a string that is a number, cleans up display
function removeLeadingZeroes(num) {
    let newNum = num;

    while (newNum.length != 1 && newNum[0] == "0") {
        newNum = num.slice(1);
    }

    return newNum;
}

// this function resets the calculator, called for the clear button or when
// the user tries to divide by zero
function resetCalculator() {
    displayNum = 0;
    operator = "invalid";
    leftNum = "invalid";
    rightNum = "invalid";
    haveLeft = false;
    haveRight = false;
}

// this function resets all variables except for leftNum and the display element, 
// to be called after a calculation to keep the calculation's value in leftNum
function resetAfterCalculation() {
    leftNum = displayNum;
    rightNum = "invalid";
    display.textContent = String(displayNum).substring(0, 8);
    displayNum = 0;
    haveRight = false;
}

// declare three variables for three parts of math equation
// initialize leftNum and rightNum to invalid to keep track of which numbers have been obtained
let leftNum = "invalid";
let operator = "invalid";
let rightNum = "invalid";

// bool variables to tell whether or not the calculator has a left and right operand
let haveLeft = false;
let haveRight = false;

// store display element in display variable and the number it's displaying in displayNum
let display = document.querySelector("#display");
let displayNum = 0;
display.textContent = String(displayNum);

// store all digits in a variable
let digits = document.getElementsByClassName("digit");

// use for loop to add click event to each digit, adding digit to display when clicked
for (let i = 0; i < digits.length; ++i) {
    digits[i].addEventListener("click", () => {
        if (display.textContent.length < 8) {
            // store new display number in variable displayNum
            displayNum = Number(String(displayNum) + digits[i].textContent);
            displayNum = Number(removeLeadingZeroes(String(displayNum)));

            // if the calculator has the left operand, set rightNum to displayNum
            if (haveLeft) {
                rightNum = displayNum;
                haveRight = true;
            }

            // set text content of display element to displayNum
            display.textContent = String(displayNum);
        }
        // store new number in displayNum even if it doesn't fit on the display
        else {
            displayNum = Number(String(displayNum) + digits[i].textContent);
            if (haveLeft) {
                rightNum = displayNum;
                haveRight = true;
            } 
        }
    });
}

// add event listener to element that holds zero to add it to display when clicked
let zero = document.querySelector("#zero");

zero.addEventListener("click", () => {
    if (display.textContent.length < 8) {
        displayNum = Number(String(displayNum) + zero.textContent);

        if (haveLeft) {
            rightNum = displayNum;
            haveRight = true;
        }

        // store new display number in variable displayNum
        display.textContent = Number(displayNum); 
    }
    // store new number in displayNum even if it doesn't fit on the display
    else {
        displayNum = Number(String(displayNum) + zero.textContent);
        if (haveLeft) {
            rightNum = displayNum;
            haveRight = true;
        } 
    }
});

// add event listener to clear button which clears display and resets calculator
let clear = document.querySelector("#clear");

clear.addEventListener("click", () => {
    display.textContent = "0";
    resetCalculator();
});

// add event listeners to operators to perform operations on click
let operators = document.getElementsByClassName("operator");

for (let i = 0; i < operators.length; ++i) {
    operators[i].addEventListener("click", () => {
        // only assign number to leftNum if it has no number in it,
        // which means "invalid" is stored in the variable
        if (leftNum == "invalid") {
            leftNum = displayNum;
            displayNum = 0;
            haveLeft = true;
        }

        // if the user tries to divide by 0, display "No" and reset calculator
        if (haveRight && rightNum == 0 && operator == "/") {
            display.textContent = "No";
            resetCalculator();
            return;
        }

        // perform percentage operation by dividing currrent number by 100, use two
        // if statements to check if current number is the left or right number
        if (operators[i].textContent == "%" && haveLeft && haveRight) {
            rightNum /= 100;
            display.textContent = String(rightNum).substring(0, 8);
            displayNum = 0;
            haveLeft = true;
        }
        else if (operators[i].textContent == "%" && !haveRight) {
            leftNum /= 100;
            display.textContent = String(leftNum).substring(0, 8);
            displayNum = 0;
            haveLeft = true;
        }

        // capture operator in variable if it is not the equals sign
        if (operators[i].textContent != "=") {
            // perform calculation if the calculator has both left and right numbers
            if (haveLeft && haveRight) {
                displayNum = calculate(leftNum, operator, rightNum);
                resetAfterCalculation();
            }
            operator = operators[i].textContent;
        }
        // perform calculation if operator selected is the equals sign
        else {
            if (haveLeft && haveRight) {
                displayNum = calculate(leftNum, operator, rightNum);
                resetAfterCalculation();
            }
        }

        console.log(leftNum);
        console.log(rightNum);
    });
}

// add event listener to sign button to swap signs of current number when clicked
let sign = document.querySelector("#sign");

sign.addEventListener("click", () => {
    displayNum *= -1;

    // change rightNum's value if the calculator already has the left number
    if (haveLeft) {
        rightNum = displayNum;
    }
    
    display.textContent = String(displayNum).substring(0, 8);
})
