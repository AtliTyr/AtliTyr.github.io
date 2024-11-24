"use strict";

let orderArray = [];

let api_key = "9de0c429-ab17-4d69-991b-2a5d2318c706";
let mainUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api";

let loadPromise; 

function getMealByKeyword(keyword) {
    for (let obj of orderArray) {
        if (obj.keyword === keyword) {
            return obj;
        }
    }
    return undefined;
}

function deleteFromOrderArray(keyword) {
    orderArray.forEach(function(currentValue, currentIndex) {
        if (currentValue.keyword === keyword) {
            orderArray.splice(currentIndex, 1);
            return;
        }
    });
}

async function loadOrder() {

    loadPromise = new Promise((resolve, reject) => {
        for (let i = 0; i < window.localStorage.length; i++) {
            let id = window.localStorage.getItem(
                window.localStorage.key(i)
            );
            let url = `${mainUrl}/dishes/${id}`;
    
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
            
            fetch(`${url}?api_key=${api_key}`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка сети: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    //console.log('Данные:', data);
                    orderArray.push(data);
                    if (i + 1 == window.localStorage.length) {
                        resolve(orderArray);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }

    });

}   

loadOrder();