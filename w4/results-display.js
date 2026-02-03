

const orderSummary = document.getElementById('order-summary');

const displayTotal = document.getElementById('display-total');
const displayQty = document.getElementById('display-qty');
const displaySize = document.getElementById('display-size');
const displayGift = document.getElementById('display-gift');

export const displayResults = function (newOrder) {
    orderSummary.style.display = 'block';

    displayTotal.textContent = newOrder.totalPrice;
    displayQty.textContent = newOrder.qty;
    displaySize.textContent = newOrder.size;
    displayGift.textContent = newOrder.giftWrap ? 'Yes' : 'No';
};
