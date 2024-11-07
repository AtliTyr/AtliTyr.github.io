let soupIcon = {
    pathToImage: "icons/soup.png",
    label: "Суп"
};

let mainCourseIcon = {
    pathToImage: "icons/main.png",
    label: "Главное блюдо"
};

let saladIcon = {
    pathToImage: "icons/salad.png",
    label: "Салат"
};

let desertIcon = {
    pathToImage: "icons/desert.png",
    label: "Десерт"
};

let drinkIcon = {
    pathToImage: "icons/drink.png",
    label: "Напиток"
};

function createComboPart(comboObject) {
    let temp = document.createElement("div");
    temp.className = "combo_part";

    if (comboObject.label === "Десерт") {
        temp.innerHTML = `<img src="${comboObject.pathToImage}">
                          <p>${comboObject.label}</p>
                          <p class="desert_clarify">
                          (Можно добавить к любому заказу)
                          </p>
                         `;
    } else {
        temp.innerHTML = `<img src="${comboObject.pathToImage}">
                          <p>${comboObject.label}</p>
                         `;
    }
    return temp;
}

let availableCombos = [];
availableCombos[0] = ["soup", "main", "salad", "drink"];
availableCombos[1] = ["soup", "main", "drink"];
availableCombos[2] = ["soup", "salad", "drink"];
availableCombos[3] = ["main", "salad", "drink"];
availableCombos[4] = ["main", "drink"];
availableCombos[5] = ["desert"];

let comboContainer = document.getElementsByClassName("combos").item(0);

availableCombos.forEach(function(currentValue, currentIndex) {
    let singleCombo = document.createElement("div");
    singleCombo.className = "single_combo";
    singleCombo.id = `combo_${currentIndex + 1}`;    
    comboContainer.append(singleCombo);

    currentValue.forEach(function(currentValue) {
        let icon;
        switch (currentValue) {
        case 'soup':
            icon = soupIcon;
            break;
        case 'main':
            icon = mainCourseIcon;
            break;
        case 'salad':
            icon = saladIcon;
            break;
        case 'drink':
            icon = drinkIcon;
            break;
        case 'desert':
            icon = desertIcon;
            break;
        }
        singleCombo.append(createComboPart(icon));
    });
});