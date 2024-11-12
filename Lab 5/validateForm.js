"use strict";

document.forms.item(0).addEventListener("submit", function(event) {
    if (selectedBeverages === undefined && 
        selectedSoup === undefined && 
        selectedMainCourse === undefined &&
        selectedDessert === undefined &&
        selectedSaladsStarters === undefined) { 
        event.preventDefault();
        alert('Закажи что-нибудь! -_-');
    }   
});