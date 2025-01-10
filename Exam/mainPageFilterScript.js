"use strict";

let filterForm = document.querySelector(".sidebar > form");

let onlyDiscountProducts;
let priceFrom;
let priceTo;
let chosenCategories = [];

filterForm.
    addEventListener("submit", function() {
        chosenCategories = [];
        for (let obj of filterForm) {
            switch (obj.id) {
            case "only-discount-products":
                onlyDiscountProducts = obj.checked;
                break;
            case "filter-price-from":
                priceFrom = obj.value;
                if (priceFrom == "")
                    priceFrom = undefined;
                break;
            case "filter-price-to":
                priceTo = obj.value; 
                if (priceTo == "")
                    priceTo = undefined; 
                break;
            case "home & kitchen":
                if (obj.checked)
                    chosenCategories.push("home & kitchen"); 
                break;
            case "tv, audio & cameras":
                if (obj.checked)
                    chosenCategories.push("tv, audio & cameras"); 
                break;
            case "sports & fitness":
                if (obj.checked)
                    chosenCategories.push("sports & fitness"); 
                break;
            case "beauty & health":
                if (obj.checked)
                    chosenCategories.push("beauty & health"); 
                break;
            }
        }

        deleteMainContent();
        displayMainContent();
    });