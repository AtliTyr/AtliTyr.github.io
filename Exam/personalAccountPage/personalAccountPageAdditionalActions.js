let chosenOrderId;

function selectChosenOrderNumber(event) {
    chosenOrderId =
    +event.currentTarget.parentNode.parentNode.parentNode.firstChild.innerHTML;
}

document.querySelector(".confirmDeleteButton").addEventListener("click", 
    async function (event) {
        let specificUrl = "/exam-2024-1/api/orders/";
        let id = ordersArray[chosenOrderId - 1]["id"];

        await fetch(`${mainUrl}${specificUrl}${id}?${apiKey}`, {
            method: "DELETE"    
        })
            .then(responce => {
                if (!responce.ok) {
                    throw new Error("Ошибка в процессе удаления заказа!");
                }
                window.localStorage.setItem("notification",
                    `Заказ успешно удалён!`
                );
                location.reload();
            })
            .catch(error => {
                window.localStorage.setItem("notification", 
                    error
                );
                location.reload();
            });
    });

document.querySelector(".updateOrderInfo").
    addEventListener("click", async function(event) {
        let formData = new FormData();

        let fullName = document.querySelector(`
            .edit-order-info > div.full_name input`).value;
        if (fullName.trim() != ``)
            formData.append("full_name", fullName);

        let phoneNumber = document.querySelector(`
            .edit-order-info > div.phone_number input`).value;
        if (phoneNumber.trim() != "")
            formData.append("phone", phoneNumber);

        let emailAdd = document.querySelector(`
            .edit-order-info > div.email input`).value;
        if (emailAdd.trim() != "") 
            formData.append("email", emailAdd);

        let delAdd = document.querySelector(`
            .edit-order-info > div.delivery_address input`).value;
        if (delAdd.trim() != "")
            formData.append("delivery_address", delAdd);
        
        let delDate = document.querySelector(`
            .edit-order-info > div.delivery_date input`).value;
        if (delDate.trim() != "") 
            formData.append("delivery_date", delDate);

        formData.append("delivery_interval",
            document.querySelector(`
            .edit-order-info > div.delivery_time > select`).value);

        let commentInfo = document.querySelector(`
            .edit-order-info > div.comment-info textarea`).value;
        if (commentInfo.trim() != "")
            formData.append("comment", commentInfo);


        let specificUrl = '/exam-2024-1/api/orders/';
        let orderId = ordersArray[chosenOrderId - 1]["id"];
        await fetch(`${mainUrl}${specificUrl}${orderId}?${apiKey}`, {
            method: "PUT",
            body: formData
        })
            .then(responce => {
                if (!responce.ok) {
                    throw new Error(`
                        Ошибка при обновлении информации о заказе`);
                }
                window.localStorage.setItem("notification",
                    `Информация по заказу была успешно обновлена`
                );
                location.reload();
            })
            .catch(error => {
                window.localStorage.setItem("notification", 
                    error
                );
                location.reload();
            });
    });

function fillOrderInfo() {
    //let id = ordersArray[chosenOrderId - 1]["id"];  
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

    document.querySelector(".order-content-info p.info").
        innerHTML = ``;
    for (let id of ordersArray[chosenOrderId - 1][`good_ids`]) {
        document.querySelector(".order-content-info p.info").
            innerHTML += `${goodsInOrders[id][0]}; <br>`;
        total += +goodsInOrders[id][1];
    }
    document.querySelector(".order-total-sum-info p.info").
        innerHTML = `${total} &#8381;`;
}

function fillEditOrderInfo() { 
    for (let info in ordersArray[chosenOrderId - 1]) {
        switch (info) {
        case 'comment':
            if (ordersArray[chosenOrderId - 1]['comment'] != null) {
                document.querySelector(`
                    .edit-order-info div.comment-info textarea
                    `).value = 
                `${ordersArray[chosenOrderId - 1]['comment']}`;
            }
            break;
        case 'created_at':
            document.
                querySelector(".edit-order-info > div.date-info > p.info").
                innerHTML = 
            `${formateDate(ordersArray[chosenOrderId - 1]['created_at'])}`;
            break;
        case 'delivery_address':
            document.querySelector(`
                .edit-order-info > div.delivery_address input
                `).value = 
            `${ordersArray[chosenOrderId - 1]['delivery_address']}`;
            break;
        case 'delivery_date':
            let deliveryDate = ordersArray[chosenOrderId - 1]["delivery_date"];
            document.querySelector(`
                .edit-order-info > div.delivery_date input
                `).value =
                `${deliveryDate}`;
            break;
        case 'delivery_interval':
            let interval = ordersArray[chosenOrderId - 1]["delivery_interval"];
            ordersArray[chosenOrderId - 1]["delivery_interval"];
            document.
                querySelector(`select[name="delivery_interval"] > 
                option[value="${interval}"]`).selected = `selected`;
            break;
        case 'email':
            document.querySelector(`
                .edit-order-info div.email input
                `).value = 
            `${ordersArray[chosenOrderId - 1]['email']}`;
            break;
        case 'full_name':
            document.querySelector(`
                .edit-order-info div.full_name input
                `).value = 
            `${ordersArray[chosenOrderId - 1]['full_name']}`;
            break;
        case 'phone':
            document.querySelector(`
                .edit-order-info div.phone_number input
                `).value =  
            `${ordersArray[chosenOrderId - 1]['phone']}`;
            break;
        }
    }

    let total = 0;

    document.
        querySelector(".edit-order-info > div.order-content-info > p.info").
        innerHTML = "";
    for (let id of ordersArray[chosenOrderId - 1][`good_ids`]) {
        document.
            querySelector(".edit-order-info > div.order-content-info > p.info").
            innerHTML += `${goodsInOrders[id][0]}; <br>`;
        total += +goodsInOrders[id][1];
    }
    document.
        querySelector(".edit-order-info > div.order-total-sum-info > p.info").
        innerHTML = `${total} &#8381;`;
}