console.log('Hello from app.js! Your JavaScript is connected and running!');

const totalDisplayElement = document.getElementById("total-display");
const updateButton = document.getElementById("add-item-btn");

let totalCost = 0;
const itemPrice = 15;

const handleButtonClick = function () {
    totalCost += itemPrice;
    let message = `Current Total: $${totalCost}`;
    if (totalCost >= 60) {
        message += ' (Over Budget!)';
        totalDisplayElement.style.color = 'red';
    } else {
        totalDisplayElement.style.color = 'black';
    }
    totalDisplayElement.textContent = message;
    console.log(`Item Added! Total Cost: $${totalCost}`);
}
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed, App is ready for interaction');
    updateButton.addEventListener('click', handleButtonClick);
    totalDisplayElement.textContent = `Add item to cart!`
})