for (let obj of orderArray) {
    let temp = document.createElement('div');
    temp.className = 'single_order';
    temp.dataset.dish = obj.keyword;
    temp.innerHTML = `<img src="${obj.image}"> 
                          <p class="price-p">${obj.price}</p>
                          <p class="name-p">${obj.name}</p>
                          <p class="weight-p">${obj.count}</p>
                          <button onclick="ev_process()">Добавить</button>`;
        
    switch (obj.category) {
    case 'soups':
        soup.append(temp);
        break;
    case 'main_courses':
        main_course.append(temp);
        break;
    case 'beverages':
        beverage.append(temp);
        break;
    case 'salads_starters':
        salad_starter.append(temp);
        break;
    case 'desserts':
        dessert.append(temp);
        break;
    }
}