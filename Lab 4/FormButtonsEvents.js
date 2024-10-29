function fillHiddenInputs() {
    let elems = document.querySelectorAll(".order_update > div > input");

    if (selectedSoup) {
        let obj = searchByKeyword(selectedSoup.dataset.dish);
        elems.item(0).value = `${obj.keyword}`;
    } else {
        elems.item(0).value = ``;
    }
    if (selectedMain_course) {
        let obj = searchByKeyword(selectedMain_course.dataset.dish);
        elems.item(1).value = `${obj.keyword}`;
    } else {
        elems.item(1).value = ``;
    }
    if (selectedBeverages) {
        let obj = searchByKeyword(selectedBeverages.dataset.dish);
        elems.item(2).value = `${obj.keyword}`;
    } else {
        elems.item(2).value = ``;
    }
    if (total)
        elems.item(3).value = total;
    else
        elems.item(3).value = ``;
}

let elem = document.getElementsByClassName("submit_button").item(0);
elem.addEventListener("click", fillHiddenInputs);