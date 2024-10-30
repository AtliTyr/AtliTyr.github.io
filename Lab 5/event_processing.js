let selectedSoup;
let selectedMain_course;
let selectedBeverages;
let selectedDessert;
let selectedSalads_starters;
let total;

function checkVisibility() {
    if (selectedBeverages === undefined 
        && selectedSoup === undefined 
        && selectedMain_course === undefined
        && selectedDessert === undefined
        && selectedSalads_starters === undefined) {
        document.getElementsByClassName('order_update').
            item(0).
            style.
            display = "none";
        document.getElementsByClassName('nothing-chosen').
            item(0).
            style.
            display = "block";
    } else {
        document.getElementsByClassName('order_update').
            item(0).
            style.
            display = "block";
        document.getElementsByClassName('nothing-chosen').
            item(0).
            style.
            display = "none";
    }
}

function updateOrderInfo() {
    total = 0;

    let form = document.querySelectorAll('.order_update p');

    let order_price;
    for (let i = 0; i < form.length; i++) {
        let el = form.item(i);

        switch (el.nextElementSibling.id) {
        case 'soups':
            if (selectedSoup) {
                let obj = searchByKeyword(selectedSoup.dataset.dish);
                el.innerHTML = `${obj.name} ${obj.price}`;
                
                order_price = (obj.price).substring(0, obj.price.length - 1);
                total += +order_price;
            } else {
                el.innerHTML = `Суп не выбран`;
            }
            break;
        case 'main-courses':
            if (selectedMain_course) {
                let obj = searchByKeyword(selectedMain_course.dataset.dish);
                el.innerHTML = `${obj.name} ${obj.price}`;
        
                order_price = (obj.price).substring(0, obj.price.length - 1); 
                total += +order_price;
            } else {
                el.innerHTML = 'Блюдо не выбрано';
            }
            break;
        case 'salads_starters':
            if (selectedSalads_starters) {
                let obj = searchByKeyword(selectedSalads_starters.dataset.dish);
                el.innerHTML = `${obj.name} ${obj.price}`;
        
                order_price = (obj.price).substring(0, obj.price.length - 1); 
                total += +order_price;
            } else {
                el.innerHTML = 'Салат или стартер не выбран';
            } 
            break;
        case 'beverages':
            if (selectedBeverages) {
                let obj = searchByKeyword(selectedBeverages.dataset.dish);
                el.innerHTML = `${obj.name} ${obj.price}`;
        
                order_price = (obj.price).substring(0, obj.price.length - 1); 
                total += +order_price;
            } else {
                el.innerHTML = 'Напиток не выбран';
            } 
            break;
        case 'desserts':
            if (selectedDessert) {
                let obj = searchByKeyword(selectedDessert.dataset.dish);
                el.innerHTML = `${obj.name} ${obj.price}`;
        
                order_price = (obj.price).substring(0, obj.price.length - 1); 
                total += +order_price;
            } else {
                el.innerHTML = 'Дессерт не выбран';
            } 
            break;
        case 'total':
            if (total != 0) {
                form.item(5).innerHTML = `${total} ₽`;
            } else {
                form.item(5).innerHTML = '';
            }
            break;
        }

        checkVisibility();  
    }
}

function ev_process() {
    switch (event.target.parentNode.parentNode.id) {
    case 'soup':
        function soups_click() {
            if (selectedSoup) {
                selectedSoup.style.border = '2px solid transparent';
                if (selectedSoup.dataset.dish === 
                    event.target.parentNode.dataset.dish) {
                    selectedSoup = undefined;
                    return;
                }
            }
            selectedSoup = event.target.parentNode;
            selectedSoup.style.border = '2px solid tomato'; 
        }
        soups_click();
        updateOrderInfo();
        break;
    case 'main_course':
        function main_courses_click() {
            if (selectedMain_course) {
                selectedMain_course.style.border = '2px solid transparent';
                if (selectedMain_course.dataset.dish === 
                    event.target.parentNode.dataset.dish) {
                    selectedMain_course = undefined;
                    return;
                }
            }
            selectedMain_course = event.target.parentNode;
            selectedMain_course.style.border = '2px solid tomato'; 
        }
        main_courses_click();
        updateOrderInfo();
        break;
    case 'beverage':
        function beverages_click() {
            if (selectedBeverages) {
                selectedBeverages.style.border = '2px solid transparent';
                if (selectedBeverages.dataset.dish === 
                    event.target.parentNode.dataset.dish) {
                    selectedBeverages = undefined;
                    return;
                }
            }
            selectedBeverages = event.target.parentNode;
            selectedBeverages.style.border = '2px solid tomato'; 
        }
        beverages_click();
        updateOrderInfo();
        break;
    case 'dessert':
        function desserts_click() {
            if (selectedDessert) {
                selectedDessert.style.border = '2px solid transparent';
                if (selectedDessert.dataset.dish === 
                    event.target.parentNode.dataset.dish) {
                    selectedDessert = undefined;
                    return;
                }
            }
            selectedDessert = event.target.parentNode;
            selectedDessert.style.border = '2px solid tomato'; 
        }
        desserts_click();
        updateOrderInfo();
        break;
    case 'salad_starter':
        function salad_starter_click() {
            if (selectedSalads_starters) {
                selectedSalads_starters.style.border = '2px solid transparent';
                if (selectedSalads_starters.dataset.dish === 
                    event.target.parentNode.dataset.dish) {
                    selectedSalads_starters = undefined;
                    return;
                }
            }
            selectedSalads_starters = event.target.parentNode;
            selectedSalads_starters.style.border = '2px solid tomato'; 
        }
        salad_starter_click();
        updateOrderInfo();
        break;
    }
}