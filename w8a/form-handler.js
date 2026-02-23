//? --- Part 3: Implement the form-handler.js module ---

// This module handles getting input values from the form and clearing it.
// Simplified: Only focuses on Household Size input for now.

// References the main carbon footprint form element
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// References the household members number input inside the form
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Home Size reference
const homeSquareFootageInput = carbonFootprintForm.querySelector('#homeSquareFootage');

// Apartment Checkbox reference
const isApartmentInput = carbonFootprintForm.querySelector('#isApartment');

// Food Choices (radio buttons - we need to query for all with the same 'name')
const dietTypeRadios = carbonFootprintForm.querySelectorAll('input[name="dietType"]');
const foodPackagingRadios = carbonFootprintForm.querySelectorAll('input[name="foodPackaging"]');

const getSelecedRadioValue = function (radioButtons) {
    // let selectDietType = null;
    for (const radio of radioButtons) {

        if (radio.checked) {
            //console.log(`${radio.value} has the attribute of ${radio.checked}`);
            return radio.value;
        }

    }
};

//--- Part 1: Code clearForm and getFormInput
// Collects all relevant input values from the form for Household Size, Home Size, and Food Choices.

export const getFormInputs = function () {
    // console.log('Get For Input');
    // Declare a locally scoped valued for square footage
    // const homeSquareFootage = parseInt(householdMembersInput.value) || 0;
    // Declare a locally scoped valued for apartment
    // const isApartment = isApartmentInput.checked;
    // return houseHoldMember to app.js handleFormSubmit function

    // Refactor return to be an object literal
    // const objLiteral = {
    //     // properities: values,
    //     householdMembers: parseInt(householdMembersInput.value) || 1,
    //     homeSquareFootage: parseInt(householdMembersInput.value) || 0,
    //     isApartment: isApartmentInput.checked,
    //     dietType: dietTypeRadios[1].value
    // }
    // const selectDietType = getSelecedRadioValue(dietTypeRadios);

    return {
        householdMembers: parseInt(householdMembersInput.value) || 1,
        // BROKEN ON PURPOSE (Challenge 2 - Type Error)
        homeSquareFootage: parseInt(homeSquareFootageInput.value) || 0,
        isApartment: isApartmentInput.checked,
        dietType: getSelecedRadioValue(dietTypeRadios),
        foodPackaging: getSelecedRadioValue(foodPackagingRadios)
    };
};

export const clearForm = function () {
    carbonFootprintForm.reset();
    householdMembersInput.value = 1;
    homeSquareFootageInput.value = 0;
    dietTypeRadios[0].checked;
    foodPackagingRadios[0].checked;
    console.log('Clear Form');
};