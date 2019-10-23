"use strict";

document.addEventListener("DOMContentLoaded", function () {
  fetch("/data/products.json").then(function (response) {
    return response.json();
  }) //Behøver ikke skrive return, hvis der ikke bruges {}
  .then(function (data) {
    console.log(data);
  });
});