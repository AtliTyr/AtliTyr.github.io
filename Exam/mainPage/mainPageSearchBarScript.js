"use strict";

let searchParameter;

let searchForm = document.querySelector(".navbar-collapse form");
searchForm.
    addEventListener("submit", function(event) {
        searchParameter = document.
            querySelector(".navbar-collapse input").value;
        event.preventDefault();
        deleteMainContent();
        displayMainContent();
    });