"use strict";

let currentTime = new Date();
function formateDate(date) {
    date = date.toString().split(" ");

    const calcIndex = "JanFebMarAprMayJunJulAugSepOctNovDec";

    let month = calcIndex.indexOf(date[1]) / 3 + 1;
    month = (month < 10) ? `0${month}` : month; 

    return `${date[3]}-${month}-${date[2]}`;
}

let deliveryPrice;

function calculateDeliveryPrice(date, interval) {
    // date - yyyy-mm-dd
    // interval: 1) 08:00-12:00
    //           2) 12:00-14:00
    //           3) 14:00-18:00
    //           4) 18:00-22:00

    //let date = document.querySelector(`input[name="delivery_date"]`).value;
    let dayOfTheWeek = new Date(date).toString().split(" ")[0];

    let basePrice = 200;

    //let interval = document.querySelector(`select[name="delivery_interval"]`)
    //.value;
    if (interval == "18:00-22:00") {
        if (dayOfTheWeek == 'Sun' || dayOfTheWeek == 'Sat') {
            basePrice += 300;
        } else {
            basePrice += 200;
        }
    }
    return basePrice;
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
