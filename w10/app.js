import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as orderStorage from './storage.js';
import * as orderList from './order-list.js';

const orders = [];

const orderForm = document.getElementById('order-form');

const handleDelete = function (id) {
    const indexToDelete = orders.findIndex(function (order) {
        return order.id === id;
    });

    if (indexToDelete !== -1) {
        orders.splice(indexToDelete, 1);
        orderStorage.saveOrders(orders);
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
    }
};

const handleEdit = function (id) {
    console.log("App.js: Requesting edit for order", id);
};

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

    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    orderHandler.clearOrderForm();
};

const handleClearData = function () {
    orders.length = 0;
    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
};

const init = function () {
    const loadedOrders = orderStorage.loadOrders();

    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
    }

    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    orderForm.addEventListener('submit', handleFormSubmit);

    orderList.setupClearButton(orders, handleClearData);
};

document.addEventListener('DOMContentLoaded', init);