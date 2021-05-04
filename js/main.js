let str = window.location.href;
let url = new URL(str);
let content = url.searchParams.get("content");
let id = url.searchParams.get("id");

if(!content && !id) {
	console.log("rien a afficher");
} else {
	titlePage = content.charAt(0).toUpperCase() + content.substring(1).toLowerCase();
	document.getElementById('title').textContent += titlePage;
	if(id) {
		getArticle(content, id);
	} else {
		getContent(content);
	}
}

////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////

	function getContent(content) {
		fetch('http://localhost:3000/api/' + content)
			.then(function(response) {
				if(response.ok) {
					return response.json();
				}
			})
			.then(function(value) {
				for(let i in value) {
					createElementListing(value[i].name, i, value[i].imageUrl, value[i].price);
				}
			})
			.catch(function(err) {
				// Une erreur est survenue
			});
	}

function getArticle(content, id) {
	fetch('http://localhost:3000/api/' + content)
		.then(function(response) {
			if(response.ok) {
				return response.json();
			}
		})
		.then(function(value) {
			document.getElementById('title').textContent += " >> " + value[id].name;
			createElementArticle(value[id].name, id, value[id].imageUrl, value[id].price, value[id].description, value[id].colors);
		})
		.catch(function(err) {
			// erreur
		});
}

function centsToEuros(number) {
	euros = number / 100;
	return euros.toFixed(2) + " euros";
}

function createElementListing(name, id, img, price) {
	const divElement = document.createElement('a');
	divElement.setAttribute("class", "clearfix d-block mb-3");
	divElement.setAttribute("href", "index.html?content=" + content  + "&id=" + id);
	const titleElement = document.createElement('h4');
	titleElement.textContent = name;
	const priceElement = document.createElement('p');
	priceElement.textContent = centsToEuros(price);
	const imgElement = document.createElement('img');
	imgElement.setAttribute("src", img);
	imgElement.setAttribute("class", "img-element float-left img-thumbnail mr-2");
	const div = document.getElementById('listing').appendChild(divElement);
	div.appendChild(imgElement);
	div.appendChild(titleElement);
	div.appendChild(priceElement);
}

function createElementArticle(name, id, img, price, description, color) {
	console.log(name);
	const divArticle = document.createElement('div');
	const titleArticle = document.createElement('h3');
	titleArticle.textContent = name;
	const priceArticle = document.createElement('price');
	const imgArticle = document.createElement('img');
	const colorArticle = document.createElement('');
	
	const div = document.getElementById('listing').appendChild(divArticle);
	div.appendChild(titleArticle);
}
