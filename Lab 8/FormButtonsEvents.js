"use strict";

let selectedCategories = {};

let msg;

function emptySelectedCategories() {
    selectedCategories["soup"] = false;
    selectedCategories["main"] = false;
    selectedCategories["salad"] = false;
    selectedCategories["drink"] = false;
    selectedCategories["dessert"] = false;
}

function fillSelectedCategories() {
    emptySelectedCategories();

    for (let i = 0; i < window.localStorage.length; i++) {
        let cat = window.localStorage.key(i);
        switch (cat) {
        case "soup":
            selectedCategories["soup"] = true;
            break;
        case "main-course":
            selectedCategories["main"] = true;
            break;
        case "salad":
            selectedCategories["salad"] = true;
            break;
        case "drink":
            selectedCategories["drink"] = true;
            break;
        case "dessert":
            selectedCategories["dessert"] = true;
            break;
        }
        
    }
}


/*function verifyOrder () {

    let tempCheck = false;
    Object.keys(selectedCategories).forEach(function(currentValue) {
        if (selectedCategories[currentValue]) {
            tempCheck = true;
            return;
        }
    });
    if (tempCheck == false) {
        msg = "Ничего не выбрано. Выберите блюда для заказа";
        return false;
    }

    if (selectedCategories["soup"] &&
        !(selectedCategories["main"] ||
        selectedCategories["salad"])) {
        msg = "Выберите главное блюдо/салат/стартер";
        return false;
    }
    if (selectedCategories["salad"] &&
        !(selectedCategories["soup"] ||
        selectedCategories["main"])) {
        msg = "Выберите суп или главное блюдо";
        return false;
    } 
    if ((selectedCategories["drink"] || selectedCategories["dessert"]) &&
        !(selectedCategories["main"] || 
            selectedCategories["soup"] || 
            selectedCategories["salad"])) {
        msg = "Выберите главное блюдо";
        return false;
    }

    if (!selectedCategories["drink"]) {
        msg = "Выберите напиток";
        return false;
    }
          

    return true;
} */

function verifyOrder () {

    /*console.dir(selectedCategories["soup"]);
    console.dir(selectedCategories["main"]);
    console.dir(selectedCategories["salad"]);
    console.dir(selectedCategories["drink"]);
    console.dir(selectedCategories["dessert"]);*/

    let tempCheck = false;
    Object.keys(selectedCategories).forEach(function(currentValue) {
        if (selectedCategories[currentValue]) {
            tempCheck = true;
            return;
        }
    });
    if (tempCheck == false) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }

    if (selectedCategories["soup"] &&
        !(selectedCategories["main"] ||
        selectedCategories["salad"])) {
        return "Выберите главное блюдо/салат/стартер";
    }
    if (selectedCategories["salad"] &&
        !(selectedCategories["soup"] ||
        selectedCategories["main"])) {
        return "Выберите суп или главное блюдо";
    } 
    if ((selectedCategories["drink"] || selectedCategories["dessert"]) &&
        !(selectedCategories["main"] || 
            selectedCategories["soup"] || 
            selectedCategories["salad"])) {
        return "Выберите главное блюдо";
    }

    if (!selectedCategories["drink"]) {
        return "Выберите напиток";
    }
          

    return "";
}

let elem = document.getElementsByClassName("submit_button").item(0);

elem.addEventListener("click", function(event) {

    fillSelectedCategories();
    let res = verifyOrder();

    if (res != "") {
        event.preventDefault();
    
        const notificationMessage = document.querySelector('.notification p');
        notificationMessage.innerHTML = res;
    
        const notification = document.getElementById('notification');
        notification.style.display = 'block'; // Показываем уведомление
    
        const okButton = document.getElementById('okButton');
        okButton.onclick = function() {
            notification.style.display = 'none'; // Скрываем уведомление
        };
    } else {
        location.href = "./placingOrder.html";
        // Переход к оформлению
    }
});