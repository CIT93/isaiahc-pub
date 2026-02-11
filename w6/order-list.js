const orderTableBody = document.getElementById('order-table-body');
const clearBtn = document.getElementById('clear-btn');

let isConfirmingClear = false;
let confirmTimeoutId = null;

const resetClearButton = function () {
    if (confirmTimeoutId) {
        clearTimeout(confirmTimeoutId);
    }
    isConfirmingClear = false;
    clearBtn.textContent = 'Clear Data';
};

export const setupClearButton = function (orders, onConfirmClear) {

    clearBtn.style.display = 'none';

    clearBtn.addEventListener('click', function () {

        if (!isConfirmingClear) {
            isConfirmingClear = true;
            clearBtn.textContent = 'Are you sure? Click again';

            confirmTimeoutId = setTimeout(function () {
                resetClearButton();
            }, 3000);

        } else {
            resetClearButton();
            onConfirmClear();
        }
    });
};

export const renderOrders = function (orders) {

    orderTableBody.innerHTML = '';

    if (orders.length === 0) {
        clearBtn.style.display = 'none';
        return;
    } else {
        clearBtn.style.display = 'block';
    }

    for (const order of orders) {

        const row = document.createElement('tr');
        const formattedDate = new Date(order.timestamp).toLocaleDateString();

        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${order.qty}</td>
            <td>${order.size}</td>
            <td>$${order.totalPrice}</td>
        `;

        orderTableBody.appendChild(row);
    }
};
