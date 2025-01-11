function addProduct(event) {
    let chosenProductId = event.currentTarget.
        parentElement.parentElement.id.split("-").at(1); 
    
    let chosenProductName = document.
        querySelector(`div#id-${chosenProductId} > p`).innerHTML;


    let orderArray = [];

    if (window.localStorage.getItem("goods") != undefined) {
        orderArray = JSON.parse(window.localStorage.getItem("goods"));
    }

    if (!orderArray.includes(chosenProductId)) {
        orderArray.push(chosenProductId);
        window.localStorage.setItem("goods", JSON.stringify(orderArray));
        notificationConstructor(`Товар ${chosenProductName} был 
            успешно добавлен в корзину!`);
    } else {
        notificationConstructor(`Товар уже добавлен в корзину!`);
    }

}