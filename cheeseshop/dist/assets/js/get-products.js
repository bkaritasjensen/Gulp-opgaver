"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(document.location.search);
  var categoryName = parseInt(params.get("destination_id"));
  var mainElement = document.querySelector("#cardTemplate");
  fetch("/data/products.json").then(function (response) {
    return response.json();
  }) //Behøver ikke skrive return, hvis der ikke bruges {}
  .then(function (data) {
    console.log(data);
  });
});