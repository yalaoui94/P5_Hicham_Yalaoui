let url = new url (window.location.href); // récupération de la barre d'adresse

let orderId = url.searchParams.get("orderId"); // Avec l'option params je récupère l'orderId de l'url 

let confirmOrderId = document.getElementById('orderId');

confirmOrderId.innerHTML = orderId; // liensant avec le html 