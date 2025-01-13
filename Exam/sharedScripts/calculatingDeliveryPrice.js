function calculateDeliveryPrice(date, interval) {
    // date - yyyy-mm-dd
    // interval: 1) 08:00-12:00
    //           2) 12:00-14:00
    //           3) 14:00-18:00
    //           4) 18:00-22:00

    let dayOfTheWeek = new Date(date).toString().split(" ")[0];

    let basePrice = 200;
    
    if (interval == "18:00-22:00") {
        if (dayOfTheWeek == 'Sun' || dayOfTheWeek == 'Sat') {
            basePrice += 300;
        } else {
            basePrice += 200;
        }
    }
    return basePrice;
}