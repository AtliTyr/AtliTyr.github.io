let selectedCategories = {};

async function deleteAllOrdersOnServer() {
    await fetch(`${mainUrl}/orders?api_key=${api_key}`, {
        method: "GET",
        redirect: "follow"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length == 10) {
                data.forEach(function(el) {
                    fetch(`${mainUrl}/orders/${el.id}?api_key=${api_key}`, {
                        method: "DELETE" 
                    });
                });
            } 
        });
}

function verifyOrder() {
    let obj = {};
    for (let i = 0; i < window.localStorage.length; i++) {
        obj[window.localStorage.key(i)] = true;
    }

    let tempCheck = false;
    Object.keys(obj).forEach(function(currentValue) {
        if (obj[currentValue]) {
            tempCheck = true;
            return;
        }
    });
    if (tempCheck == false) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }

    if (obj["soup"] &&
        !(obj["main-course"] ||
            obj["salad"])) {
        return "Выберите главное блюдо/салат/стартер";
    }
    if (obj["salad"] &&
        !(obj["soup"] ||
            obj["main-course"])) {
        return "Выберите суп или главное блюдо";
    } 
    if ((obj["drink"] || obj["dessert"]) &&
        !(obj["main-course"] || 
            obj["soup"] || 
            obj["salad"])) {
        return "Выберите главное блюдо";
    }

    if (!obj["drink"]) {
        return "Выберите напиток";
    }
          

    return "";
}  

function prepareFormForPost(form) {
    const formData = new FormData(event.target);

    if (window.localStorage.getItem("soup") !== null) {
        formData.append("soup_id", 
            window.localStorage.getItem("soup")); 
    }
    if (window.localStorage.getItem("main-course") !== null) {
        formData.append("main_course_id", 
            window.localStorage.getItem("main-course")); 
    }
    if (window.localStorage.getItem("salad") !== null) {
        formData.append("salad_id", 
            window.localStorage.getItem("salad")); 
    }
    if (window.localStorage.getItem("drink") !== null) {
        formData.append("drink_id", 
            window.localStorage.getItem("drink")); 
    }
    if (window.localStorage.getItem("dessert") !== null) {
        formData.append("dessert_id", 
            window.localStorage.getItem("dessert")); 
    }

    if (formData.get("subscribe") == "on") {
        formData.set("subscribe", 1);
    } else {
        formData.set("subscribe", 0);
    }

    return formData;
}

document.querySelector(".placeForm").
    addEventListener('submit', function(event) {
        event.preventDefault();

        let res = verifyOrder();

        if (res != "") {
        
            const notificationMessage = document.
                querySelector('.notification p');
            notificationMessage.innerHTML = res;
        
            const notification = document.getElementById('notification');
            notification.style.display = 'block'; // Показываем уведомление
        
            const okButton = document.getElementById('okButton');
            okButton.onclick = function() {
                notification.style.display = 'none'; // Скрываем уведомление
            };
        } else {
            let formData = prepareFormForPost(event.target);

            let url = `${mainUrl}/orders`;

            fetch(`${url}?api_key=${api_key}`, {
                method: "POST",
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        switch (response.status.toString()) {
                        case "422":
                            deleteAllOrdersOnServer();
                            throw new Error(
                                `Вероятно, уже создано макс.число заказов!`);
                    
                        }
                        throw new Error(
                            `${response.status}`);
                    }
                    alert("Заказ успешно сформирован!");
                    window.localStorage.clear();
                    window.location.reload();
                    return response.json();
                })
                .catch(error => {
                    alert(`Ошибка оформления заказа! \n ${error} `);
                }); 
        }
        // TypeError Failed to fetch - при отсутствии интернета
        /*
        id	                Integer		Да	Устанавливается сервером
        full_name	        String	Да		
        email	            String	Да	
        subscribe	        Boolean	Нет		Допустимы значения 0 и 1.
        phone	            String	Да		
        delivery_address	String	Да		
        delivery_type	    String	Да		Допустимы значения "now" и "by_time"
        delivery_time	    Time	Да		Значение передаётся в формате HH:MM.
        comment	            String	Нет		
        soup_id	            Integer	Да		
        main_course_id	    Integer	Да		
        salad_id	        Integer	Да		
        drink_id	        Integer	Да		
        dessert_id	        Integer	Да		
        created_at	        DateTime		Да	Устанавливается сервером.
        updated_at	        DateTime		Да	Устанавливается сервером.
        student_id	        Integer		Да	Устанавливается сервером.
        */
    });