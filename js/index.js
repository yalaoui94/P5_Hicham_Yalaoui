let product = document.getElementById('items')
console.log(product)

//appel de l'API
fetch ("http://localhost:3000/api/products")
.then(function (res) {
    return res.json()
})
.then(function (articles) {
    articles.forEach( (kanap) => itemDisplay(kanap))
})
.catch(function (error){
    console( "Une erreur est survenue:"+error)
})



//appel lien URL et intégration dans le HTML 
function itemDisplay (kanap){ 
    console.log("ok");
    let newA =document.createElement("a");
    newA.setAttribute("href",'./product.html?id='+kanap._id);

    newA.innerHTML=
    `
    <article>
    <img src="${kanap.imageUrl}"alt="${kanap.altTxt}">
    <h3 class="productName">"${kanap.name}"</h3>
    <p class="productDescription">"${kanap.description}"</p>
    </article>
    
    `
    product.appendChild(newA)
    console.log(newA)

    
    
};   

