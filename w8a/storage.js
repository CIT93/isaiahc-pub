// This module handles all interactions with localStorage for our carbon footprint entries.
// SCREAMING_SNAKE_CASE - This naming convention is typically reserved for global constants whose value should never change throughout the lifetime of the application.

const LOCAL_STORAGE_KEY = 'carbonFootprintEntries';

//localStorage.setItem(LOCAL_STORAGE_KEY, "Isaiah");
//localStorage.setItem(LOCAL_STORAGE_KEY, "26");
//localStorage.setItem(LOCAL_STORAGE_KEY, [1, 2, 3]);
// localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([1, 2, 3]));
// const localStorageValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
// console.log(`Local Storage Value: ${typeof localStorageValue} ${localStorageValue}`);

export const saveEntries = function (entries) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries))
        console.log('Data saved to localStorage Successfully!');
    } catch (error) {
        console.error(`Error saving data to localStorage: ${error} `)
    }

};

export const generateUniqueId = function () {
    return Date.now().toString();
};

export const loadEntries = function () {
    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataString) {
            return JSON.parse(dataString);
        }
        return [];
    } catch (e) {
        console.error(`Error loading entries from localStorage`);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }


};
export const clearAllEntries = function () {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log('All entries clear from localStorage');
}





