"use strict";

function verifyOrder() {
    let obj = {};
    for (let i = 0; i < window.localStorage.length; i++) {
        obj[window.localStorage.key(i)] = true;
    }

    let tempCheck = false;
    Object.keys(obj).forEach(function(currentValue) {
        if (obj[currentValue]) {
            tempCheck = true;
            return;
        }
    });
    if (tempCheck == false) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }

    if (obj["soup"] &&
        !(obj["main-course"] ||
            obj["salad"])) {
        return "Выберите главное блюдо/салат/стартер";
    }
    if (obj["salad"] &&
        !(obj["soup"] ||
            obj["main-course"])) {
        return "Выберите суп или главное блюдо";
    } 
    if ((obj["drink"] || obj["dessert"]) &&
        !(obj["main-course"] || 
            obj["soup"] || 
            obj["salad"])) {
        return "Выберите главное блюдо";
    }

    if (!obj["drink"]) {
        return "Выберите напиток";
    }
          

    return "";
}  

let elem = document.getElementsByClassName("submit_button").item(0);

elem.addEventListener("click", function(event) {
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