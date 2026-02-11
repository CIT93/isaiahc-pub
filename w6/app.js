import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as orderStorage from './storage.js';
import * as orderList from './order-list.js';

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

    orderStorage.saveOrders(orders);

    // Render updated table
    orderList.renderOrders(orders);

    orderHandler.clearOrderForm();
};

const init = function () {

    const loadedOrders = orderStorage.loadOrders();

    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);

        // Render full list on startup
        orderList.renderOrders(orders);
    }

    orderForm.addEventListener('submit', handleFormSubmit);
};

document.addEventListener('DOMContentLoaded', init);
