//URL de récupération
//et vérification de l'url liée à l'identifiant
let  url  =  new  URL ( document.location )
console.log(url)
let id = url.searchParams.get("id") 


// je fais appel à l'api avec l'id du produit 
fetch('http://localhost:3000/api/products/'+ id)
.then((res)=> {
    
    const response = res.json();
    // je récupère les données du produit par son id
    response.then(product =>{    
        
        // Création et définition des éléments du DOM 

        let addToCart = document.getElementById("addToCart");
        let colors = document.getElementById("colors");
        let img = document.createElement("img");
        let quantity = document.querySelector("#quantity");
        let price = document.getElementById("price").innerHTML = product.price;
        let name = document.getElementById("title").innerHTML = product.name;
        document.querySelector(".item__img").appendChild(img);
        document.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map(color => `<option id= "valueColor" value="${color}">${color}</option>`));
        document.getElementById("description").innerHTML = product.description;
        img.src = product.imageUrl;
        img.alt= product.altTxt;
        let image = img.src ;
        let imageAlt= img.alt;
        
        // évènement au click du bouton "ajouter au panier"

        addToCart.addEventListener("click",(e)=>{
            e.preventDefault();
            let color = colors.value;
            let quantities = Number(quantity.value);

            // création des données à stocker dans un  tableau
            let infoProduct = {
                id,
                image,
                imageAlt,               
                name,
                price,
                color ,
                quantities,
            }; 
            // création du tableau pour récupérer les données
            let registerItem = []; 
            // condition si le local storage contient un produit
            if (localStorage.getItem("product")) {
                // si j'ai des données, elles sont transférées dans le tableau 
                registerItem = JSON.parse(localStorage.getItem("product")) ;

                // je créé une variable qui vérifie si un produit a un id et une couleur identique dans mon tableau
                let objIndex = registerItem.findIndex((item=> item.id === infoProduct.id && infoProduct.color === item.color));
                // si cela est le cas, alors la quantité du produit est modifiée
                if (objIndex !== -1) {
                  registerItem[objIndex].quantities += quantities;
                }
                // sinon si ce n'est pas le cas, j'ajoute le produit dans mon tableau 
                else {
                    registerItem.push(infoProduct)
                }
                // j'envoi les produits de mon tableau dans le local storage et je convertis les données en chaine de caractère
                localStorage.setItem("product",JSON.stringify(registerItem));
            }
            // sinon si le local storage est vide alors j'envoi les données avec un tableau et je convertis ces données en chaine de caractères
            else{
                registerItem.push(infoProduct);
                localStorage.setItem("product",JSON.stringify(registerItem));
            }
        });
    });
});
            

            