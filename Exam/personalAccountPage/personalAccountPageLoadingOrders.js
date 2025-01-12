"use strict";

let apiKey = "api_key=9de0c429-ab17-4d69-991b-2a5d2318c706";
let mainUrl = "https://edu.std-900.ist.mospolytech.ru";

let loadProductsPromise;

let ordersArray = [];

async function loadOrders() {
    let specificUrl = "/exam-2024-1/api/orders";

    let fullUrl = `${mainUrl}${specificUrl}?${apiKey}`;  
    await fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to get order info!");
            }
            return response.json();
        })
        .then(data => {
            ordersArray = data;
        })
        .catch(error => {
            console.error(
                `There was a problem with the fetch operation:`, error);
        });

    let displayScript = document.createElement("script");
    displayScript.src = 
        "personalAccountPage/personalAccountPageDisplayOrders.js";
    document.getElementsByTagName("main").
        item(0).append(displayScript);
}   

loadOrders();