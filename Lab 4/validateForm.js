document.forms.item(0).addEventListener("submit", function(event) {
    if (selectedBeverages === undefined || 
        selectedSoup === undefined || 
        selectedMain_course === undefined) { 
        event.preventDefault();
        alert('Заказ не полный');
    }   
});