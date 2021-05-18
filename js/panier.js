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
	let successFirstName = false;
	let successLastName = false;
	let successAddress = false;
	let successCity = false;
	let successEmail = false;
	const form = document.createElement('form');
	const divForm = document.createElement('div');
	divForm.setAttribute('class', 'form-group mb-3 mt-3');
	form.setAttribute('id', 'form-to-purchase');
	form.setAttribute('method', 'POST');
	form.setAttribute('action', 'confirmation.html');
	const labelFirstName = document.createElement('label');
	labelFirstName.setAttribute('for', 'idFirstName');
	labelFirstName.textContent = 'First Name';
	const inputFirstName = document.createElement('input');
	inputFirstName.setAttribute('id', 'idFirstName');
	inputFirstName.setAttribute('class', 'form-control');
	inputFirstName.setAttribute('placeholder', 'Entrez votre prenom');
	inputFirstName.setAttribute('type', 'text');
	inputFirstName.setAttribute('require', '');
	//verification des données First Name
	inputFirstName.addEventListener('input', function(e) {
		if(isValid(e.target.value)) {
			inputFirstName.setAttribute('class', 'form-control is-valid');
			successFirstName = true;
		} else {
			inputFirstName.setAttribute('class', 'form-control is-invalid');
			successFirstName = false;
		}
	});
	const labelLastName = document.createElement('label');
	labelLastName.setAttribute('for', 'idLastName');
	labelLastName.textContent = 'Last Name';
	const inputLastName = document.createElement('input');
	inputLastName.setAttribute('id', 'idLastName');
	inputLastName.setAttribute('class', 'form-control');
	inputLastName.setAttribute('placeholder', 'Entrez votre nom de famille');
	inputLastName.setAttribute('type', 'text');
	inputLastName.setAttribute('require', '');
	//verification des données Last Name
	inputLastName.addEventListener('input', function(e) {
		if(isValid(e.target.value)) {
			inputLastName.setAttribute('class', 'form-control is-valid');
			successLastName = true;
		} else {
			inputLastName.setAttribute('class', 'form-control is-invalid');
			successLastName = false;
		}
	});
	const labelAddress = document.createElement('label');
	labelAddress.setAttribute('for', 'idAddress');
	labelAddress.textContent = 'Adresse';
	const inputAddress = document.createElement('textarea');
	inputAddress.setAttribute('id', 'idAddress');
	inputAddress.setAttribute('class', 'form-control');
	inputAddress.setAttribute('placeholder', 'Entrez votre adresse');
	inputAddress.setAttribute('type', 'address');
	inputAddress.setAttribute('require', '');
	//verification des données Address
	inputAddress.addEventListener('input', function(e) {
		if(isValidAddress(e.target.value)) {
			inputAddress.setAttribute('class', 'form-control is-valid');
			successAddress = true;
		} else {
			inputAddress.setAttribute('class', 'form-control is-invalid');
			successAddress = false;
		}
	});
	const labelCity = document.createElement('label');
	labelCity.setAttribute('for', 'idCity');
	labelCity.textContent = 'Ville';
	const inputCity= document.createElement('input');
	inputCity.setAttribute('id', 'idCity');
	inputCity.setAttribute('class', 'form-control');
	inputCity.setAttribute('placeholder', 'Entrez votre ville');
	inputCity.setAttribute('type', 'address');
	inputCity.setAttribute('require', '');
	//verification des données City
	inputCity.addEventListener('input', function(e) {
		if(isValid(e.target.value)) {
			inputCity.setAttribute('class', 'form-control is-valid');
			successCity = true;
		} else {
			inputCity.setAttribute('class', 'form-control is-invalid');
			successCity = false;
		}
	});
	const labelEmail = document.createElement('label');
	labelEmail.setAttribute('for', 'idEmail');
	labelEmail.textContent = 'Courriel';
	const inputEmail= document.createElement('input');
	inputEmail.setAttribute('id', 'idEmail');
	inputEmail.setAttribute('class', 'form-control');
	inputEmail.setAttribute('placeholder', 'Entrez votre email');
	inputEmail.setAttribute('type', 'email');
	inputEmail.setAttribute('require', '');
	//verification des données Email
	inputEmail.addEventListener('input', function(e) {
		let value = e.target.value;
		if(isValidEmail(value)) {
			inputEmail.setAttribute('class', 'form-control is-valid');
			successEmail = true;
		} else {
			inputEmail.setAttribute('class', 'form-control is-invalid');
			successEmail = false;
		}
	});
	//creation de la div du résultat
	const divResult = document.createElement('div');
	divResult.setAttribute('class', 'is-invalid invalid-feedback');
	divResult.setAttribute('id', 'idResult');
	document.getElementsByTagName('main')[0].appendChild(form);
	//a supprimer
	inputFirstName.setAttribute('value', 'Georges');
	inputLastName.setAttribute('value', 'Grignard');
	inputAddress.textContent = '3 avenue Olympe de Gouges';
	inputCity.setAttribute('value', 'Nantes');
	inputEmail.setAttribute('value', 'emuricardo@gmail.com');
	//
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
	divForm.appendChild(btn("Passer commande!"));
	divForm.appendChild(divResult);
	//verification des données avant l'envoi du formulaires.
	//
	//
	//





	/*
	function send(event) {
		if (successFirstName && successLastName && successAddress && successCity && successEmail) {
			let contact = {
				firstName: document.getElementById('idFirstName').value,
				lastName: document.getElementById('idLastName').value,
				address: document.getElementById('idAddress').value,
				city: document.getElementById('idCity').value,
				email: document.getElementById('idEmail').value,
			};
			let products = myBasket();
			event.preventDefault();
			fetch("http://localhost:3000/api/teddies/order", {
				method: "POST",
				headers: {
					'Accept': 'application/json', 
					'Content-Type': 'application/json'
				},

				body: JSON.stringify({contact, products})
			})
				.then(function(res) {
					console.log(res);
					if (res.ok) {
						console.log('success');
						console.log(res);
						return res.json();
					}
				})
//			.then(function(value) {
//				console.log(value);
//				console.log(res);
//				document
//					.getElementById("idResult")
//					.innerText = value;
//			})
				.catch(function (err) {
					// erreur
					console.log('erreur');
					console.log(err);
				});
		} else {
			divForm.appendChild(errorDiv);
			errorDiv.textContent = '';
			errorDiv.textContent = 'Votre formulaire est incorrect';
			event.preventDefault();
		}
	}
	*/


					const send = (event) => {
						let contact = {
							firstName: document.getElementById('idFirstName').value,
							lastName: document.getElementById('idLastName').value,
							address: document.getElementById('idAddress').value,
							city: document.getElementById('idCity').value,
							email: document.getElementById('idEmail').value,
						};
						let products = myBasket();
						event.preventDefault();
						console.log('avoir: ', contact, products);
						const promise = fetch("http://localhost:3000/api/teddies/order", {
							method: "POST",
							headers: {
								'Accept': 'application/json', 
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({contact, products})
						});
						promise.then(async(response) => {
							try{
								const contenu = await response.json();
								contenu = localStorage.setItem("contenu", JSON.stringify(contenu));
							} catch(e) {
							}
						});
					}


	form.addEventListener("input", function (event) {
		if (successFirstName && successLastName && successAddress && successCity && successEmail) {
			document.getElementById('btn-purchase').classList.remove('disabled');
		} else {
			document.getElementById('btn-purchase').classList.add('disabled');
		}
	});
	form.addEventListener("submit", send); /*function (event) {
		if (successFirstName && successLastName && successAddress && successCity && successEmail) {
		} else {
			divForm.appendChild(divResult);
			errorDiv.textContent = '';
			errorDiv.textContent = 'Votre formulaire est incorrect';
			event.preventDefault();
		}
	}, false);*/
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
	document.getElementsByTagName("aside")[0].appendChild(formToPurchase());
	document.getElementsByTagName("aside")[0].appendChild(btn("Supprimer mon panier"));
} else {
	document.getElementById('listing').textContent = "Pour l'instant votre panier est vide";
}
