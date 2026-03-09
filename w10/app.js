import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as orderStorage from './storage.js';
import * as orderList from './order-list.js';

const orders = [];

const orderForm = document.getElementById('order-form');
const qtyInput = document.getElementById('qty');
const giftWrapInput = document.getElementById('gift-wrap');
const orderIdInput = document.getElementById('order-id');

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
    const orderToEdit = orders.find(function (order) {
        return order.id === id;
    });

    if (orderToEdit) {
        qtyInput.value = orderToEdit.qty;
        document.querySelector('input[name="size"][value="' + orderToEdit.size + '"]').checked = true;
        giftWrapInput.checked = orderToEdit.giftWrap;
        orderIdInput.value = orderToEdit.id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const handleFormSubmit = function (event) {
    event.preventDefault();

    const orderData = orderHandler.getOrderInputs();
    const calculatedPrice = priceCalculator.calculateTotal(orderData);
    const existingOrderId = orderIdInput.value;

    if (existingOrderId) {
        const index = orders.findIndex(function (order) {
            return order.id === existingOrderId;
        });

        if (index !== -1) {
            orders[index] = {
                ...orders[index],
                ...orderData,
                ...calculatedPrice
            };
        } else {
            const newOrder = {
                id: Date.now().toString(),
                ...orderData,
                ...calculatedPrice,
                timestamp: new Date().toISOString()
            };

            orders.push(newOrder);
        }
    } else {
        const newOrder = {
            id: Date.now().toString(),
            ...orderData,
            ...calculatedPrice,
            timestamp: new Date().toISOString()
        };

        orders.push(newOrder);
    }

    orderStorage.saveOrders(orders);

    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    orderHandler.clearOrderForm();
    orderIdInput.value = '';
};

const handleClearData = function () {
    orders.length = 0;
    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
    orderHandler.clearOrderForm();
    orderIdInput.value = '';
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