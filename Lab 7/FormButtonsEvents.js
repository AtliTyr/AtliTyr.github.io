"use strict";

let selectedCategories = {};

function fillHiddenInputs() {
    selectedCategories = {};
    let elems = document.querySelectorAll(".order_update > div > input");

    elems.forEach(function(currentValue) {
        switch (currentValue.id) {
        case 'soups':
            if (selectedSoup) {
                let obj = searchByKeyword(selectedSoup.dataset.dish);
                currentValue.value = `${obj.keyword}`;

                selectedCategories["soup"] = true;
            } else {
                currentValue.value = ``;

                selectedCategories["soup"] = false;
            }
            break;
        case 'main-courses':
            if (selectedMainCourse) {
                let obj = searchByKeyword(selectedMainCourse.dataset.dish);
                currentValue.value = `${obj.keyword}`;

                selectedCategories["main"] = true;
            } else {
                currentValue.value = ``;

                selectedCategories["main"] = false;
            }
            break;
        case 'salads_starters':
            if (selectedSaladsStarters) {
                let obj = searchByKeyword(selectedSaladsStarters.dataset.dish);
                currentValue.value = `${obj.keyword}`;

                selectedCategories["salad"] = true;
            } else {
                currentValue.value = ``;

                selectedCategories["salad"] = false;
            }
            break;
        case 'beverages':
            if (selectedBeverages) {
                let obj = searchByKeyword(selectedBeverages.dataset.dish);
                currentValue.value = `${obj.keyword}`;

                selectedCategories["drink"] = true;
            } else {
                currentValue.value = ``;

                selectedCategories["drink"] = false;
            }
            break;
        case 'desserts':
            if (selectedDessert) {
                let obj = searchByKeyword(selectedDessert.dataset.dish);
                currentValue.value = `${obj.keyword}`;

                selectedCategories["desert"] = true;
            } else {
                currentValue.value = ``;

                selectedCategories["desert"] = false;
            }
            break;
        case 'total':
            if (total)
                currentValue.value = total;
            else
                currentValue.value = ``;
            break;
        }
    });
}

let elem = document.getElementsByClassName("submit_button").item(0);;

elem.addEventListener("click", fillHiddenInputs);