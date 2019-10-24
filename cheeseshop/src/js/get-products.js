document.addEventListener("DOMContentLoaded", () =>{

	let params = new URLSearchParams(document.location.search);
	const categoryName = parseInt (params.get("destination_id"));
	let mainElement = document.querySelector("#cardTemplate");

	fetch("/data/products.json")
		.then(response => response.json())//Behøver ikke skrive return, hvis der ikke bruges {}
		.then(function (data){
			 console.log(data)
		});
});