console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js';

const orders = [];

const orderForm = document.getElementById('order-form');

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

    resultsDisplay.displayResults(newOrder);

    orderHandler.clearOrderForm();
};

const init = function () {
    console.log('App initialized: DOM is ready! Try submitting the form.');
    orderForm.addEventListener('submit', handleFormSubmit);
};

document.addEventListener('DOMContentLoaded', init);
