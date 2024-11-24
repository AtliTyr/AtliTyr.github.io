//let selectedCategories = {};

function verifyOrder() {
    let obj = {};
    for (let i = 0; i < window.localStorage.length; i++) {
        obj[window.localStorage.key(i)] = true;
    }

    let tempCheck = false;
    Object.keys(obj).forEach(function(currentValue) {
        if (obj[currentValue]) {
            tempCheck = true;
            return;
        }
    });
    if (tempCheck == false) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }

    if (obj["soup"] &&
        !(obj["main-course"] ||
            obj["salad"])) {
        return "Выберите главное блюдо/салат/стартер";
    }
    if (obj["salad"] &&
        !(obj["soup"] ||
            obj["main-course"])) {
        return "Выберите суп или главное блюдо";
    } 
    if ((obj["drink"] || obj["dessert"]) &&
        !(obj["main-course"] || 
            obj["soup"] || 
            obj["salad"])) {
        return "Выберите главное блюдо";
    }

    if (!obj["drink"]) {
        return "Выберите напиток";
    }
          

    return "";
}  

let aTag = document.getElementById("checkBeforeChangingLocationRequired");
aTag.addEventListener("click", function(event) {
    event.preventDefault();

    //fillSelectedCategories(selectedCategories);
    let isLocationPossible = verifyOrder();

    if (isLocationPossible === "") {
        location.href = "./placingOrder.html";
    }
});