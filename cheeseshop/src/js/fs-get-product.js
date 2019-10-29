document.addEventListener("DOMContentLoaded", () =>{

	const params = new URLSearchParams(window.location.search); //Henter id'et fra URL'en
	const skuId = params.get('sku');//Tager fat i id'en fra params
	
	const db = firebase.firestore();
	
	var docRef = db.collection("Wine").doc(skuId);
	
	docRef.get().then(function(doc){
		if(doc != skuId){
			//console.log("hej med dig") 
			const productShow = document.querySelector(".product_mainSection");

			productShow.querySelector("h1").innerText = doc.data().name;
			productShow.querySelector(".imageBig").src = `/assets/images/${doc.data().image}`;
			productShow.querySelector(".price").innerText = doc.data().price;
			productShow.querySelector(".country").innerText = doc.data().country;
			productShow.querySelector(".region").innerText = doc.data().region;
			productShow.querySelector(".category").innerText = doc.data().category;
		}
	});
});

/* 	fetch("/data/products.json")
		.then (response => response.json())
		.then (function (data){
			
			data.forEach(function (product) {
				const sku = new URL(window.location).searchParams.get("sku");//laver variabel som henter en ny url til den nuværende "sku"=........
				if(product.sku === sku ) {//Hvis product.sku er lig med sku.
					
					const productShow = document.querySelector(".product_mainSection")//laver variabel til ydre box af enkelt product visning.

					productShow.querySelector("h1").innerText = product.navn;
					productShow.querySelector("p").innerText = product.beskrivelse;
					productShow.querySelector(".imageBig").src = `/assets/images/${product.billeder[0]}`;
					productShow.querySelector(".price").innerText = product.pris;
					productShow.querySelector(".weight").innerText = product.vægt;
					productShow.querySelector(".country").innerText = product.land;
					productShow.querySelector(".product_imageSmall1").src = `/assets/images/${product.billeder[1]}`;
					productShow.querySelector(".product_imageSmall2").src = `/assets/images/${product.billeder[2]}`;
					productShow.querySelector(".product_imageSmall3").src = `/assets/images/${product.billeder[3]}`;

				}
			});
		}); */