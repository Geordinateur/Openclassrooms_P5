let str = window.location.href;
let url = new URL(str);
let content = url.searchParams.get("content");
let id = url.searchParams.get("id");
let action = url.searchParams.get("action");




if(localStorage.length > 0) { document.getElementById("link-my-basket").textContent += " (" + localStorage.length + ")";}

if (content) {
	titlePage = content.charAt(0).toUpperCase() + content.substring(1).toLowerCase();
	if(id) {
		document.getElementsByTagName("h2")[0].innerHTML +=
			'<a href="index.html?content=' + content + '">' + titlePage + "</a>";
		getArticle(content, id);
	} else {
		document.getElementsByTagName("h2")[0].textContent += titlePage;
		getContent(content);
	}
	//} else if(action === "basket") {
} else if(action) {
	document.getElementsByTagName("h2")[0].textContent = "Mon panier";
	console.log("ou je suis");
	console.log(action);
	console.log(localStorage);
	var cat = localStorage.getItem('myCat');
	console.log(localStorage.length);

for (let i in myBasket()) {
	getArticle(myBasket()[i][0], myBasket()[i][1]);
}
}

////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////

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
			if(url.searchParams.get("id")) { document.getElementsByTagName("h2")[0].innerHTML += " >> " + value[id].name; }
			createElementArticle(
				value[id].name,
				id,
				value[id].imageUrl,
				value[id].price,
				value[id].description,
				optionArticle
			);
			selectOption(optionArticle);
		})
		.catch(function (err) {
			// erreur
		});
}

function centsToEuros(number) {
	euros = number / 100;
	return euros.toFixed(2) + " euros";
}

function createElementListing(name, id, img, price) {
	const divElement = document.createElement("a");
	divElement.setAttribute("class", "clearfix d-block mb-3");
	divElement.setAttribute(
		"href",
		"index.html?content=" + content + "&id=" + id
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

	if(content && id) {
		elementArticleAdd();
	}
}

function elementArticleAdd() {
	//creation du form
	const formToBuy = document.createElement("form");
	formToBuy.setAttribute("action", "index.html?action=add-to-basket&what=" + content + "&id=" + id);
	formToBuy.setAttribute("method", "post");
	formToBuy.setAttribute("class", "form-group");
	formToBuy.setAttribute("id", "form-to-buy");

	//creation du btn
	const btnBuy = document.createElement('button');
	btnBuy.setAttribute("class", "btn btn-primary m-1")
	btnBuy.setAttribute("type", "submit")
	btnBuy.textContent = "Ajouter au panier"
	btnBuy.addEventListener("click", function(e) {
		localStorage.setItem(localStorage.length, content + "-" + id);
		e.preventDefault();
		alertAddToBasket();
		//window.alert("Article correctement ajouter au panier!");
	});

	//creation du selecteur d'option
	const sltOption = document.createElement("select");
	sltOption.setAttribute("class", "form-select m-1");
	sltOption.setAttribute("aria-label", "Default select example");
	sltOption.setAttribute("id", "option-article");

	document.getElementsByTagName("aside")[0].appendChild(formToBuy);
	document.getElementById("form-to-buy").appendChild(sltOption);
	document.getElementById("form-to-buy").appendChild(btnBuy);
}

function selectOption(array) {
	for(let option of array) {
		let opt = document.createElement("option");
		opt.textContent = option;
		document.getElementById("option-article").appendChild(opt);
		console.log(option);
	}
}

function alertAddToBasket() {
	const mainPage = document.getElementsByTagName("main")[0];
	const divAlertAdd  = document.createElement("div");
	divAlertAdd.setAttribute("class", "alertAddToBasket");
	//	divAlertAdd.textContent = "Article correctemenet ajouter au panier!";
	divAlertAdd
		.textContent = "Article correctement ajouter au panier!"
	const btnClose = document.createElement('button');
	btnClose.setAttribute("class", "btn btn-primary m-1")
	btnClose.setAttribute("type", "submit")
	btnClose.textContent = "Fermer"
	btnClose.addEventListener("click", function(e) {
		divAlertAdd.remove();
		e.preventDefault();
	})
	mainPage.appendChild(divAlertAdd);
	divAlertAdd.appendChild(btnClose);
}

function myBasket() {
let myBasket = []
for (let i = 0; i < localStorage.length; i++) {
myBasket.push(localStorage[i].split("-"));
}
return myBasket;
}