"use strict";

document.addEventListener("DOMContentLoaded", function () {
  fetch("/data/products.json").then(function (response) {
    return response.json();
  }) //Behøver ikke skrive return, hvis der ikke bruges {}
  .then(function (data) {
    //console.log(data)
    var cardTemplate = document.getElementById("cardTemplate"); //ID loader direkte fra scoop, altså oploades hurtigere.

    var list = document.getElementsByClassName("cardList")[0]; //getElementsB...... er en Node list.

    data.forEach(function (product) {
      //I data'en henter den for hvert product.
      //console.log(product);
      var clone = cardTemplate.content.cloneNode(true); //Henter alt det inde for cardTemplate. Man bibeholder de orginale tags i html'en derfor skriver man true.

      clone.querySelector("h1").innerText = product.navn; //Fordi det ikke er html man lægger ind men tekst.

      clone.querySelector("p").innerText = product.beskrivelse[0];
      clone.querySelector("img").src = product.billeder[0]; //[0] fordi det er en array og det er det første element i arrayet der bliver valgt & src fordi det er en billede der skal hentes.

      clone.querySelector(".price").innerText = product.pris;
      clone.querySelector(".weight").innerText = product.vægt;
      clone.querySelector(".country").innerText = product.land;
      clone.querySelector("a").href = "/product/?sku=".concat(product.sku); //laver stivej fra hvert enkelt læs mere link, til hvert enkelt produkt. da stivejen i browseren tilføjer ?sku=xxxxxx, varenr. for hvert produkt.

      list.appendChild(clone);
    });
  });
});