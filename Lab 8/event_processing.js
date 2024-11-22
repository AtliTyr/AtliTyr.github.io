"use strict";

/*function checkVisibility() {
    if (window.localStorage.length == 0) {
        document.getElementsByClassName('order_update').
            item(0).
            style.
            display = "none";
        document.getElementsByClassName('nothing-chosen').
            item(0).
            style.
            display = "block";
    } else {
        document.getElementsByClassName('order_update').
            item(0).
            style.
            display = "block";
        document.getElementsByClassName('nothing-chosen').
            item(0).
            style.
            display = "none";
    }
}*/

function checkVisibility() {
    if (window.localStorage.length == 0) {
        document.getElementsByClassName('placingOrder').
            item(0).
            style.
            display = "none";
    } else { 
        document.getElementsByClassName('placingOrder').
            item(0).
            style.
            display = "flex";
    }
}

function updateOrderInfo() {
    let total = 0;

    let sum = document.querySelector(".placingOrder .font-reg-sets");

    for (let i = 0; i < window.localStorage.length; i++) {
        let ordPrice = searchByID(
            window.localStorage.getItem(
                window.localStorage.key(i)
            ));
        total += +ordPrice.price;
    }

    sum.innerHTML = `${total} ₽`;

    checkVisibility();
}

function evProcess() {

    let selected = event.target.parentNode;
    let selectedCategoryId = searchByKeyword(selected.dataset.dish).category;
    let selectedDish = selected.dataset.dish;

    let orderID = window.localStorage.getItem(selectedCategoryId);

    //let oldDish = window.localStorage.getItem(selectedCategoryId);

    if (orderID !== null) {
        window.localStorage.removeItem(selectedCategoryId);
        let oldSelectedElement = document.querySelector(
            `div[data-dish="${searchByID(orderID).keyword}"]`
        );
        oldSelectedElement.style.border = "";
    }

    if (orderID != searchByKeyword(selectedDish).id) {
        window.localStorage.setItem(
            selectedCategoryId, 
            searchByKeyword(selectedDish).id);
        selected.style.border = `2px solid tomato`;    
    }

    updateOrderInfo();
}