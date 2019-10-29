document.addEventListener("DOMContentLoaded", () =>{

	const params = new URLSearchParams(window.location.search); //Henter id'et fra URL'en
	const skuId = params.get('sku');//Tager fat i id'en fra params
	
	const db = firebase.firestore();
	
	var docRef = db.collection("Wine").doc(skuId);
	
	docRef.get().then(function(doc){
		if(doc != skuId){
			const productShow = document.querySelector(".product_mainSection");

			productShow.querySelector("h1").innerText = doc.data().name;
			productShow.querySelector(".imageBig").src = `/assets/images/${doc.data().image}`;
			productShow.querySelector("p").innerText = doc.data().description;
			productShow.querySelector(".price").innerText = doc.data().price;
			productShow.querySelector(".country").innerText = doc.data().country;
			productShow.querySelector(".region").innerText = doc.data().region;
			productShow.querySelector(".category").innerText = doc.data().category;
		}
	});
});
