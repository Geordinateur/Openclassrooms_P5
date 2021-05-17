let str = window.location.href;
let url = new URL(str);
let content = url.searchParams.get("content");
let id = url.searchParams.get("id");
let action = url.searchParams.get("action");
let titlePage = '';

//crée un titre de page avec une majuscule au parametre 'content'
if(content) {
titlePage = content.charAt(0).toUpperCase() + content.substring(1).toLowerCase();
}

//compte et affiche le nombre d'article dans le panier
if(localStorage.length > 0) { 
	// compte et affiche le nombre d'article dans le panier si il y en a...
	document.getElementById("link-my-basket").textContent += " (" + localStorage.length + ")";
}

//fonction pour convertir des centimes en euros avec la mention 'euros' en plus...
function centsToEuros(number) {
	euros = number / 100;
	return euros.toFixed(2) + " euros";
}

function btn(title, option) {
	//creation du btn
	const btn = document.createElement('button');
	btn.setAttribute("class", "btn btn-primary m-1")
	btn.setAttribute("type", "submit")
	btn.textContent = title;
	switch (title) {
		case 'Ajouter au panier':
			btn.addEventListener("click", function(e) {
				localStorage.setItem(localStorage.length, option);
				alertAddToBasket();
				e.preventDefault();
			});
			break;
		case 'Supprimer mon panier':
			// supprime le panier et redirige vers la page du panier
			btn.setAttribute("class", "btn btn-danger m-1")
			btn.addEventListener("click", function(e) {
				localStorage.clear();
				document.location.href="index.html?action=basket";
				e.preventDefault();
			});
			break;
		case 'Fermer la fenetre':
			btn.setAttribute("class", "btn btn-success m-1")
			btn.addEventListener("click", function(e) {
				document.getElementById('alertAddToBasket').remove();
				document.getElementById('bodyAlert').remove();
				e.preventDefault();
			});
			break;
		case 'Passer commande!':
			btn.setAttribute('class', 'btn btn-success m-1')
			btn.addEventListener('click', function(e) {
				document.location.href="index.html?action=purchase";
				e.preventDefault();
			});
			break;
		default:
			console.log('Unknown account type!');
	}
	return btn;
}
