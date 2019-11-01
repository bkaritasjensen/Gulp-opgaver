document.addEventListener("DOMContentLoaded", () =>{

	const params = new URLSearchParams(window.location.search);//Henter id'et fra URL'en
	const path = window.location.pathname.replace(/\/+$/, '');
	const skuId = params.get('sku');//Tager fat i id'en fra params
	const db = firebase.firestore(); //Laver variabel til Firebase-firestore, en metode som ligger inde i et objekt.
	//const skuS = path + "s";

	let docRef = db.collection(path).doc(skuId);//Henter id'en/varenummeret fra collection inde på Firestore
	console.log(docRef)

	//console.log(params)

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
		.onSnapshot(function(doc){//Opdatere data'en når der laves ændringer. Replacer .get() & .then(function(doc){})
			const usersRated = doc.data().usersRated;
			const totalSmileys = doc.data().totalSmileys;
			const avage = totalSmileys / usersRated; //divider antal point med antal stemmer.
			const productShow = document.querySelector(".product_mainSection");
			//console.log(doc.data())

			if(usersRated == 0){
				productShow.querySelector("h3").innerText = 0.0;
			}else{
				console.log(avage)
				productShow.querySelector("h3").innerText = avage.toFixed(1);//toFixed bestemmer man hvor mange dicimaler man vil have på, dette tilfælde kun et.
			}
		});


	docRef.get().then(function(doc){
		if(doc.exists){
			const productShow = document.querySelector(".product_mainSection");

			if(productShow.querySelector("h1")!= undefined)productShow.querySelector("h1").innerText = doc.data().name;
			if(productShow.querySelector("p")!= undefined)productShow.querySelector("p").innerText = doc.data().description;
			if(productShow.querySelector(".imageBig")!= undefined)productShow.querySelector(".imageBig").src = `/assets/images/${doc.data().image[0]}`;
			if(productShow.querySelector(".price")!= undefined)productShow.querySelector(".price").innerText = doc.data().price;
			if(productShow.querySelector(".country")!= undefined)productShow.querySelector(".country").innerText = doc.data().country;
			if(productShow.querySelector(".region")!= undefined)productShow.querySelector(".region").innerText = doc.data().region;
			if(productShow.querySelector(".category")!= undefined)productShow.querySelector(".category").innerText = doc.data().category;

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

