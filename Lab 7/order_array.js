"use strict";

let orderArray = [];

let loadDishesPromise;

function searchByKeyword(keyword) {
    for (let obj of orderArray) {
        if (obj.keyword === keyword) {
            return obj;
        }
    }
    return undefined;
}

async function loadDishes() {
    let url = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

    loadDishesPromise = new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            orderArray = data;
            // Обработайте данные здесь
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });

    /*loadDishesPromise = fetch(url).then(function (response) {
        response.text().then(function (text) {
            orderArray = JSON.parse(text);
            orderArray.sort(
                (a, b) => (a.name > b.name) ? 1 : a.name === b.name ? 0 : -1);
        });
    }); */
}   

loadDishes();
