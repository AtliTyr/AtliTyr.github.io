function changeVisibility() {
    if (window.localStorage.length == 0) {
        document.querySelector(".noMeals").
            style.display = "block";
    } else {
        document.querySelector(".noMeals").
            style.display = "none";
    }   
}

function deleteProcess() {

    let order = document.querySelectorAll(".order-content > div");
    console.dir(order);
    for (let i = 0; i < order.length; i++) {
        if (order.item(i).dataset.dish === 
        event.target.parentNode.dataset.dish) {
            order.item(i).remove();
        }
        
    }

    let chosenMeal = getMealByKeyword(event.target.parentNode.dataset.dish);
    window.localStorage.removeItem(chosenMeal.category);

    deleteFromOrderArray(event.target.parentNode.dataset.dish);

    changeVisibility();

}