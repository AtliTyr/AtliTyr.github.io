let sortType = "rating-desc";

document.querySelector(`.header-of-catalog select`).
    addEventListener("change", function (event) {
        sortType = event.currentTarget.value;
        deleteMainContent();
        displayMainContent();
    });