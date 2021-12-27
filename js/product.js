//URL de récupération
//et vérification de l'url liée à l'identifiant
let  url  =  new  URL ( document.location )
console.log(url)
let id = url.searchParams.get("id") 

//Intégration des données de l'Api dans la page produit 
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const image = document.getElementsByClassName("item__img")[0];

fetch("http://localhost:3000/api/products/"+id)
    .then(function (res){
        return res.json() 
    })

    .then (products =>{

        imageUrl = products.imageUrl
        altTxt = products.altTxt
        document.title = products.name
        title.textContent = products.name
        price.textContent = products.price
        description.textContent = products.description
        let colors= products.colors
        displayOption(products);
        colors.innerHTML =
        `
        <option value=\"${products.colors}\"></option>
        `
        // console.log(products.colors)
        image.innerHTML = 
       `
        <img  src=\"${products.imageUrl}\" alt=\"${products.altTxt}\"></img>
       `
        })
        .catch (function (error) {
            console.log(error)
            if (id != url){
                window.location.href = "index.html"
            }

    })

    //Création du ShoppingItem(ligne de produit dans le panier) et mise en place localstorage
    class ShoppingItem {
    constructor (id, option, quantity){
        this.id = id;
        this.option = option;
        this.quantity = quantity;
      
     }
} 
    const quantity = document.getElementById('quantity');
    const option = document.getElementById("colors");

//Mise en place du bouton
    const addToCart = document.getElementById("addToCart");
// Enregistrer le bouton 
    addToCart.addEventListener("click", (event) =>{
     event.preventDefault();
    let shoppingItem = {
        quantity: quantity.value,
        option: option.value,
        _id: id,
        name: title.textContent,
        price: price.textContent,
        image: imageUrl,
        alt : altTxt,
    }
    
//Mise en fonction de localstorage
    localstorage(shoppingItem)
    console.log(shoppingItem)
 })
 //Fenêtre vérification et validation
 const popupConfirmation = () => {
    if (window.confirm (` Confirmer en appuyant sur Ok ou revenir à l'accueil avec Annuler`))
    {
        window.location.href = "cart.html"
        
    }else{
       window.location.href = "index.html"
    }
} 

//Création localStorage avec deux possibilités et une sécurité pour les doublons
function localstorage (shoppingItem){
    let shoppingCartLocalStorage = JSON.parse(localStorage.getItem("shoppingCart"));
    console.log(shoppingCartLocalStorage);
    // Si il y a un produit déjà enregistré
    if (shoppingCartLocalStorage){
                productChecked(shoppingCartLocalStorage, shoppingItem);
                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartLocalStorage));
                console.log(shoppingCartLocalStorage);
                popupConfirmation()
        } else {
    // Si il n'y a aucun produit    
                shoppingCartLocalStorage =[];
                shoppingCartLocalStorage.push(shoppingItem);
                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartLocalStorage));
                console.log(shoppingCartLocalStorage);
                popupConfirmation()
        
    }
    };
    // Pour éviter les doublons dans le panier
    function productChecked (shoppingCartLocalStorage, shoppingItem){
        const object = shoppingCartLocalStorage.find(element => element.id === shoppingItem.id&& element.option === shoppingItem.option);
        if (object){
            const n = parseInt(object.quantity);
            const m = parseInt(shoppingItem.quantity);
            object.quantity = (n + m).toString();
        } else {
            shoppingCartLocalStorage.push(shoppingItem)
          
        }
        return shoppingCartLocalStorage;
       
    }