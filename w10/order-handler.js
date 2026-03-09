// References the main order form element
const orderForm = document.getElementById('order-form');

// References the quantity input inside the form
const qtyInput = orderForm.querySelector('#qty');

// References all size radio inputs
const sizeRadios = orderForm.querySelectorAll('input[name="size"]');

// References the gift wrap checkbox
const giftWrapInput = orderForm.querySelector('#gift-wrap');

// Gets the selected value from a group of radio buttons
const getSelectedRadioValue = function (radioButtons) {
    for (const radio of radioButtons) {
        if (radio.checked) return radio.value;
    }
    return null;
};

// Collects all relevant input values from the order form
export const getOrderInputs = function () {
    return {
        qty: parseInt(qtyInput.value) || 1,
        size: getSelectedRadioValue(sizeRadios),
        giftWrap: giftWrapInput.checked
    };
};

// Clears and resets the order form back to default values
export const clearOrderForm = function () {
    orderForm.reset();
    qtyInput.value = 1;
};
