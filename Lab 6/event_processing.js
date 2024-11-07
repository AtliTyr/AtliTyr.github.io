let selectedSoup;
let selectedMain_course;
let selectedBeverages;
let selectedDessert;
let selectedSalads_starters;
let total;

let selectedOrder;
let order_category;

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
        selectedOrder = selectedSoup;
        break;
    case 'main_course':
        selectedOrder = selectedMain_course;
        break;
    case 'beverage':
        selectedOrder = selectedBeverages;
        break;
    case 'dessert':
        selectedOrder = selectedDessert;
        break;
    case 'salad_starter':
        selectedOrder = selectedSalads_starters;
        break;
    }
    order_category = event.target.parentNode.parentNode.id;


    function on_click() {
        if (selectedOrder) {
            selectedOrder.style.border = '';
            if (selectedOrder.dataset.dish ===
                event.target.parentNode.dataset.dish) {
                selectedOrder = undefined;
                return;
            }
        }
        selectedOrder = event.target.parentNode;
        selectedOrder.style.border = '2px solid tomato'; 
    }
    on_click();

    switch (event.target.parentNode.parentNode.id) {
    case 'soup':
        selectedSoup = selectedOrder;
        break;
    case 'main_course':
        selectedMain_course = selectedOrder;
        break;
    case 'beverage':
        selectedBeverages = selectedOrder;
        break;
    case 'dessert':
        selectedDessert = selectedOrder;
        break;
    case 'salad_starter':
        selectedSalads_starters = selectedOrder;
        break;
    }

    updateOrderInfo();

}