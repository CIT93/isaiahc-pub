// console.log('Hello from app.js! Your JavaScript is connected and running!');

// Imports the form handler module that manages form-related logic
// --- 4.1 - Part 1: Create calculator.js module and code household points function ---
import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';

// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
const carbonFootprintEntries = [] //Array Literal


// References the main carbon footprint form element
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// References the household members number input inside the form
//const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// References the button used to clear the form
const clearFormButton = document.getElementById('clearFormButton');

const clearAllDataButton = document.getElementById('clearAllDataButton');

let isConfirmingClearAll = false;
let clearAllTimeoutId = null;

const resetClearAllButton = function () {
    if (clearAllTimeoutId) {
        clearTimeout(clearAllTimeoutId);
    }
    isConfirmingClearAll = false;
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    clearAllDataButton.classList.add('danger-button');
}

const resetAllUIStates = function () {
    resetClearAllButton();
}

// Handles form submission and processes user input
const handleFormSubmit = function (event) {
    event.preventDefault();
    const formData = formHandler.getFormInputs();
    // console.log(formData);
    const calculatedResults = calculator.calculateFootPrint(formData);

    // Combine the input data with the calculated results into a single entry object.
    const newEntry = {
        ...formData,
        ...calculatedResults,
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString()
    };
    // Add the new entry to our 'carbonFootprintEntries' array.
    carbonFootprintEntries.push(newEntry);
    console.log(carbonFootprintEntries);

    storage.saveEntries(carbonFootprintEntries);

    // console.log(calculatedResults);
    resultsDisplay.displayResults(calculatedResults);
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    resetAllUIStates();
};

const performClearAllData = function () {
    carbonFootprintEntries.length = 0;
    console.log("In-memory array cleared:", carbonFootprintEntries);
    storage.clearAllEntries();
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    formHandler.clearForm();
    resultsDisplay.hideResults();
    resetAllUIStates();
};
// Handles clearing and resetting the form values
const handleClearForm = function () {
    formHandler.clearForm();
    resultsDisplay.hideResults();
    resetAllUIStates();
};

const handleDeleteEntry = function (id) {
    console.log(`Delete button clicked for ID: ${id} functionality added in week 7`);
    const indexToDelete = carbonFootprintEntries.findIndex(function (entry) {
        return entry.id === id;

    });
    if (indexToDelete !== -1) {
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log(`Entry removed from memory`);
        storage.saveEntries(carbonFootprintEntries);
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
        if (carbonFootprintEntries.length === 0) {
            resultsDisplay.hideResults();
            formHandler.clearForm();
        }
        resetAllUIStates();
    } else {
        console.log(`Did not find index`);
        resetAllUIStates();
    }
    console.log(indexToDelete);
    resetAllUIStates();
}

const handleEditEntry = function (id) {
    console.log(`Edit button clicked for ID: ${id} functionality added in week 7`);

    resetAllUIStates();
}

// Initializes the app and sets up all event listeners once the DOM is ready
const init = function () {
    // console.log('App initialized: DOM is ready! Try submitting the form or clearing it.');
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resultsDisplay.hideResults();
    const loadedEntries = storage.loadEntries();
    if (loadedEntries.length > 0) {
        carbonFootprintEntries.push(...loadedEntries);
        console.log('Entries loaded from LocalStorage')
    } else {
        console.log('No entires found in localStorage Starting fresh')
    }

    //! test handleDeleteEntry function
    // handleDeleteEntry("1771281165239");



    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    clearAllDataButton.addEventListener('click', function (event) {
        event.stopPropagation();
        if (isConfirmingClearAll) {
            performClearAllData();
        } else {
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Click again';
            clearAllDataButton.classList.add('confirm-state');
            clearAllTimeoutId = setTimeout(function () {
                resetClearAllButton();
                console.log('Clear All confirmation timed out');
            }, 3000);
        }
    });
    document.addEventListener('click', function (event) {
        console.log(event.target);
        if (isConfirmingClearAll && event.target !== clearAllDataButton) {
            resetClearAllButton();
        }
    });
};

// Runs initialization after the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', init);