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
        id: Date.now().toString(),
        ...orderData,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);

    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders);
    orderHandler.clearOrderForm();
};

const handleClearData = function () {
    orders.length = 0;
    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders);
};

const init = function () {

    const loadedOrders = orderStorage.loadOrders();

    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        orderList.renderOrders(orders);
    }

    orderForm.addEventListener('submit', handleFormSubmit);

    orderList.setupClearButton(orders, handleClearData);
};

document.addEventListener('DOMContentLoaded', init);