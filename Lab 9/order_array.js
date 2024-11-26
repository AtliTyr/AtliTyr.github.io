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

function searchByID(id) {
    for (let obj of orderArray) {
        if (+obj.id === +id) {
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
            
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}   

loadDishes();

//window.localStorage.clear();
