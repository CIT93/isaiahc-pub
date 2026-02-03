console.log('Hello from app.js! Your JavaScript is connected and running!');
// step 1
// Imports the order handler module that manages order form logic
import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';

const orders = [];


// References the main order form element
const orderForm = document.getElementById('order-form');

// References the element used to display the order summary
const orderSummary = document.getElementById('order-summary');

// Handles the order form submission event
const handleFormSubmit = function (event) {
    event.preventDefault();

    const orderData = orderHandler.getOrderInputs();

    const calculatedPrice = priceCalculator.calculateTotal(orderData);

    const newOrder = {
        ...orderData,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);

    console.log(orders);

    orderHandler.clearOrderForm();
};


// Initializes the app and sets up all event listeners once the DOM is ready
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting the form.');
    orderForm.addEventListener('submit', handleFormSubmit);
};

// Runs initialization after the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', init);