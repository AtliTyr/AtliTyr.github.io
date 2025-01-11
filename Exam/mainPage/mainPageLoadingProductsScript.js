"use strict";

let apiKey = "api_key=9de0c429-ab17-4d69-991b-2a5d2318c706";
let mainUrl = "https://edu.std-900.ist.mospolytech.ru";

let loadProductsPromise;

let productArray = [];
let filterCategory = [];

function parseProductsCategory() {
    for (let product of productArray) {
        if (filterCategory.includes(product["main_category"])) {
            continue;
        }
        filterCategory.push(product["main_category"]);
    }
}  

function loadProducts() {
    let specificUrl = "/exam-2024-1/api/goods";
    let fullUrl = `${mainUrl}${specificUrl}?${apiKey}`;
    loadProductsPromise = new Promise(async () => {
        await fetch(fullUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to get products list!");
                }
                return response.json();
            })
            .then(data => { 
                productArray = data;

                parseProductsCategory();

                let displayScript = document.createElement("script");
                displayScript.src = "mainPage/mainPageDisplayProductsScript.js";
                document.getElementsByTagName("main").
                    item(0).append(displayScript);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', 
                    error);
            });
    });
}   

loadProducts();