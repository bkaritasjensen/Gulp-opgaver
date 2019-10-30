document.addEventListener("DOMContentLoaded", () =>{

	const params = new URLSearchParams(window.location.search); //Henter id'et fra URL'en
	const skuId = params.get('sku');//Tager fat i id'en fra params
	
	const db = firebase.firestore();
	
	var docRef = db.collection("Wine").doc(skuId);
	
	docRef.get().then(function(doc){
		if(doc.exists){
			const productShow = document.querySelector(".product_mainSection");

			productShow.querySelector("h1").innerText = doc.data().name;
			productShow.querySelector("p").innerText = doc.data().description;
			productShow.querySelector(".imageBig").src = `/assets/images/${doc.data().image[0]}`;
			productShow.querySelector(".price").innerText = doc.data().price;
			productShow.querySelector(".country").innerText = doc.data().country;
			productShow.querySelector(".region").innerText = doc.data().region;
			productShow.querySelector(".category").innerText = doc.data().category;

			const imageBox = productShow.querySelector(".product_smallImages");
			const imageTemplate = document.getElementById("galleryTemplate");
	
			doc.data().image.forEach(element => {
				const clone = imageTemplate.content.cloneNode(true);
				
				clone.querySelector("img").src = `/assets/images/${element}`;
				imageBox.appendChild(clone);
			});

			imageBox.querySelectorAll("img").forEach(function (img){
				img.addEventListener("click", function (){
					document.querySelector(".imageBig").src = this.src;
					if(this === imageTemplate){
						imageTemplate.style.display = this.none;

					}
				})
			})
		}else{
			document.querySelector(".product_mainSection").innerHTML = "Produktet findes ikke!"
		}

		//Math.random til varer der kunne være interessant for kunden
		
		
	});

});

