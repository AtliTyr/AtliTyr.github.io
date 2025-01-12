"use strict";

function completeDeleteProducts() {
    deleteMainContent();
    if (document.querySelector("main-content p")) {
        document.querySelector("main-content p").remove();
    }

    window.localStorage.removeItem("goods");
    orderArray = [];    
    displayMainContent();
}

document.querySelector(`contact-form form`).
    addEventListener("submit", function(event) {

        event.preventDefault();

        if (window.localStorage.getItem("goods") == null) {
            notificationConstructor("Вы ничего не добавили в корзину!");
            return;
        }

        const formData = new FormData(event.currentTarget);

        if (formData.get("subscribe") == "on") {
            formData.set("subscribe", 1);
        } else {
            formData.set("subscribe", 0);
        }
        let date = formData.get("delivery_date").split("-").reverse().join(".");
        formData.set("delivery_date", date);
        JSON.parse(window.localStorage.getItem("goods")).
            forEach(function(good) {
                formData.append(`good_ids`, good);
            });
            
        let formData1 = new FormData();
        formData1.append('full_name', formData.get('full_name'));
        formData1.append('email', formData.get('email'));
        if (formData.get("subscribe") == "on") {
            formData1.set("subscribe", 1);
        } else {
            formData1.set("subscribe", 0);
        }
        formData1.append('phone', formData.get("phone"));
        formData1.append('delivery_address', formData.get('delivery_address'));
        formData1.append('delivery_date', formData.get('delivery_date'));
        formData1.append('delivery_interval', 
            formData.get('delivery_interval'));
        formData1.append('comment', formData.get('comment'));
        JSON.parse(window.localStorage.getItem("goods")).
            forEach(function(good) {
                formData1.append(`good_ids`, good);
            });

        let specificUrl = "/exam-2024-1/api/orders";
        let url = `${mainUrl}${specificUrl}?${apiKey}`;
        fetch(`${url}`, {
            method: "POST",
            body: formData, 
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status.toString() == "422") {
                        notificationConstructor(`ОШИБКА!!! 
                            1) Возможные проблемы: Достигнуто максимальное
                            количество заказов(макс. 10)
                            2) Указана неверная дата доставки`);
                    } else {
                        notificationConstructor(`Заказ не был опубликован из-за 
                        непредвиденной ошибки! Код ошибки: ${response.status}`);
                    }
                } else {
                    notificationConstructor(`Заказ успешно опубликован!`);
                    completeDeleteProducts();
                }
            });
    });
