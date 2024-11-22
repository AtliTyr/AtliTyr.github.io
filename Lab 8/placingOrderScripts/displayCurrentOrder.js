"use strict";

function displaySingleMeal(meal) {

    let temp = document.createElement('div');
    temp.className = 'single_order';
    temp.dataset.dish = meal.keyword;
    temp.innerHTML = `<img src="${meal.image}"> 
                          <p class="price-p font-reg-sets">${meal.price} ₽</p>
                          <p class="name-p font-reg-sets">${meal.name}</p>  
                          <p class="weight-p font-reg-sets">${meal.count}</p>
                          <button onclick="deleteProcess()">Удалить</button>`;
    document.getElementsByClassName("order-content").item(0).append(temp);

    /*for (let i = 0; i < window.localStorage.length; i++) {
        let meal = searchByID(
            window.localStorage.getItem(window.localStorage.key(i))
        );
        document.querySelector(`div[data-dish=${meal.keyword}`).
            style.border = `2px solid tomato`;
    }*/
}