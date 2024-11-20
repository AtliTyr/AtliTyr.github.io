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