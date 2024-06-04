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
        case "*":
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

// declare three variables for three parts of math equation
let leftNum = "invalid";
let operator;
let rightNum = "invalid";

let display = document.querySelector("#display");
let displayNum = "invalid";

// store all digits in a variable
let digits = document.getElementsByClassName("digit");

// use for loop to add click event to each digit, adding digit to display when clicked
for (let i = 0; i < digits.length; ++i) {
    digits[i].addEventListener("click", () => {
        if (display.textContent.length < 8) {
            display.textContent += digits[i].textContent;
            display.textContent = removeLeadingZeroes(display.textContent);

            // store new display number in variable displayNum
            displayNum = Number(display.textContent); 
        }
        // store new number in displayNum even if it doesn't fit on the display
        else {
            displayNum = Number(String(displayNum) + digits[i].textContent); 
        }
    });
}

// add event listener to element that holds zero to add it to display when clicked
let zero = document.querySelector("#zero");

zero.addEventListener("click", () => {
    if (display.textContent.length < 8) {
        display.textContent += zero.textContent;

        // store new display number in variable displayNum
        displayNum = Number(display.textContent); 
    }
    // store new number in displayNum even if it doesn't fit on the display
    else {
        displayNum = Number(String(displayNum) + zero.textContent); 
    }
});

// add event listener to clear button which clears display and resets displayNum
let clear = document.querySelector("#clear");

clear.addEventListener("click", () => {
    display.textContent = "0";
    displayNum = 0;
})

// add event listeners to operators to perform operations on click
let operators = document.getElementsByClassName("operator");

for (let i = 0; i < operators.length; ++i) {
    operators[i].addEventListener("click", () => {
        if (leftNum == "invalid") {
            leftNum = displayNum;
        }
    })
}