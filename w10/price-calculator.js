// Handles all pricing math

const shirtPrice = 15;
const giftWrapPrice = 2;

export const calculateTotal = function (orderData) {
    const qty = parseInt(orderData.qty) || 0;

    let total = qty * shirtPrice;

    // Requirement keyword: if
    if (orderData.giftWrap) total = total + giftWrapPrice;

    return { totalPrice: total };
};
