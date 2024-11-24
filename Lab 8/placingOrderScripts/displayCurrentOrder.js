"use strict";

(async () => {
    
    await loadPromise;

    for (let meal of orderArray) {
        let temp = document.createElement('div');
        temp.className = 'single_order';
        temp.dataset.dish = meal.keyword;
        temp.innerHTML = `<img src="${meal.image}"> 
                          <p class="price-p font-reg-sets">${meal.price} ₽</p>
                          <p class="name-p font-reg-sets">${meal.name}</p>  
                          <p class="weight-p font-reg-sets">${meal.count}</p>
                          <button onclick="deleteProcess()">Удалить</button>`;
        document.getElementsByClassName("order-content").item(0).append(temp);
    }

    changeVisibility(); 
    updatePlacingOrderForm();
})();