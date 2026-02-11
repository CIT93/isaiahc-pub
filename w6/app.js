import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js';
import * as orderStorage from './storage.js';

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

    resultsDisplay.displayOrder(newOrder);

    orderHandler.clearOrderForm();
};

const init = function () {

    const loadedOrders = orderStorage.loadOrders();

    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        console.log('Orders loaded');
    }

    console.log('App initialized: DOM is ready! Try submitting the form.');
    orderForm.addEventListener('submit', handleFormSubmit);
};

document.addEventListener('DOMContentLoaded', init);
