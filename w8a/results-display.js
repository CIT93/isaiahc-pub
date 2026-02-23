




const resultsContainer = document.getElementById('results');

// Now, we use resultsContainer.querySelector() to get elements inside the resultsContainer.

const totalFootprintDisplay = resultsContainer.querySelector('#totalFootprint');
const householdFootprintDisplay = resultsContainer.querySelector('#householdFootprint');
const homeSizeFootprintDisplay = resultsContainer.querySelector('#homeSizeFootprint');
const foodDietFootprintDisplay = resultsContainer.querySelector('#foodDietFootprint');
const foodPackagingFootprintDisplay = resultsContainer.querySelector('#foodPackagingFootprint');

export const displayResults = function (results) {
    // console.log(`inside the displayResults function`);
    totalFootprintDisplay.textContent = `${results.totalFootprint.toFixed(0)} Points`;
    householdFootprintDisplay.textContent = `Household Size: ${results.householdFootprint.toFixed(0)} Points`;
    homeSizeFootprintDisplay.textContent = `House Size: ${results.homeSizeFootprint.toFixed(0)} Points`;
    foodDietFootprintDisplay.textContent = `Food Diet: ${results.dietTypeFootprint.toFixed(0)} Points`;
    foodPackagingFootprintDisplay.textContent = `Food Packaging: ${results.foodPackagingFootprint.toFixed(0)} Points`;

    resultsContainer.style.display = 'block';
};

export const hideResults = function () {
    resultsContainer.style.display = 'none';
}
