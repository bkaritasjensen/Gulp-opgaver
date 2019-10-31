document.addEventListener("DOMContentLoaded", () =>{

	const params = new URLSearchParams(window.location.search); //Henter id'et fra URL'en
	const skuId = params.get('sku');//Tager fat i id'en fra params
	const db = firebase.firestore(); //Laver variabel til Firebase-firestore, en metode som ligger inde i et objekt.
	let docRef = db.collection("Wine").doc(skuId);//Henter id'en/varenummeret fra collection inde på Firestore

	

	document.querySelector(".rating").addEventListener("click", function(e){
		const smileys = parseInt(e.target.dataset.rating);

		docRef.collection("ratings")//Tager fat i collections - ratings.
			.doc("rating")//Tager fat i dokumentet rating fra Firestore.
			.update({//Hvad er det for en nøgle jeg gerne vil opdatere.
				usersRated: firebase.firestore.FieldValue.increment(1),//Dette er en metode som ikke er inde i et objekt, så derfor kan jeg ikke bare skrive db., men istedet skrive firebase.firestore
				totalSmileys: firebase.firestore.FieldValue.increment(smileys)
			});
			//console.log(1, smileys)
		/* 	.get()//Henter det.
			.then(function(doc){//Så laver jeg en function med det.
				doc.data()
			}) */
	});
	
	docRef.collection("ratings")
		.doc("rating")
		.get()
		.then(function(doc){
			//console.log(doc.data())
			const usersRated = doc.data().usersRated;
			const totalSmileys = doc.data().totalSmileys;
			const avage = totalSmileys / usersRated; //divider antal point med antal stemmer.
			const productShow = document.querySelector(".product_mainSection");

			productShow.querySelector("h3").innerText = avage.toFixed(1);//toFixed bestemmer man hvor mange dicimaler man vil have på, dette tilfælde kun et.
		})



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
	});

});

