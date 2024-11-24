let aTag = document.getElementById("checkBeforeChangingLocationRequired");
aTag.addEventListener("click", function(event) {
    event.preventDefault();

    fillSelectedCategories();
    let isLocationPossible = verifyOrder();

    if (isLocationPossible === "") {
        location.href = "./placingOrder.html";
    }
});