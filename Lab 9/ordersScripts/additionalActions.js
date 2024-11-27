let chosenOrderNumber;

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

function fillOrderInfo() {
    let ord = orderArray[chosenOrderNumber - 1];
    

    // Время создания заказа
    document.querySelector(".date-info .dynamic_info").
        innerHTML = formateDate(new Date(ord["created_at"]));

    // Информация о заказчике и данные доставки
    document.querySelector(".delivery-info .full_name .dynamic_info").
        innerHTML = `${ord["full_name"]}`;
    document.querySelector(
        ".delivery-info .delivery_address .dynamic_info").
        innerHTML = ord["delivery_address"]; 
    document.querySelector(".delivery-info .delivery_time .dynamic_info").
        innerHTML = ord["delivery_time"].substring(0, 5); 
    document.querySelector(".delivery-info .phone_number .dynamic_info").
        innerHTML = ord["phone"];
    document.querySelector(".delivery-info .email .dynamic_info").
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

    while (document.querySelector(".order-content-info").
        childElementCount != 0) {
        document.querySelector(".order-content-info").children.item(0).remove();
    }

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
    document.querySelector("p#total-sum").innerHTML = `${total}₽`;
}

function selectChosenOrderNumber(event) {
    chosenOrderNumber = event.target.parentNode.parentNode.firstChild.innerHTML;
}

document.querySelector("div#deleteOrder .confirmDeleteButton").
    addEventListener("click", deleteOrderEvent);