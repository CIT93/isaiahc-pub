const orderTableBody = document.getElementById('order-table-body');

export const renderOrders = function (orders) {

    // Clear existing rows
    orderTableBody.innerHTML = '';

    // Loop through orders
    for (const order of orders) {

        // Create row
        const row = document.createElement('tr');

        // Format date (optional)
        const formattedDate = new Date(order.timestamp).toLocaleDateString();

        // Populate row
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${order.qty}</td>
            <td>${order.size}</td>
            <td>$${order.totalPrice}</td>
        `;

        // Append row
        orderTableBody.appendChild(row);
    }
};
