let orderArray = [];
let dishes = [];

let api_key = "9de0c429-ab17-4d69-991b-2a5d2318c706";
let mainUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api";

let AllOrdersLoadingPromise; 
let AllDishesLoadingPromise;

async function loadOrder() {    
    AllOrdersLoadingPromise = new Promise((resolve, reject) => {
        let url = `${mainUrl}/orders`;

        const requestOptions = {
            method: "GET"
        };

        fetch(`${url}?api_key=${api_key}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка сети: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                orderArray = data;
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
    AllDishesLoadingPromise = new Promise((resolve, reject) => {
        let url = `${mainUrl}/dishes`;

        const requestOptions = {
            method: "GET"
        };

        fetch(`${url}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка сети: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                dishes = data;
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}   

loadOrder();