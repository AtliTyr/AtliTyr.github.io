"use strict";

let msg;

function verifyOrder () {
    let t = false;
    Object.keys(selectedCategories).forEach(function(currentValue) {
        if (selectedCategories[currentValue]) {
            t = true;
            return;
        }
    });

    if (t == false) {
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
    if ((selectedCategories["drink"] || selectedCategories["desert"]) &&
        !selectedCategories["main"]) {
        msg = "Выберите главное блюдо";
        return false;
    }
    if (!selectedCategories["drink"]) {
        msg = "Выберите напиток";
        return false;
    }
          

    return true;
}

document.forms.item(0).addEventListener("submit", function(event) {
    let res = verifyOrder();

    if (res == false) {
        event.preventDefault();
    
        const notificationMessage = document.querySelector('.notification p');
        notificationMessage.innerHTML = msg;
    
        const notification = document.getElementById('notification');
        notification.style.display = 'block'; // Показываем уведомление
    
        const okButton = document.getElementById('okButton');
        okButton.onclick = function() {
            notification.style.display = 'none'; // Скрываем уведомление
        };
    }

});