"use strict";

let filterForm = document.querySelector(".sidebar > form");

let onlyDiscountProducts;
let priceFrom;
let priceTo;

filterForm.
    addEventListener("submit", function() {
        for (let obj of filterForm) {
            //console.dir(obj.id);
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
            }
        }

        deleteMainContent();
        displayMainContent();
    });