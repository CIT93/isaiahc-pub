const orderSummary = document.getElementById('order-summary');

const displayTotal = document.getElementById('display-total');
const displayQty = document.getElementById('display-qty');
const displaySize = document.getElementById('display-size');
const displayGift = document.getElementById('display-gift');

export const displayOrder = function (order) {
    orderSummary.style.display = 'block';

    displayTotal.textContent = order.totalPrice;
    displayQty.textContent = order.qty;
    displaySize.textContent = order.size;
    displayGift.textContent = order.giftWrap ? 'Yes' : 'No';
};
