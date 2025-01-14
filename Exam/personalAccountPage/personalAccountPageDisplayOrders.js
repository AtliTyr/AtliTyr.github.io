"use strict";
// Компаратор JSON Объектов по свойству "created_at"
function orderDateCompare(ord1, ord2) {
    let firstDate = new Date(ord1["created_at"]).getTime();
    let secondDate = new Date(ord2["created_at"]).getTime();
    //console.dir(`${firstDate} - ${secondDate}`);
    return (firstDate < secondDate) ? -1 :
        (firstDate > secondDate) ? 1 :
            0;
}

// Форматирует дату до удобного формата DD.MM.YY Hours:Mins
function formateDate(time) {
    let dateArray = time.split("T");
    let dayMonthYear = dateArray[0].split("-").reverse().join(".");
    let hourMinSec = dateArray[1].split(":");
    return `${dayMonthYear} ${hourMinSec[0]}:${hourMinSec[1]}`;
}

function deleteOrderInfo() {
    document.querySelectorAll("tbody tr").forEach(function(elem) {
        elem.remove();
    });
}

let goodsInOrders = {};

// Заполнение таблицы с заказами
async function displayOrders() {
    let iter = 0;
    goodsInOrders = {};

    ordersArray.sort(orderDateCompare);

    for (let order of ordersArray) {
        iter++;
        let newOrd = document.createElement("tr");

        let th = document.createElement("th");
        th.scope = "row";
        th.innerHTML = `${iter}.`;
        th.className = "align-middle";
        newOrd.append(th);


        let createdAt = document.createElement("td");
        createdAt.innerHTML = formateDate(order["created_at"]);
        createdAt.className = "d-none d-sm-table-cell align-middle";
        newOrd.append(createdAt);
        

        let total = 0;
        let contentOfOrder = document.createElement("td");
        let idArray = order["good_ids"];
        let specificUrl = "/exam-2024-1/api/goods";
        for (let id of idArray) {
            await fetch(`${mainUrl}${specificUrl}/${id}?${apiKey}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to get order info!");
                    }
                    return response.json();
                })
                .then(data => {
                    goodsInOrders[data["id"]] = [data["name"], 
                        (data[`discount_price`] ?? data[`actual_price`])];
                    
                    contentOfOrder.innerHTML += `${data["name"]}; <br>`;
                    total += 
                        +(data["discount_price"] ?? data["actual_price"]);
                });
        }
        contentOfOrder.className = "d-none d-md-table-cell align-middle";
        newOrd.append(contentOfOrder);
        
        
        let deliveryPrice = calculateDeliveryPrice(order["delivery_date"],
            order["delivery_interval"]
        );
        let orderPrice = document.createElement("td");
        orderPrice.innerHTML = `${total + deliveryPrice} &#8381;`;
        orderPrice.className = "d-none d-md-table-cell align-middle";
        newOrd.append(orderPrice);
        

        calculateDeliveryPrice();

        let deliveryDate = order["delivery_date"].split("-").
            reverse().join(".");
        let deliveryInterval = order["delivery_interval"];
        let deliveryInfo = document.createElement("td");
        deliveryInfo.innerHTML = 
            `${deliveryDate} <br> ${deliveryInterval}`;
        deliveryInfo.className = "align-middle";
        newOrd.append(deliveryInfo);
        // Создание иконок, вызывающих модальные окна для взаимодействия с 
        // заказом
        {
            let additionalActions = document.createElement("td");
            let iconsContainer = document.createElement("div");
            iconsContainer.className = 
                `d-flex flex-md-row flex-column justify-content-start`;
            let eye = document.createElement("i");
            eye.className = "bi bi-eye";
            eye.style.paddingRight = "1rem";
            eye.style.cursor = "pointer";
            eye.dataset.toggle = "modal";
            eye.dataset.target = "#checkOrderInfo";
            let pencil = document.createElement("i");
            pencil.className = `bi bi-pencil`;
            pencil.style.paddingRight = "1rem";
            pencil.style.cursor = "pointer";
            pencil.dataset.toggle = "modal";
            pencil.dataset.target = "#editOrderInfo";
            let trash = document.createElement("i");
            trash.className = `bi bi-trash`;
            trash.style.paddingRight = "1rem";
            trash.style.cursor = "pointer";
            trash.dataset.toggle = "modal";
            trash.dataset.target = "#deleteOrder";
            trash.addEventListener("click", function(event) {
                selectChosenOrderNumber(event); 
            });
            pencil.addEventListener("click", function(event) {
                selectChosenOrderNumber(event);
                fillEditOrderInfo();
            });
            eye.addEventListener("click", function(event) {
                selectChosenOrderNumber(event);
                fillOrderInfo();
            });
            iconsContainer.append(eye);
            iconsContainer.append(pencil);
            iconsContainer.append(trash);
            additionalActions.append(iconsContainer);
            newOrd.append(additionalActions);
        }
        document.querySelector(".list-of-orders tbody").append(newOrd);
    }   

    if (window.localStorage.getItem("notification")) {
        notificationConstructor(window.localStorage.getItem("notification"),
            window.localStorage.getItem("notificationType"));
        window.localStorage.removeItem("notification");
        window.localStorage.removeItem("notificationType");
    }
}

displayOrders();