localStorage.clear();
document.getElementById('listing').innerHTML = '<h3>Féliciation</h3><p>Votre commande à correctement été enregistrer au numéro <strong>' + url.searchParams.get("order") + '</strong>. <br>Vous devrez recevoir par email une confirmation de celle-ci, nous vous remercions pour votre confiance et nous esperons vous revoir très bientot sur Orinoco ';
document.getElementById('listing').appendChild(btn('Retour à l\'accueil'));
