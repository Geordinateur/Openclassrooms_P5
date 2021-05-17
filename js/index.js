document.getElementsByTagName("h2")[0].textContent += titlePage;

function getContent(content) {
	fetch("http://localhost:3000/api/" + content)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
		})
		.then(function (value) {
			for (let i in value) {
				createElementListing(
					value[i].name,
					i,
					value[i].imageUrl,
					value[i].price
				);
			}
		})
		.catch(function (err) {
			// Une erreur est survenue
		});
}

function createElementListing(name, id, img, price) {
	const divElement = document.createElement("a");
	divElement.setAttribute("class", "clearfix d-block mb-3");
	divElement.setAttribute(
		"href",
		"produit.html?content=" + content + "&id=" + id
	);
	const titleElement = document.createElement("h4");
	titleElement.textContent = name;
	const priceElement = document.createElement("p");
	priceElement.textContent = centsToEuros(price);
	const imgElement = document.createElement("img");
	imgElement.setAttribute("src", img);
	imgElement.setAttribute("class", "img-element float-left img-thumbnail mr-2");
	//
	const div = document.getElementById("listing").appendChild(divElement);
	div.appendChild(imgElement);
	div.appendChild(titleElement);
	div.appendChild(priceElement);
}

getContent(content);
