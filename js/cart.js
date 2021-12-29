// récpurer le tableau dans le localStorage
let registerItem = JSON.parse(localStorage.getItem("product"));
// fonction qui indique la quantité et calcul le total des produits
function totalQuantity(params) {
  let totalQuantity = document.getElementById('totalQuantity');
  let quantitiesProduct = document.querySelectorAll('.itemQuantity');
  let totalQuantities = 0;
  quantitiesProduct.forEach(qte =>{
  totalQuantities += Number(qte.value);
  })
  return totalQuantity.innerHTML = totalQuantities;
}
// fonction qui calcul le prix des produits par quantité et le prix total
function totalPrice(params) {
  let totalPrice = document.getElementById("totalPrice")
  let priceItem = document.querySelectorAll(".priceItem")
  total = 0;
  priceItem.forEach(price => {
      total += Number(price.textContent);
      console.log(typeof price.textContent);
  })
  return totalPrice.innerHTML = total;
}


///////////////////PARTIE PANIER


// si un produit est dans le local storage
if (registerItem) {
    
  // construction du DOM avec une boucle
  registerItem.forEach(eltItem => {
      
      let cartArticles = document.getElementById("cart__items")

      let article = document.createElement("article");
          article.classList.add("cart__item");
          article.setAttribute("data-id", eltItem.id)
          cartArticles.appendChild(article);
      
      let cartImg = document.createElement("div");
          cartImg.classList.add("cart__item__img");
          article.appendChild(cartImg);
      
      let imgItem = document.createElement("img");
          cartImg.appendChild(imgItem);
          imgItem.src = eltItem.image;
          imgItem.alt = eltItem.imageAlt;       
          
      let cartContent = document.createElement("div");
          cartContent.classList.add("cart__item__content");
          article.appendChild(cartContent);
      
      let contenTitlePrice = document.createElement("div");
          contenTitlePrice.classList.add("cart__item__content__titlePrice");
          cartContent.appendChild(contenTitlePrice);
      let nameItem = document.createElement("h2")
          nameItem.innerHTML = eltItem.name;
      let priceItem = document.createElement("p");
          priceItem.classList.add("priceItem");
          // +" "+"€";
          contenTitlePrice.appendChild(nameItem);
          contenTitlePrice.appendChild(priceItem);
          
      let itemSettings = document.createElement("div");
          itemSettings.classList.add("cart__item__content__settings");
          cartContent.appendChild(itemSettings);
          
      let settingsQuantity = document.createElement("div");
          settingsQuantity.classList.add("cart__item__content__settings__quantity");
          itemSettings.appendChild(settingsQuantity);
      let quantityTitle = document.createElement("p");
          quantityTitle.innerHTML ="Quantité:" ;
          settingsQuantity.appendChild(quantityTitle);
          
      let inputQuantity = document.createElement("input");
          inputQuantity.classList.add("itemQuantity");
          inputQuantity.type="number";
          inputQuantity.name="itemQuantity";
          inputQuantity.min="1";
          inputQuantity.max="100";
          inputQuantity.value = eltItem.quantities;
          settingsQuantity.appendChild(inputQuantity);
          
      let settingsDelete = document.createElement("div");
          settingsDelete.classList.add("cart__item__content__settings__delete");
          cartContent.appendChild(settingsDelete);

      let deleteItem = document.createElement("p")
          deleteItem.classList.add("deleteItem");
          deleteItem.innerHTML="Supprimer";
          settingsDelete.appendChild(deleteItem);
          // A l'ouverture du panier, calcul des tarifs et des quantités déjà présents
        priceItem.innerHTML=inputQuantity.value * eltItem.price;
        totalPrice()
        totalQuantity()
            
        // changement des quantités avec la maj des tarifs, des quantités et du local storage
        inputQuantity.addEventListener("change",(e)=>{
            e.preventDefault();
            priceItem.innerHTML=inputQuantity.value * eltItem.price;
            totalQuantity();
            totalPrice();
            if (localStorage.getItem('product')) {
                let objIndex = registerItem.findIndex((item=> item.id === eltItem.id && item.color === eltItem.color))
                if (objIndex !== -1) {
                    registerItem[objIndex].quantities = inputQuantity.value;
                }
            }
            localStorage.setItem("product",JSON.stringify(registerItem));
        })

        // suppression des articles avec maj du local storage
        deleteItem.addEventListener('click',(e) =>{
            e.preventDefault();
            if (eltItem.id === eltItem.id) {
                let objIndex = registerItem.indexOf();
                // demande de confirmation de la suppression de l'article
                deleteConfirm = confirm("Voulez-vous vraiment supprimer l'article?")
                if (deleteConfirm == true) {
                   cartArticles.removeChild(article);
                   registerItem.splice(objIndex, 1)
                }
            }
            totalPrice();
            totalQuantity();
            localStorage.setItem('product',JSON.stringify(registerItem));
            // si le localStorage n'as plus d'article faire un clear et proposer de retourner à la page d'acceuil
            if (registerItem.length == 0 ) {
                localStorage.clear();
                returnPageIndex = window.confirm("Panier vide, voulez-vous retourner à la page d'accueil")
                if (returnPageIndex == true) {
                    location.href ="index.html"
                }
            }
        });
    });
}

