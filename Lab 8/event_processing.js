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
        let ordPrice = searchByKeyword(
            window.localStorage.getItem(
                window.localStorage.key(i)
            ));
        total += +ordPrice.price;
    }

    sum.innerHTML = `${total} ₽`;

    checkVisibility();

    /*let tagP = document.getElementsByClassName("updatable_info");
    for (let i = 0; i < tagP.length; i++) {
        let category = tagP.item(i).dataset.category;
        let checkIfSelected = window.localStorage.getItem(category);
        if (checkIfSelected != null) {

            let order = searchByKeyword(checkIfSelected);
            tagP.item(i).innerHTML = `${order.name} ${order.price} ₽`;
            total += +order.price;
        } else {
            switch (category) {
            case "soup":
                tagP.item(i).innerHTML = `Суп не выбран`;
                break;
            case "main_course":
                tagP.item(i).innerHTML = `Главное блюдо не выбрано`;
                break;
            case "salad_starter":
                tagP.item(i).innerHTML = `Салат/стартер не выбран`;
                break;
            case "beverage":
                tagP.item(i).innerHTML = `Напиток не выбран`;
                break;
            case "dessert":
                tagP.item(i).innerHTML = `Десерт не выбран`;
                break;
            }
        }
    }

    document.querySelector(".updatable_info.total_sum").
        innerHTML = `${total} ₽`;

    checkVisibility();
    */
}

function evProcess() {

    let selected = event.target.parentNode;
    let selectedCategoryId = selected.parentNode.id;
    let selectedDish = selected.dataset.dish;

    let oldDish = window.localStorage.getItem(selectedCategoryId);

    if (oldDish !== null) {
        window.localStorage.removeItem(selectedCategoryId);
        let oldSelectedElement = document.querySelector(
            `div[data-dish="${oldDish}"]`
        );
        oldSelectedElement.style.border = "";
    }

    if (oldDish != selectedDish) {
        window.localStorage.setItem(selectedCategoryId, selectedDish);
        selected.style.border = `2px solid tomato`;    
    }

    updateOrderInfo();
}