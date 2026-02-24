const orderTableBody = document.getElementById('order-table-body');
const clearBtn = document.getElementById('clear-btn');

const tableBody = document.getElementById('order-table-body');

tableBody.addEventListener('click', function (event) {
    const target = event.target;
    const id = target.dataset.id;

    if (!id) return;

    console.log("Clicked button with ID:", id);
});

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
            <td>
                <button class="edit-btn" data-id="${order.id}">Edit</button>
                <button class="delete-btn" data-id="${order.id}">Delete</button>
            </td>
        `;

        orderTableBody.appendChild(row);
    }
};