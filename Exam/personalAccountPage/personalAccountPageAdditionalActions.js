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
                displayOrders();
            })
            .catch(error => {
                notificationConstructor(error);
            });
    });

function fillOrderInfo() {
    
}