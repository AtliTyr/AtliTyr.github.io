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
    
    let dateElement = document.createElement("p");
    dateElement.className = "dynamic_info";
    dateElement.innerHTML = formateDate(new Date(ord["created_at"]));
    document.querySelector(".date-info").append(dateElement);

    {
        let name = document.createElement("p");
        name.className = "dynamic_info";
        name.innerHTML = `${ord["full_name"]}`;
        document.querySelector(".delivery-info .full_name").append(name);
        let address = document.createElement("p");
        address.className = "dynamic_info";
        address.innerHTML = ord["delivery_address"];
        document.querySelector(".delivery-info .delivery_address").
            append(address);
        let deliveryTime = document.createElement("p");
        deliveryTime.className = "dynamic_info";
        deliveryTime.innerHTML = ord["delivery_time"].substring(0, 5);  
        document.querySelector(".delivery-info .delivery_time").
            append(deliveryTime);
        let phoneNumber = document.createElement("p");
        phoneNumber.className = "dynamic_info";
        phoneNumber.innerHTML = ord["phone"];
        document.querySelector(".delivery-info .phone_number").
            append(phoneNumber);
        let email = document.createElement("p");
        email.className = "dynamic_info";
        email.innerHTML = ord["email"];
        document.querySelector(".delivery-info .email").append(email);
    }

    let comment = document.createElement("p");
    if (ord["comment"] != null)
        comment.innerHTML = ord["comment"];
    else 
        comment.innerHTML = "Нет комментария";
    document.querySelector(".comment-info").append(comment);


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

    let totalPrice = document.createElement("p");
    totalPrice.innerHTML = ` ${total}₽`;
    totalPrice.classList.add("font-form-headers");
    totalPrice.style.marginLeft = "0.3rem";
    document.querySelector(".order-total-sum-info").append(totalPrice);
}

function selectChosenOrderNumber(event) {
    chosenOrderNumber = event.target.parentNode.parentNode.firstChild.innerHTML;
}

document.querySelector("div#deleteOrder .confirmDeleteButton").
    addEventListener("click", deleteOrderEvent);