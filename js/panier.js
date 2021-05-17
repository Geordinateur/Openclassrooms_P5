let total = 0;

function myBasket() {
	let myBasket = []
	for (let i = 0; i < localStorage.length; i++) {
		myBasket.push(localStorage[i]);
	}
	return myBasket;
}

function getTotal() { 
	const pTotal = document.createElement('p');
	pTotal.textContent = 'Total de votre panier: ' + centsToEuros(total);
	document.getElementsByTagName("aside")[0].appendChild(pTotal);

}

function formToPurchase() {
	const form = document.createElement('form');
	const divForm = document.createElement('div');
	divForm.setAttribute('class', 'form-group m-3');
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
	return form;
}

document.getElementsByTagName("h2")[0].textContent = "Mon panier";
if(localStorage.length > 0) {
	for (let i in myBasket()) {
		// parcours le contenu du localStorage a l'aide de la function myBasket()
		createElementArticle(
			JSON.parse(myBasket()[i])['name'], 
			JSON.parse(myBasket()[i]), 
			JSON.parse(myBasket()[i])['imageUrl'], 
			JSON.parse(myBasket()[i])['price'], 
			JSON.parse(myBasket()[i])['description']
		);
		total += JSON.parse(myBasket()[i])['price'];
	}
	getTotal();
	document.getElementsByTagName("aside")[0].appendChild(btn("Supprimer mon panier"));
	document.getElementsByTagName("aside")[0].appendChild(formToPurchase());
	document.getElementsByTagName("aside")[0].appendChild(btn("Passer commande!"));
} else {
	document.getElementById('listing').textContent = "Pour l'instant votre panier est vide";
}
