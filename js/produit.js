function getArticle(content, id) {
	fetch("http://localhost:3000/api/" + content)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
		})
		.then(function (value) {
			if(value[id].colors) {
				optionArticle = value[id].colors;
			} else if(value[id].lenses) {
				optionArticle = value[id].lenses;
			} else if(value[id].varnish) {
				optionArticle = value[id].varnish;
			} else { 
				optionArticle = "erreur";
			}
			createElementArticle(
				value[id].name,
				id,
				value[id].imageUrl,
				value[id].price,
				value[id].description,
				optionArticle
			);
			selectOption(optionArticle);
			document.getElementsByTagName("aside")[0].appendChild(btn("Ajouter au panier", JSON.stringify(value[id])));

			console.log('salut');
			btn.addEventListener("click", function(e) {
			});
			console.log('au revoir');


		})
		.catch(function (err) {
			// erreur
		});
}

function createElementArticle(name, id, img, price, description, option) {
	const divArticle = document.createElement("div");
	const titleArticle = document.createElement("h3");
	titleArticle.textContent = name;
	const priceArticle = document.createElement("p");
	priceArticle.textContent = centsToEuros(price);
	const imgArticle = document.createElement("img");
	imgArticle.setAttribute("src", img);
	imgArticle.setAttribute("class", "img-thumbnail img-description mb-3");
	const descriptionArticle = document.createElement("p");
	descriptionArticle.textContent = description;

	//assemblage de la div de l'article
	const div = document.getElementById("listing").appendChild(divArticle);
	div.appendChild(titleArticle);
	div.appendChild(priceArticle);
	div.appendChild(descriptionArticle);
	div.appendChild(imgArticle);

}

function selectOption(array) {
	//creation du selecteur d'option
	const sltOption = document.createElement("select");
	sltOption.setAttribute("class", "form-select m-1");
	sltOption.setAttribute("aria-label", "Default select example");
	sltOption.setAttribute("id", "option-article");
	document.getElementsByTagName("aside")[0].appendChild(sltOption);
	for(let option of array) {
		console.log(option);
		let opt = document.createElement("option");
		opt.textContent = option;
		document.getElementById("option-article").appendChild(opt);
	}
}

function alertAddToBasket() {
	//	localStorage.setItem(localStorage.length, content + "-" + id);
	const mainPage = document.getElementsByTagName("main")[0];
	const divAlertAdd  = document.createElement("div");
	divAlertAdd.setAttribute("class", "alertAddToBasket p-3 alert-success");
	divAlertAdd.setAttribute("id", "alertAddToBasket");
	const bodyAlert = document.createElement('div');
	bodyAlert.setAttribute('class', 'bodyFade');
	bodyAlert.setAttribute('id', 'bodyAlert');
	const pAlertAdd = document.createElement('p');
	pAlertAdd
		.textContent = "Article correctement ajouter au panier!"
	mainPage.appendChild(bodyAlert);
	mainPage.appendChild(divAlertAdd);
	divAlertAdd.appendChild(pAlertAdd);
	divAlertAdd.appendChild(btn("Fermer la fenetre"));
}

document.getElementsByTagName("h2")[0].innerHTML += '<a href="index.html?content=' + content + '">' + titlePage + "</a>";
document.getElementsByTagName('title')[0].textContent += ' - Produit';
getArticle(content, id);
