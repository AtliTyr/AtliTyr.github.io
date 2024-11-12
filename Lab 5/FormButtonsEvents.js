"use strict";

function fillHiddenInputs() {
    let elems = document.querySelectorAll(".order_update > div > input");

    elems.forEach(function(currentValue) {
        switch (currentValue.id) {
        case 'soups':
            if (selectedSoup) {
                let obj = searchByKeyword(selectedSoup.dataset.dish);
                currentValue.value = `${obj.keyword}`;
            } else {
                currentValue.value = ``;
            }
            break;
        case 'main-courses':
            if (selectedMainCourse) {
                let obj = searchByKeyword(selectedMain_course.dataset.dish);
                currentValue.value = `${obj.keyword}`;
            } else {
                currentValue.value = ``;
            }
            break;
        case 'salads_starters':
            if (selectedSaladsStarters) {
                let obj = searchByKeyword(selectedSaladsStarters.dataset.dish);
                currentValue.value = `${obj.keyword}`;
            } else {
                currentValue.value = ``;
            }
            break;
        case 'beverages':
            if (selectedBeverages) {
                let obj = searchByKeyword(selectedBeverages.dataset.dish);
                currentValue.value = `${obj.keyword}`;
            } else {
                currentValue.value = ``;
            }
            break;
        case 'desserts':
            if (selectedDessert) {
                let obj = searchByKeyword(selectedDessert.dataset.dish);
                currentValue.value = `${obj.keyword}`;
            } else {
                currentValue.value = ``;
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