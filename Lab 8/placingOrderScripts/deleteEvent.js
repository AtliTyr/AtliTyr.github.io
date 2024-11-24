function changeVisibility() {
    if (window.localStorage.length == 0) {
        document.querySelector(".noMeals").
            style.display = "block";
    } else {
        document.querySelector(".noMeals").
            style.display = "none";
    }   
}

function updatePlacingOrderForm() {
    if (window.localStorage.length == 0) {
        document.
            getElementsByClassName("nothing-chosen").
            item(0).
            style.
            display = "block";
        document.getElementsByClassName("order_update").
            item(0).
            style.
            display = "none";
        return;
    } else {
        document.
            getElementsByClassName("nothing-chosen").
            item(0).
            style.
            display = "none";
        document.getElementsByClassName("order_update").
            item(0).
            style.
            display = "block";

        let allPTags = document.querySelectorAll(".updatable_info");
        allPTags.forEach(function(currentValue) {
            switch (currentValue.dataset.cat) {
            case 'soup':
                currentValue.innerHTML = "Суп не выбран";
                break;
            case 'main-course':
                currentValue.innerHTML = "Блюдо не выбрано";
                break;
            case 'salad':
                currentValue.innerHTML = "Салат/стартер не выбран";
                break;
            case 'drink':
                currentValue.innerHTML = "Напиток не выбран";
                break;
            case 'dessert':
                currentValue.innerHTML = "Десерт не выбран";
                break;
            }
        });

        let total = 0;

        for (let obj of orderArray) {
            document.querySelectorAll(".updatable_info").
                forEach(function(currentValue) {
                    if (currentValue.dataset.cat === obj.category) {
                        currentValue.
                            innerHTML = `${obj.name} ${obj.price} ₽`;
                        total += +obj.price;
                    }
                });
        }
        document.querySelector(`p[data-cat="none"]`).innerHTML = `${total} ₽`;
    }

}

function deleteProcess() {

    let order = document.querySelectorAll(".order-content > div");
    
    for (let i = 0; i < order.length; i++) {
        if (order.item(i).dataset.dish === 
        event.target.parentNode.dataset.dish) {
            order.item(i).remove();
        }
        
    }

    let chosenMeal = getMealByKeyword(event.target.parentNode.dataset.dish);
    window.localStorage.removeItem(chosenMeal.category);

    changeVisibility();

    deleteFromOrderArray(event.target.parentNode.dataset.dish);

    updatePlacingOrderForm();

}