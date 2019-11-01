document.addEventListener("DOMContentLoaded", () =>{

	const cardTemplate = document.getElementById("cardTemplate");//ID loader direkte fra scoop, altså oploades hurtigere.
	const list = document.getElementsByClassName("cardList")[0]; //getElementsB...... er en Node list.
	const path = window.location.pathname.replace(/\//g,'').replace("s", "");
	const db = firebase.firestore();

	db.collection(path).get().then(function(querySnapshot){
		querySnapshot.forEach(function(doc) {
			//console.log(doc.id, " => ", doc.data());// Ser data'en i consolen 
			const clone = cardTemplate.content.cloneNode(true); //Henter alt det inde for cardTemplate. Man bibeholder de orginale tags i html'en derfor skriver man true.
			
			console.log(doc.data())
			clone.querySelector("h1").innerText = doc.data().name;//Fordi det ikke er html man lægger ind men tekst.
			clone.querySelector("img").src = `/assets/images/${doc.data().image[0]}`;//[0] fordi det er en array og det er det første element i arrayet der bliver valgt & src fordi det er en billede der skal hentes.
			clone.querySelector("p").innerText = doc.data().description[0]; 
			clone.querySelector(".price").innerText = doc.data().price;
			if(clone.querySelector(".country")!= undefined)clone.querySelector(".country").innerText = doc.data().country;
			if(clone.querySelector(".region")!= undefined)clone.querySelector(".region").innerText = doc.data().region;
			clone.querySelector(".category").innerText = doc.data().category;
			clone.querySelector("a").href = `/${path}/?sku=${doc.id}`;

			list.appendChild(clone);
		}); 

		
	})

});