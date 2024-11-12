"use strict";

function Order(keyword, name, price, category, count, image, kind) {
    this.keyword = keyword;
    this.name = name;
    this.price = price;
    this.category = category;
    this.count = count;
    this.image = `order_images/${image}`;
    this.kind = kind;
    return this;
}

let orderArray = [];

// Супы

orderArray.push(new Order(
    'gazpacho', 
    'Гаспачо', 
    '195₽', 
    'soups', 
    '350г', 
    'soups/gazpacho.jpg',
    'veg'));

orderArray.push(new Order(
    'mushroom_soup', 
    'Грибной суп-пюре', 
    '185₽', 
    'soups', 
    '330г', 
    'soups/mushroom_soup.jpg',
    'veg'));

orderArray.push(new Order(
    'norwegian_soup', 
    'Норвежский суп', 
    '270₽', 
    'soups', 
    '330г', 
    'soups/norwegian_soup.jpg',
    'fish'));

orderArray.push(new Order(
    'chicken', 
    'Куриный суп', 
    '330₽', 
    'soups', 
    '350г', 
    'soups/chicken.jpg',
    'meat'));

orderArray.push(new Order(
    'ramen', 
    'Рамен', 
    '375₽', 
    'soups', 
    '425г', 
    'soups/ramen.jpg',
    'meat'));

orderArray.push(new Order(
    'tomyum', 
    'Том ям с креветками', 
    '650₽', 
    'soups', 
    '500г', 
    'soups/tomyum.jpg',
    'fish'));

// Главные блюда

orderArray.push(new Order(
    'friedpotatoeswithmushrooms', 
    'Жареная картошка с грибами', 
    '150₽', 'main_courses', 
    '250г', 
    'main_course/friedpotatoeswithmushrooms1.jpg',
    'veg'));

orderArray.push(new Order(
    'lasagna', 
    'Лазанья', 
    '385₽', 
    'main_courses', 
    '310г', 
    'main_course/lasagna.jpg',
    'meat'));

orderArray.push(new Order(
    'chickencutletsandmashedpotatoes', 
    'Котлеты из курицы с картофельным пюре', 
    '225₽', 
    'main_courses', 
    '280г', 
    'main_course/chickencutletsandmashedpotatoes.jpg',
    'meat'));

orderArray.push(new Order(
    'fishrice', 
    'Рыбная котлета с рисом и спаржей', 
    '320₽', 
    'main_courses', 
    '270г', 
    'main_course/fishrice.jpg',
    'fish'));
    
orderArray.push(new Order(
    'pizza', 
    'Пицца Маргарита', 
    '450₽', 
    'main_courses', 
    '470г', 
    'main_course/pizza.jpg',
    'veg'));
    
orderArray.push(new Order(
    'shrimppasta', 
    'Паста с креветками', 
    '340₽', 
    'main_courses', 
    '280г', 
    'main_course/shrimppasta.jpg',
    'fish'));

// Напитки

orderArray.push(new Order(
    'orangejuice', 
    'Апельсиновый сок', 
    '120₽', 
    'beverages', 
    '300мл', 
    'beverages/orangejuice.jpg',
    'cold'));

orderArray.push(new Order(
    'applejuice', 
    'Яблочный сок', 
    '90₽', 
    'beverages', 
    '300мл', 
    'beverages/applejuice.jpg',
    'cold'));

orderArray.push(new Order(
    'carrotjuice', 
    'Морковный сок', 
    '110₽', 
    'beverages', 
    '300мл', 
    'beverages/carrotjuice.jpg',
    'cold'));

orderArray.push(new Order(
    'cappuccino', 
    'Капучино', 
    '180₽', 
    'beverages', 
    '300мл', 
    'beverages/cappuccino.jpg',
    'hot'));
        
orderArray.push(new Order(
    'greentea', 
    'Зеленый чай', 
    '100₽', 
    'beverages', 
    '300мл', 
    'beverages/greentea.jpg',
    'hot'));
    
orderArray.push(new Order(
    'tea', 
    'Черный чай', 
    '90₽', 
    'beverages', 
    '300мл', 
    'beverages/tea.jpg',
    'hot'));

// Салаты и стартеры

orderArray.push(new Order(
    'caesar',
    'Цезарь с цыпленком',
    '370₽',
    'salads_starters',
    '220г',
    'salads_starters/caesar.jpg',
    'meat'));

orderArray.push(new Order(
    'caprese.jpg',
    'Капрезе с моцареллой',
    '350₽',
    'salads_starters',
    '235г',
    'salads_starters/caprese.jpg',
    'veg'));

orderArray.push(new Order(
    'frenchfries1',
    'Картофель фри с соусом Цезарь',
    '280₽',
    'salads_starters',
    '235г',
    'salads_starters/frenchfries1.jpg',
    'veg'));

orderArray.push(new Order(
    'frenchfries2',
    'Картофель фри с кетчупом',
    '260₽',
    'salads_starters',
    '235г',
    'salads_starters/frenchfries2.jpg',
    'veg'));

orderArray.push(new Order(
    'saladwithegg',
    'Корейский салат с овощами и яйцом',
    '330₽',
    'salads_starters',
    '250г',
    'salads_starters/saladwithegg.jpg',
    'veg'));

orderArray.push(new Order(
    'tunasalad',
    'Салат с тунцом',
    '480₽',
    'salads_starters',
    '250г',
    'salads_starters/tunasalad.jpg',
    'fish'));

// Десерты

orderArray.push(new Order(
    'baklava',
    'Пахлава',
    '220₽',
    'desserts',
    '300 гр',
    'desserts/baklava.jpg',
    'medium'));

orderArray.push(new Order(
    'checheesecake',
    'Чизкейк',
    '240₽',
    'desserts',
    '125 гр',
    'desserts/checheesecake.jpg',
    'small'));

orderArray.push(new Order(
    'chocolatecake',
    'Шоколадный торт',
    '270₽',
    'desserts',
    '140 гр',
    'desserts/chocolatecake.jpg',
    'small'));

orderArray.push(new Order(
    'chocolatecheesecake',
    'Шоколадный чизкейк',
    '260₽',
    'desserts',
    '125 гр',
    'desserts/chocolatecheesecake.jpg',
    'small'));

orderArray.push(new Order(
    'donuts',
    'Пончики (6 штук)',
    '650₽',
    'desserts',
    '700 гр',
    'desserts/donuts.jpg',
    'large'));

orderArray.push(new Order(
    'donuts2',
    'Пончики (3 штуки)',
    '410₽',
    'desserts',
    '350 гр',
    'desserts/donuts2.jpg',
    'medium'));

    
orderArray.sort((a, b) => (a.name > b.name) ? 1 : a.name === b.name ? 0 : -1);

function searchByKeyword(keyword) {
    for (let obj of orderArray) {
        if (obj.keyword === keyword) {
            return obj;
        }
    }
    return undefined;
}