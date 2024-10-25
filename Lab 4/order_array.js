function Order(keyword, name, price, category, count, image) {
    this.keyword = keyword;
    this.name = name;
    this.price = price;
    this.category = category;
    this.count = count;
    this.image = `order_images/${image}`;
    return this;
}

function searchByKeyword(keyword) {
    for(let obj of orderArray)
    {
        if(obj.keyword === keyword)
        {
            return obj;
        }
    }
    return undefined;
}

let orderArray = Array();

orderArray.push(new Order('gazpacho', 'Гаспачо', '195₽', 'soups', '350г', 'soups/gazpacho.jpg'));
orderArray.push(new Order('mushroom_soup', 'Грибной суп-пюре', '185₽', 'soups', '330г', 'soups/mushroom_soup.jpg'));
orderArray.push(new Order('norwegian_soup', 'Норвежский суп', '270₽', 'soups', '330г', 'soups/norwegian_soup.jpg'));
orderArray.push(new Order('friedpotatoeswithmushrooms', 'Жареная картошка с грибами', '150₽', 'main_courses', '250г', 'main_course/friedpotatoeswithmushrooms1.jpg'));
orderArray.push(new Order('lasagna', 'Лазанья', '385₽', 'main_courses', '310г', 'main_course/lasagna.jpg'));
orderArray.push(new Order('chickencutletsandmashedpotatoes', 'Котлеты из курицы с картофельным пюре', '225₽', 'main_courses', '280г', 'main_course/chickencutletsandmashedpotatoes.jpg'));
orderArray.push(new Order('orangejuice', 'Апельсиновый сок', '120₽', 'beverages', '300мл', 'beverages/orangejuice.jpg'));
orderArray.push(new Order('applejuice', 'Яблочный сок', '90₽', 'beverages', '300мл', 'beverages/applejuice.jpg'));
orderArray.push(new Order('carrotjuice', 'Морковный сок', '110₽', 'beverages', '300мл', 'beverages/carrotjuice.jpg'));

orderArray.sort((a, b) => (a.name > b.name) ? 1 : a.name === b.name ? 0 : -1);