document.forms.item(0).addEventListener("submit", function(event) {
    if (selectedBeverages === undefined && 
        selectedSoup === undefined && 
        selectedMain_course === undefined &&
        selectedDessert === undefined &&
        selectedSalads_starters === undefined) { 
        event.preventDefault();
        alert('Закажи что-нибудь! -_-');
    }   
});