"use strict";

let apiKey = "api_key=9de0c429-ab17-4d69-991b-2a5d2318c706";
let mainUrl = "http://api.std-900.ist.mospolytech.ru";

let loadProductsPromise;

let productArray = [];

function loadProducts() {
    let specificUrl = "/exam-2024-1/api/goods";
    let fullUrl = `${mainUrl}${specificUrl}?${apiKey}`;
    loadProductsPromise = new Promise(async (resolve, reject) => {
        await fetch(fullUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to get products list!");
                }
                return response.json();
            })
            .then(data => { 
                productArray = data;
                let displayScript = document.createElement("script");
                displayScript.src = "mainPageDisplayProductsScript.js";
                document.getElementsByClassName("main-content").
                    item(0).append(displayScript);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', 
                    error);
            });
    });
}   

loadProducts();