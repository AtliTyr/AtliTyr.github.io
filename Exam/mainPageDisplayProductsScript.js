"use strict";

function isPriceFitInInterval(priceFrom, priceTo, price) {
    if (priceFrom != undefined && priceTo == undefined) {
        return +price >= +priceFrom;
    }
    if (priceFrom == undefined && priceTo != undefined) {
        return +price <= +priceTo;
    }
    if (priceFrom == undefined && priceTo == undefined) {
        return true;
    }
    if (priceFrom != undefined && priceTo != undefined) {
        return +priceFrom <= +price && +price <= +priceTo;
    }
}

function deleteMainContent() {
    document.getElementsByClassName("products").item(0).innerHTML = "";
}

function displayMainContent() {
    let whereToPutElements = document.
        getElementsByClassName("products").item(0);

    for (let object of productArray) {
        if (searchParameter != undefined) {
            let result = 
                object["name"].toUpperCase().
                    indexOf(searchParameter.toUpperCase(), 0);
            if (result === -1) {
                continue;
            }
        }

        if (onlyDiscountProducts === true) {
            if (object["discount_price"] == null) 
                continue;
        } 

        if (!isPriceFitInInterval(priceFrom, priceTo, 
            object["discount_price"] ?? object["actual_price"])) {
            continue;
        }

        let newProduct = document.createElement("div");
        newProduct.className = "product-card";
    
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
        } else {
            discountPrice.innerHTML = `${object["actual_price"]} &#8381;`;
    
            productPrice.append(discountPrice);
        }
        
        let productAddButton = document.createElement("div");
        let addButton = document.createElement("button");
        addButton.type = "button";
        addButton.className = "btn btn-secondary rounded-4 w-100";
        addButton.innerHTML = "Добавить";
        productAddButton.append(addButton);
    
        newProduct.append(productImage);
        newProduct.append(productName);
        newProduct.append(productRating);
        newProduct.append(productPrice);
        newProduct.append(productAddButton);
    
        whereToPutElements.append(newProduct);
    }
}

displayMainContent();
