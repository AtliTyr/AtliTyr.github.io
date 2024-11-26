"use strict";

(async () => {
    await loadDishesPromise;

    for (let obj of orderArray) {

        let temp = document.createElement('div');
        temp.className = 'single_order';
        temp.dataset.dish = obj.keyword;
        temp.innerHTML = `<img src="${obj.image}"> 
                              <p class="price-p">${obj.price} ₽</p>
                              <p class="name-p">${obj.name}</p>
                              <p class="weight-p">${obj.count}</p>
                              <button onclick="evProcess()">Добавить</button>`;

        switch (obj.category) {
        case 'soup':
            soup.append(temp);
            break;
        case 'main-course':
            main_course.append(temp);
            break;
        case 'drink':
            beverage.append(temp);
            break;
        case 'salad':
            salad_starter.append(temp);
            break;
        case 'dessert':
            dessert.append(temp);
            break;
        }
    }

    for (let i = 0; i < window.localStorage.length; i++) {
        let obj = searchByID(
            window.localStorage.getItem(window.localStorage.key(i))
        );
        document.querySelector(`div[data-dish=${obj.keyword}`).
            style.border = `2px solid tomato`;
    }

    updateOrderInfo();

})();