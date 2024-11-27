function orderDateCompare(ord1, ord2) {
    let firstDate = new Date(ord1["created_at"]).getTime();
    let secondDate = new Date(ord2["created_at"]).getTime();
    return (firstDate < secondDate) ? 1 :
        (firstDate > secondDate) ? -1 :
            0;
}

function formateDate(time) {
    let mins = (time.getMinutes() < 10) ? `0${time.getMinutes()}` :
        time.getMinutes(); 
    let hoursAndMins = `${time.getHours()}:${mins}`;
    let day = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    return `${day}.${month}.${year} ${hoursAndMins}`;
}

(async () => {
    
    await AllOrdersLoadingPromise;

    let iter = 0;

    orderArray.sort(orderDateCompare);

    await AllDishesLoadingPromise;

    for (let order of orderArray) {
        iter++;
        let newOrd = document.createElement("tr");

        let th = document.createElement("th");
        th.scope = "row";
        th.innerHTML = iter;

        newOrd.append(th);

        {
            let createdAt = document.createElement("td");
            createdAt.innerHTML = formateDate(new Date(order["created_at"]));
            newOrd.append(createdAt);
        }

        let contentOfOrder = document.createElement("td");
        let contentString = [];
        let total = 0;

        const keys = Object.keys(order);
        
        const idKeys = keys.filter(key => key.includes('_id') 
        && key !== 'student_id');
        
        idKeys.forEach(key => {
            if (order[key] != null) {
                contentString.push(dishes[order[key] - 1]["name"]);
                total += +dishes[order[key] - 1]["price"];
            }   
        });

        contentOfOrder.innerHTML = contentString.join(', ');
        contentOfOrder.style.maxWidth = "300px";

        newOrd.append(contentOfOrder);

        {
            let sumOfOrder = document.createElement("td");
            sumOfOrder.innerHTML = `${total} ₽`;
            newOrd.append(sumOfOrder);
        }

        { 
            let deliveryType = document.createElement("td");
            if (order["delivery_type"] == "now") {
                deliveryType.innerHTML = "В течение дня <br> (с 7:00 до 23:00)";
            } else {
                deliveryType.innerHTML = `${order["delivery_time"].
                    substring(0, 5)}`;
            }
            newOrd.append(deliveryType);
        }

        {
            let additionalActions = document.createElement("td");
            
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
            });
            eye.addEventListener("click", function(event) {
                selectChosenOrderNumber(event);
                fillOrderInfo();
            });

            additionalActions.append(eye);
            additionalActions.append(pencil);
            additionalActions.append(trash);

            newOrd.append(additionalActions);
        }

        document.querySelector(".listOfOrders tbody").append(newOrd);

    }   
    
})();