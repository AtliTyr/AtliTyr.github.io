"use strict";

let currentTime = new Date();
function formateDate(date) {
    date = date.toString().split(" ");

    const calcIndex = "JanFebMarAprMayJunJulAugSepOctNovDec";

    let month = calcIndex.indexOf(date[1]) / 3 + 1;
    month = (month < 10) ? `0${month}` : month; 

    return `${date[3]}-${month}-${date[2]}`;
}

document.querySelector(`input[name="delivery_date"]`).value = 
    formateDate(currentTime);

document.querySelector(".delivery_price").innerHTML = `
    <small>(Стоимость доставки 
    ${calculateDeliveryPrice(
        document.querySelector(`input[name="delivery_date"]`).value,
        document.querySelector(`select[name="delivery_interval"]`).value
    )} 
    &#8381;)</small>`;

document.querySelector(`input[name="delivery_date"]`)
    .addEventListener("change", function() {
        document.querySelector(".delivery_price").innerHTML = `
        <small>(Стоимость доставки 
        ${calculateDeliveryPrice(
        document.querySelector(`input[name="delivery_date"]`).value,
        document.querySelector(`select[name="delivery_interval"]`).value
    )} &#8381;)</small>`;
        document.getElementsByClassName("total-count").item(0)
            .innerHTML = `<strong>Итоговая стоимость: 
            ${totalCount ? totalCount + calculateDeliveryPrice(
        document.querySelector(`input[name="delivery_date"]`).value,
        document.querySelector(`select[name="delivery_interval"]`).value
    ) : 0}
             &#8381;</strong>`;
    });
document.querySelector(`select[name="delivery_interval"]`)
    .addEventListener("change", function() {
        document.querySelector(".delivery_price").innerHTML = `
        <small>(Стоимость доставки  
        ${calculateDeliveryPrice(
        document.querySelector(`input[name="delivery_date"]`).value,
        document.querySelector(`select[name="delivery_interval"]`).value
    )} &#8381;)</small>`;
        document.getElementsByClassName("total-count").item(0)
            .innerHTML = `<strong>Итоговая стоимость: 
            ${totalCount ? totalCount + calculateDeliveryPrice(
        document.querySelector(`input[name="delivery_date"]`).value,
        document.querySelector(`select[name="delivery_interval"]`).value
    ) : 0}
             &#8381;</strong>`;
    });
