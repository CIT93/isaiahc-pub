const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

export const saveOrders = function (orders) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
        console.error(error);
    }
};

export const loadOrders = function () {
    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataString) {
            return JSON.parse(dataString);
        }
        return [];
    } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return [];
    }
};
