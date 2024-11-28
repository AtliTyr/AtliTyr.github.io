let chosenOrderNumber;

// Обработка удаления 
function deleteOrderEvent() {
    let url = `${mainUrl}/orders/${orderArray[chosenOrderNumber - 1]["id"]}`;
    fetch(`${url}?api_key=${api_key}`, {
        method: "DELETE"
    })
        .then(responce => {
            if (!responce.ok) {
                throw new Error("Ошибка в процессе удаления заказа!");
            }
            location.reload();
            return responce.json();
        })
        .catch(error => {
            alert(error);
        });
}

// Заполнение информации для окна с информарцией по заказу
function fillOrderInfo() {
    let ord = orderArray[chosenOrderNumber - 1];
    

    // Время создания заказа
    document.querySelector(".date-info .info").
        innerHTML = formateDate(new Date(ord["created_at"]));

    // Информация о заказчике и данные доставки
    document.querySelector(".delivery-info .full_name .info").
        innerHTML = `${ord["full_name"]}`;
    document.querySelector(
        ".delivery-info .delivery_address .info").
        innerHTML = ord["delivery_address"]; 
    document.querySelector(".delivery-info .delivery_time .info").
        innerHTML = ord["delivery_time"].substring(0, 5); 
    document.querySelector(".delivery-info .phone_number .info").
        innerHTML = ord["phone"];
    document.querySelector(".delivery-info .email .info").
        innerHTML = ord["email"];

    // Комментарий к заказу
    if (ord["comment"] != null)
        document.querySelector(".comment-info p").
            innerHTML = ord["comment"];
    else 
        document.querySelector(".comment-info p").
            innerHTML = "Нет комментария";

    // Состав заказа
    let total = 0;
    let contentString = [];

    const keys = Object.keys(ord);
        
    const idKeys = keys.filter(key => key.includes('_id') 
    && key !== 'student_id');
    
    idKeys.forEach(key => {
        if (ord[key] != null) {
            contentString.push(dishes[ord[key] - 1]);

            total += +dishes[ord[key] - 1]["price"];
        }   
    });

    document.querySelector(".order-content-info").innerHTML = "";

    for (let i = 0; i < contentString.length; i++) {
        let dishDiv = document.createElement("div");

        let dishCategory = document.createElement("p");
        dishCategory.className = "meta-info";
        let dishName = document.createElement("p");
        switch (contentString[i]["category"]) {
        case "soup":
            dishCategory.innerHTML = "Суп";
            break;
        case "main-course":
            dishCategory.innerHTML = "Основное блюдо";
            break;
        case "salad":
            dishCategory.innerHTML = "Салат";
            break;
        case "drink":
            dishCategory.innerHTML = "Напиток";
            break;
        case "dessert":
            dishCategory.innerHTML = "Десерт";
            break;
        }

        dishName.innerHTML = `
            ${contentString[i]["name"]}(${contentString[i]["price"]}₽)
            `; 
        dishName.className = "dynamic_info";
        dishDiv.append(dishCategory);
        dishDiv.append(dishName);

        document.querySelector(".order-content-info").append(dishDiv);
    }

    // Сумма заказа
    document.querySelector(".total-for-order").innerHTML = `${total}₽`;
}

// Заполнение информации для окна с редактированием информации
// по заказу
function fillEditableOrderInfo() {
    let ord = orderArray[chosenOrderNumber - 1];
    

    // Время создания заказа
    document.querySelector("div#editOrderInfo .date-info .dynamic_info").
        innerHTML = formateDate(new Date(ord["created_at"]));

    // Информация о заказчике и данные доставки
    document.querySelector("div#editOrderInfo .full_name input").
        value = `${ord["full_name"]}`;
    document.querySelector(
        "div#editOrderInfo .delivery_address input").
        value = ord["delivery_address"]; 
    document.querySelector("div#editOrderInfo .delivery_time input").
        value = ord["delivery_time"].substring(0, 5); 
    document.querySelector("div#editOrderInfo .phone_number input").
        value = ord["phone"];
    document.querySelector("div#editOrderInfo .email input").
        value = ord["email"];

    // Комментарий к заказу
    if (ord["comment"] != null)
        document.querySelector("div#editOrderInfo textarea").
            innerHTML = ord["comment"];
    else 
        document.querySelector("div#editOrderInfo textarea").
            innerHTML = "";

    // Состав заказа
    let total = 0;
    let contentString = [];

    const keys = Object.keys(ord);
        
    const idKeys = keys.filter(key => key.includes('_id') 
    && key !== 'student_id');
    
    idKeys.forEach(key => {
        if (ord[key] != null) {
            contentString.push(dishes[ord[key] - 1]);

            total += +dishes[ord[key] - 1]["price"];
        }   
    });

    document.querySelector(
        "div#editOrderInfo .order-content-info").innerHTML = "";

    for (let i = 0; i < contentString.length; i++) {
        let dishDiv = document.createElement("div");

        let dishCategory = document.createElement("p");
        dishCategory.className = "meta-info";
        let dishName = document.createElement("p");
        switch (contentString[i]["category"]) {
        case "soup":
            dishCategory.innerHTML = "Суп";
            break;
        case "main-course":
            dishCategory.innerHTML = "Основное блюдо";
            break;
        case "salad":
            dishCategory.innerHTML = "Салат";
            break;
        case "drink":
            dishCategory.innerHTML = "Напиток";
            break;
        case "dessert":
            dishCategory.innerHTML = "Десерт";
            break;
        }

        dishName.innerHTML = `
            ${contentString[i]["name"]}(${contentString[i]["price"]}₽)
            `; 
        dishName.className = "dynamic_info";
        dishDiv.append(dishCategory);
        dishDiv.append(dishName);

        document.querySelector(
            "div#editOrderInfo .order-content-info").append(dishDiv);
    }

    // Сумма заказа
    document.querySelector(
        "div#editOrderInfo .total-for-order").innerHTML = `${total}₽`;
}


function selectChosenOrderNumber(event) {
    chosenOrderNumber = event.target.parentNode.parentNode.firstChild.innerHTML;
}

// Создание события для кнопки "Да" в форме удаления заказа
document.querySelector("div#deleteOrder .confirmDeleteButton").
    addEventListener("click", deleteOrderEvent);

// Событие при редактировании заказа
document.forms.item(0).addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    let url = `${mainUrl}/orders/${orderArray[chosenOrderNumber - 1]["id"]}`;
    fetch(`${url}?api_key=${api_key}`, {
        method: "PUT",
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка с редактированием заказа!");
            }
            alert("Изменения успешно внесены в заказ!");
            location.reload();
        })
        .catch(error => {
            alert(error);
        });
});