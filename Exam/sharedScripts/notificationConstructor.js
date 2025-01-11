function notificationConstructor(notificationMessage) {
    let notification = document.createElement("notification");
    notification.className = 
        "d-flex justify-content-between p-3 bg-success-subtle";
    
    let notificationMessageElement = document.createElement("p");
    notificationMessageElement.innerHTML = notificationMessage;

    let notificationCloseIconContainer = document.createElement("div");
    notificationCloseIconContainer.id = "closeNotification";
    notificationCloseIconContainer.addEventListener("click", function(event) {
        event.currentTarget.parentNode.remove();
    });
    let notificationCloseIcon = document.createElement("svg");
    notificationCloseIcon.xmlns = "http://www.w3.org/2000/svg";
    notificationCloseIcon.width = "22";
    notificationCloseIcon.height = "22";
    notificationCloseIcon.fill = "currentColor";
    notificationCloseIcon.className = "bi bi-x-lg";
    notificationCloseIcon.viewBox = "0 0 16 16";
    notificationCloseIcon.innerHTML = `<path d="M2.146 2.854a.5.5 0 1 1 
        .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 
        5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 
        1-.708-.708L7.293 8z"/>`;

    notification.append(notificationMessageElement);
    notificationCloseIconContainer.append(notificationCloseIcon);
    notification.append(notificationCloseIconContainer);

    let documentMain = document.
        getElementsByTagName("main").item(0).children.item(0);
    document.getElementsByTagName("main").item(0)
        .insertBefore(notification, documentMain);

    setTimeout(() => {
        //if (notification.parentNode != null) {
        //    notification.remove();
        //}
        notification.remove();
    }, 12000);
}