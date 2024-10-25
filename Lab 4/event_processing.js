let selectedSoup;
let selectedMain_course;
let selectedBeverages;
let total;

function ev_process() {
    switch(event.target.parentNode.parentNode.id)
    {
        case 'soup':
            function soups_click() {
                if(selectedSoup)
                {
                    selectedSoup.style.border = '2px solid transparent';
                    if(selectedSoup.dataset.dish === event.target.parentNode.dataset.dish)
                    {
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
                if(selectedMain_course)
                    {
                        selectedMain_course.style.border = '2px solid transparent';
                        if(selectedMain_course.dataset.dish === event.target.parentNode.dataset.dish)
                        {
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
                if(selectedBeverages)
                    {
                        selectedBeverages.style.border = '2px solid transparent';
                        if(selectedBeverages.dataset.dish === event.target.parentNode.dataset.dish)
                        {
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
    }
}

function updateOrderInfo()
{
    total = 0;

    let form = document.getElementsByClassName('updatable_info');
    if(selectedSoup) {
        let obj = searchByKeyword(selectedSoup.dataset.dish);
        form.item(0).innerHTML = `${obj.name} ${obj.price}`;
        let order_price = (obj.price).substring(0, obj.price.length - 1);
        total += +order_price;
    } else {
        form.item(0).innerHTML = `Суп не выбран`;
    }

    if(selectedMain_course) {
        let obj = searchByKeyword(selectedMain_course.dataset.dish);
        form.item(1).innerHTML = `${obj.name} ${obj.price}`;

        let order_price = (obj.price).substring(0, obj.price.length - 1); 
        total += +order_price
    } else {
        form.item(1).innerHTML = 'Блюдо не выбрано';
    }

    if(selectedBeverages) {
        let obj = searchByKeyword(selectedBeverages.dataset.dish);
        form.item(2).innerHTML = `${obj.name} ${obj.price}`;

        let order_price = (obj.price).substring(0, obj.price.length - 1); 
        total += +order_price;
    } else {
        form.item(2).innerHTML = 'Напиток не выбран';
    } 

    if(total != 0) {
        form.item(3).innerHTML = `${total} ₽`;
    } else {
        form.item(3).innerHTML = '';
    }

    checkVisibility();
}

function checkVisibility() {
    if(selectedBeverages === undefined && selectedSoup === undefined && selectedMain_course === undefined) 
    {
        document.getElementsByClassName('order_update').item(0).style.display = "none";
        document.getElementsByClassName('nothing-chosen').item(0).style.display = "block";
    }
    else
    {
        document.getElementsByClassName('order_update').item(0).style.display = "block";
        document.getElementsByClassName('nothing-chosen').item(0).style.display = "none";
    }
}