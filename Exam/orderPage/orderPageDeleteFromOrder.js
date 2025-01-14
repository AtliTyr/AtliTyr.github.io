"use strict";

function checkIfIdExists(id) {
    for (let obj of orderArray) {
        if (obj["id"] == id) 
            return true;
    }    
    return false;
}

function getProductName(id) {
    for (let obj of orderArray) {
        if (obj["id"] == id) 
            return obj["name"];
    }    
    return "";
}

function deleteProduct(event) {
    let chosenProductId = event.currentTarget.
        parentElement.parentElement.id.split("-").at(1); 

    if (!checkIfIdExists(chosenProductId)) {
        window.location.reload();
        return;
    }

    let chosenProductName = getProductName(chosenProductId);

    let productsIdArray = [];

    if (window.localStorage.getItem("goods") != undefined) {
        productsIdArray = JSON.parse(window.localStorage.getItem("goods"));
    }

    let index = productsIdArray.indexOf(chosenProductId);
    productsIdArray.splice(index, 1);


    orderArray.forEach(function(product, ind) {
        if (product["id"] == chosenProductId) {
            orderArray.splice(ind, 1);
        }
    });
     
    window.localStorage.setItem("goods", JSON.stringify(productsIdArray));
    if (window.localStorage.getItem("goods").length == 2) {
        window.localStorage.removeItem("goods");
    }

    deleteMainContent();
    displayMainContent();

    notificationConstructor(`Товар ${chosenProductName} был 
            успешно удалён из корзины!`, "success");

}