/*
let id = url.searchParams.get("id");
let action = url.searchParams.get("action");


if(localStorage.length > 0) { 
	// compte et affiche le nombre d'article dans le panier si il y en a...
	document.getElementById("link-my-basket").textContent += " (" + localStorage.length + ")";
}

if (content) {
	titlePage = content.charAt(0).toUpperCase() + content.substring(1).toLowerCase();
	if(id) {
		// affiche un article quand le parametre ID est renseigner et ajoute aussi le titre de la page!
		document.getElementsByTagName("h2")[0].innerHTML +=
			'<a href="index.html?content=' + content + '">' + titlePage + "</a>";
		getArticle(content, id);
	} else {
		// affiche tous les articles de la categorie si l'ID n'est pas renseigner!
		document.getElementsByTagName("h2")[0].textContent += titlePage;
		getContent(content);
	}
} else if(action) {
	if(action === 'basket'){
		// affiche le contenu du panier si le parametre action est renseigner
		document.getElementsByTagName("h2")[0].textContent = "Mon panier";
		for (let i in myBasket()) {
			// parcours le contenu du localStorage a l'aide de la function myBasket()
			getArticle(myBasket()[i][0], myBasket()[i][1]);
			//getTotal(myBasket()[i][0], myBasket()[i][1]);
			console.log('salut');
		}
		if(localStorage.length > 0) {
			document.getElementsByTagName("aside")[0].appendChild(btn("Supprimer mon panier"));
			document.getElementsByTagName("aside")[0].appendChild(btn("Passer commande!"));
		} else {
			const nullBasket = document.createElement("h2");
			nullBasket.textContent = 'Votre panier est vide';
			document.getElementsByTagName("main")[0].appendChild(nullBasket);
		}
	} else if(action === 'purchase') {
		formToPurchase();
	}
}


////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////
*/

/*function getArticle(content, id) {
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
*/

/*
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
};
*/


/*
function elementArticleAdd() {
	//creation du selecteur d'option
	const sltOption = document.createElement("select");
	sltOption.setAttribute("class", "form-select m-1");
	sltOption.setAttribute("aria-label", "Default select example");
	sltOption.setAttribute("id", "option-article");

	document.getElementsByTagName("aside")[0].appendChild(sltOption);
	document.getElementsByTagName("aside")[0].appendChild(btn("Ajouter au panier"));
}

function selectOption(array) {
	for(let option of array) {
		let opt = document.createElement("option");
		opt.textContent = option;
		document.getElementById("option-article").appendChild(opt);
	}
}

function addToBasket() {
	localStorage.setItem(localStorage.length, content + "-" + id);
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

function myBasket() {
	let myBasket = []
	for (let i = 0; i < localStorage.length; i++) {
		myBasket.push(localStorage[i].split("-"));
	}
	return myBasket;
}

function formToPurchase() {
	const form = document.createElement('form');
	const divForm = document.createElement('div');
	divForm.setAttribute('class', 'form-group');
	divForm.setAttribute('id', 'form-to-purchase');
	divForm.setAttribute('method', 'POST');
	const labelFirstName = document.createElement('label');
	labelFirstName.setAttribute('for', 'idFirstName');
	labelFirstName.textContent = 'First Name';
	const inputFirstName = document.createElement('input');
	inputFirstName.setAttribute('id', 'idFirstName');
	inputFirstName.setAttribute('class', 'form-control');
	inputFirstName.setAttribute('placeholder', 'Entrez votre prenom');
	inputFirstName.setAttribute('type', 'text');
	inputFirstName.setAttribute('required', '');
	const labelLastName = document.createElement('label');
	labelLastName.setAttribute('for', 'idLastName');
	labelLastName.textContent = 'Last Name';
	const inputLastName = document.createElement('input');
	inputLastName.setAttribute('id', 'idLastName');
	inputLastName.setAttribute('class', 'form-control');
	inputLastName.setAttribute('placeholder', 'Entrez votre nom de famille');
	inputLastName.setAttribute('type', 'text');
	inputLastName.setAttribute('required', '');
	const labelAddress = document.createElement('label');
	labelAddress.setAttribute('for', 'idAddress');
	labelAddress.textContent = 'Adresse';
	const inputAddress = document.createElement('input');
	inputAddress.setAttribute('id', 'idAddress');
	inputAddress.setAttribute('class', 'form-control');
	inputAddress.setAttribute('placeholder', 'Entrez votre adresse');
	inputAddress.setAttribute('type', 'address');
	inputAddress.setAttribute('required', '');
	const labelCity = document.createElement('label');
	labelCity.setAttribute('for', 'idCity');
	labelCity.textContent = 'Ville';
	const inputCity= document.createElement('input');
	inputCity.setAttribute('id', 'idCity');
	inputCity.setAttribute('class', 'form-control');
	inputCity.setAttribute('placeholder', 'Entrez votre ville');
	inputCity.setAttribute('type', 'address');
	inputCity.setAttribute('required', '');
	const labelEmail = document.createElement('label');
	labelEmail.setAttribute('for', 'idEmail');
	labelEmail.textContent = 'Courriel';
	const inputEmail= document.createElement('input');
	inputEmail.setAttribute('id', 'idEmail');
	inputEmail.setAttribute('class', 'form-control');
	inputEmail.setAttribute('placeholder', 'Entrez votre email');
	inputEmail.setAttribute('type', 'email');
	inputEmail.setAttribute('required', '');
	document.getElementsByTagName('main')[0].appendChild(form);
	form.appendChild(divForm);
	divForm.appendChild(labelFirstName);
	divForm.appendChild(inputFirstName);
	divForm.appendChild(labelLastName);
	divForm.appendChild(inputLastName);
	divForm.appendChild(labelAddress);
	divForm.appendChild(inputAddress);
	divForm.appendChild(labelCity);
	divForm.appendChild(inputCity);
	divForm.appendChild(labelEmail);
	divForm.appendChild(inputEmail);
}
*/


