"use strict";

let apiKey = "api_key=9de0c429-ab17-4d69-991b-2a5d2318c706";
let mainUrl = "https://edu.std-900.ist.mospolytech.ru";

let loadProductsPromise;

let orderArray = [];

async function loadOrder() {
    let specificUrl = "/exam-2024-1/api/goods/";

    let idOrderArray = JSON.parse(window.localStorage.getItem("goods"));

    for (let id of idOrderArray) {
        let fullUrl = `${mainUrl}${specificUrl}${id}?${apiKey}`;  
        await fetch(fullUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to get product info!");
                }
                return response.json();
            })
            .then(data => {
                orderArray.push(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', 
                    error);
            });
    }

    let displayScript = document.createElement("script");
    displayScript.src = "orderPage/orderPageDisplayOrder.js";
    document.getElementsByTagName("main").
        item(0).append(displayScript);
}   

loadOrder();