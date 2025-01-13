"use strict";

let totalCount = 0;

function deleteMainContent() {
    document.getElementsByClassName("products").item(0).innerHTML = "";
    
}

function displayMainContent() {
    let whereToPutElements = document.
        getElementsByClassName("products").item(0);

    totalCount = 0;
    
    if (orderArray.length == 0) {
        let emptyCan = document.createElement("p");
        emptyCan.className = "fs-3";
        emptyCan.innerHTML = `Корзина пуста. Перейдите в 
        <a class="text-decoration-none text-success" href="index.html">
            каталог
        </a>, чтобы добавить товары.`;
        document.getElementsByClassName(`main-content`).item(0)
            .append(emptyCan);
        document.getElementsByClassName("total-count").item(0)
            .innerHTML = `<strong>Итоговая стоимость: 
                0 &#8381;</strong>`;

        return;
    }

    for (let object of orderArray) {
        let newProduct = document.createElement("div");
        newProduct.className = "product-card";
        newProduct.id = `id-${object["id"]}`;

        let productImage = document.createElement("img");
        productImage.src = object["image_url"];
    
        let productName = document.createElement("p");
        productName.innerHTML = object["name"];
    
        let productRating = document.createElement("div");
        productRating.className = "product-rating";
        let productRatingNumber = document.createElement("p");
        productRatingNumber.innerHTML = object["rating"];
        let productRatingStars = document.createElement("div");
        let numberOfFilledStars = Math.round(productRatingNumber.innerHTML);
        for (let i = 0; i != 5; i++) {
            let star = document.createElement("i");
            if (i < numberOfFilledStars) {
                star.className = "bi bi-star-fill";
            } else {
                star.className = "bi bi-star";
            }
            productRatingStars.append(star);
        }
        productRating.append(productRatingNumber);
        productRating.append(productRatingStars);
    
        let productPrice = document.createElement("div");
        productPrice.
            className = "product-price d-flex justify-content-between"; 
        let discountPrice = document.createElement("p");
        if (object["discount_price"] != null) {
            discountPrice.innerHTML = `${object["discount_price"]} &#8381;`;
            
            let actualPrice = document.createElement("p");
            actualPrice.className = "product-old-price";
            actualPrice.innerHTML = `${object["actual_price"]} &#8381;`;
    
            let discountProcent = document.createElement("p");
            discountProcent.className = "product-old-price-discount";
            let procent = 
                (1 - (object["discount_price"] / object["actual_price"])) * 100;
            discountProcent.innerHTML = `${Math.round(procent).toFixed(0)} %`;
    
            productPrice.append(discountPrice);
            productPrice.append(actualPrice);
            productPrice.append(discountProcent);

            totalCount += +object["discount_price"];
        } else {
            discountPrice.innerHTML = `${object["actual_price"]} &#8381;`;
    
            productPrice.append(discountPrice);

            totalCount += +object["actual_price"];
        }
        
        let productAddButton = document.createElement("div");
        let addButton = document.createElement("button");
        addButton.type = "button";
        addButton.className = "btn btn-secondary rounded-4 w-100";
        addButton.innerHTML = "Удалить";
        addButton.addEventListener("click", function(event) {
            deleteProduct(event);
        });
        productAddButton.append(addButton);
    
        newProduct.append(productImage);
        newProduct.append(productName);
        newProduct.append(productRating);
        newProduct.append(productPrice);
        newProduct.append(productAddButton);
    
        whereToPutElements.append(newProduct);
    }
    document.getElementsByClassName("total-count").item(0)
        .innerHTML = `<strong>Итоговая стоимость: 
            ${totalCount ? totalCount + calculateDeliveryPrice(
        document.querySelector(`input[name="delivery_date"]`).value,
        document.querySelector(`select[name="delivery_interval"]`).value
    ) : 0}
             &#8381;</strong>`;
}

displayMainContent();