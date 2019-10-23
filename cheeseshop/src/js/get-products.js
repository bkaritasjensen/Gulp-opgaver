document.addEventListener("DOMContentLoaded", () =>{

	fetch("/data/products.json")
		.then(response => response.json())//Behøver ikke skrive return, hvis der ikke bruges {}
		.then(function (data){
			console.log(data);
		})

});