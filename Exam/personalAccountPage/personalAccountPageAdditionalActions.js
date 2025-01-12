let chosenOrderId;

function selectChosenOrderNumber(event) {
    chosenOrderId =
    +event.currentTarget.parentNode.parentNode.parentNode.firstChild.innerHTML;
}

document.querySelector(".confirmDeleteButton").addEventListener("click", 
    function (event) {
        let specificUrl = "/exam-2024-1/api/orders/";
        let id = ordersArray[chosenOrderId - 1]["id"];

        fetch(`${mainUrl}${specificUrl}${id}?${apiKey}`, {
            method: "DELETE"    
        })
            .then(responce => {
                if (!responce.ok) {
                    throw new Error("Ошибка в процессе удаления заказа!");
                }
                deleteOrderInfo();
                ordersArray.splice(chosenOrderId - 1, 1);
                goodsInOrders.splice(chosenOrderId - 1, 1);
                displayOrders();
            })
            .catch(error => {
                notificationConstructor(error);
            });
    });

document.querySelector(".viewOrderButton").
    addEventListener("click", function(event) {
        document.querySelectorAll("div#checkOrderInfo p.info").
            forEach(function(elem) {
                elem.innerHTML = "";
            });
    });

function fillOrderInfo() {
    //let id = ordersArray[chosenOrderId - 1]["id"];  
    let iter = 0;
    for (let info in ordersArray[chosenOrderId - 1]) {
        switch (info) {
        case 'comment':
            if (ordersArray[chosenOrderId - 1]['comment'] == null) {
                document.querySelector(".comment-info p.info").innerHTML = 
                `#Нет комментария#`;
            } else {
                document.querySelector(".comment-info p.info").innerHTML = 
                `${ordersArray[chosenOrderId - 1]['comment']}`;
            }
            break;
        case 'created_at':
            document.querySelector(".date-info p.info").innerHTML = 
            `${formateDate(ordersArray[chosenOrderId - 1]['created_at'])}`;
            break;
        case 'delivery_address':
            document.querySelector(".delivery_address p.info").innerHTML = 
            `${ordersArray[chosenOrderId - 1]['delivery_address']}`;
            break;
        case 'delivery_date':
            let deliveryDate = ordersArray[chosenOrderId - 1]["delivery_date"]
                .split("-").reverse().join(".");
            document.querySelector(".delivery_date p.info").innerHTML =
                `${deliveryDate}`;
            break;
        case 'delivery_interval':
            let deliveryInterval = 
            ordersArray[chosenOrderId - 1]["delivery_interval"];
            document.querySelector(".delivery_time p.info").innerHTML =
            `${deliveryInterval}`;
            break;
        case 'email':
            document.querySelector(".email p.info").innerHTML = 
            `${ordersArray[chosenOrderId - 1]['email']}`;
            break;
        case 'full_name':
            document.querySelector(".full_name p.info").innerHTML = 
            `${ordersArray[chosenOrderId - 1]['full_name']}`;
            break;
        case 'phone':
            document.querySelector(".phone_number p.info").innerHTML = 
            `${ordersArray[chosenOrderId - 1]['phone']}`;
            break;
        }
    }

    let total = 0;

    for (let id of ordersArray[chosenOrderId - 1][`good_ids`]) {
        document.querySelector(".order-content-info p.info").
            innerHTML += `${goodsInOrders[id][0]}; <br>`;
        total += +goodsInOrders[id][1];
    }
    document.querySelector(".order-total-sum-info p.info").
        innerHTML += `${total} &#8381;`;
}