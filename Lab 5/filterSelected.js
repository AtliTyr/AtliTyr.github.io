"use strict";

let soupFilter;
let mainCourseFilter;
let beverageFilter;
let saladStarterFilter;
let dessertFilter;

let selectedFilter;

function hideOtherOrders(event, className) {
    
    if (event.target.tagName !== 'BUTTON')
        return;

    switch (className) {
    case 'filt_main-courses':
        className = 'main_course';
        selectedFilter = mainCourseFilter;
        break;
    case 'filt_soups':
        className = 'soup';
        selectedFilter = soupFilter;
        break;
    case 'filt_salads_starters':
        className = 'salad_starter';
        selectedFilter = saladStarterFilter;
        break;
    case 'filt_beverages':
        className = 'beverage';
        selectedFilter = beverageFilter;
        break;
    case 'filt_desserts':
        className = 'dessert';
        selectedFilter = dessertFilter;
        break;
    }

    let orderL = document.getElementById(className).children;

    if (selectedFilter === undefined) {
        selectedFilter = event.target;
        selectedFilter.classList.add('filter_active');

        for (let i = 0; i < orderL.length; i++) {
            let obj = searchByKeyword(orderL.item(i).dataset.dish);
            if (obj.kind !== event.target.dataset.kind) {
                orderL.item(i).style.display = 'none';
            } else {
                orderL.item(i).style.display = 'flex';
            }    
        }
    } else {
        if (selectedFilter.dataset.kind === event.target.dataset.kind) {
            selectedFilter.classList.remove('filter_active');
            selectedFilter = undefined;

            for (let i = 0; i < orderL.length; i++) 
                orderL.item(i).style.display = 'flex'; 
        } else {

            selectedFilter.classList.remove('filter_active');

            selectedFilter = event.target;
            selectedFilter.classList.add('filter_active');

            for (let i = 0; i < orderL.length; i++) {
                let obj = searchByKeyword(orderL.item(i).dataset.dish);
                if (obj.kind !== event.target.dataset.kind) {
                    orderL.item(i).style.display = 'none';
                } else {
                    orderL.item(i).style.display = 'flex';
                }    
            }
        }
    }

    switch (className) {
    case 'main_course':
        mainCourseFilter = selectedFilter;
        break;
    case 'soup':
        soupFilter = selectedFilter;
        break;
    case 'salad_starter':
        saladStarterFilter = selectedFilter;
        break;
    case 'beverage':
        beverageFilter = selectedFilter;
        break;
    case 'dessert':
        dessertFilter = selectedFilter;
        break;
    }
}

let filt_list = document.querySelectorAll('.filter').
    forEach(function(currentValue) {
        let className = currentValue.classList.item(1);
        document.
            getElementsByClassName(className).
            item(0).    
            addEventListener("click", function(event) {
                hideOtherOrders(event, className); 
            });
    });