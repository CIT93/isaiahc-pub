console.log('Hello from app.js! Your JavaScript is connected and running!');
// step 1
// Imports the order handler module that manages order form logic
import * as orderHandler from './order-handler.js';

// References the main order form element
const orderForm = document.getElementById('order-form');

// References the element used to display the order summary
const orderSummary = document.getElementById('order-summary');

// Handles the order form submission event
const handleFormSubmit = function (event) {
    event.preventDefault();

    const orderData = orderHandler.getOrderInputs();

    // Step 3 requirement: update the page
    orderSummary.textContent = `Ordered ${orderData.qty} ${orderData.size} T-Shirt(s)${orderData.giftWrap ? ' with Gift Wrap' : ''}.`;

    console.log(`Order Input - Object Literal:`);
    console.log(`key of qty value of ${orderData.qty}`);
    console.log(`key of size value of ${orderData.size}`);
    console.log(`key of giftWrap value of ${orderData.giftWrap}`);
    console.log(orderData);
};

// Initializes the app and sets up all event listeners once the DOM is ready
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting the form.');
    orderForm.addEventListener('submit', handleFormSubmit);
};

// Runs initialization after the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', init);