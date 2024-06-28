function LoadCategories() {
    fetch(`https://fakestoreapi.com/products/categories`)
    .then(function(response) {
        return response.json();
    })
    .then(function(categories) {
        categories.unshift("all");
        categories.map(function(category) {
            var button = document.createElement("Button");
           button.textContent = category.toUpperCase();  // Set the text content
            button.setAttribute("data-value", category);  // Use a data attribute to store the value
            button.className ="btn btn-dark  font-weight-bold"
            button.onclick = function(){
                CategoryChange(category);  // Call CategoryChange with the category
            };
            document.getElementById("1stcategory").appendChild(button);
            
        });
    });
}

function loadProducts(url){
    fetch(url)
    .then( function (response){
        return response.json()
    })
    .then(function(products){
        document.querySelector("main").innerHTML = "";
        products.map(function(product){
            var div = document.createElement("div");
            div.className = "card m-2 p-2";
            div.style.width="240px" 
            div.innerHTML=`
            <img src=${product.image}   height="140">
            <div class="card-header " style="height:100px">
            <p class="">${product.title}
            </div>
            <div class="card-body">
            <dl>
               <dt>Price</dt>
               <dd> $ ${product.price}</dd>
               <dt>Rating</dt>
               <dd> ${product.rating.rate} <span class="bi bi-star-fill text-success"></span> [${product.rating.count}] </dd>
            </dl>
         </div>
         <div class="card-footer">
                      <button onclick="AddClick(${product.id})" class="btn btn-warning w-100 bi bi-cart3"> Add to Cart </button>
                  </div>
            `;
              document.querySelector("main").appendChild(div);
        })
    })
}
 function CategoryChange(category){
     var cat = category;
     if(cat=="all"){
        loadProducts(`https://fakestoreapi.com/products`) ;
     }else{
        loadProducts(`https://fakestoreapi.com/products/category/${cat}`)
     }
 }

function bodyload() {
   LoadCategories();
   loadProducts(`https://fakestoreapi.com/products`)
   GetCount();
}
var CarItem = [];
var cartTotal = 0;

function GetCount(){
    document.getElementById("digit").innerHTML=CarItem.length;
}
function AddClick(id){
fetch(`https://fakestoreapi.com/products/${id}`)
  .then(function(response){
    return response.json();
  })

  .then(function(product){
    cartTotal+=product.price;
    CarItem.push(product);
    alert(`${product.title}\nAdded to Cart`);
    GetCount();
    LoadCartItems()
  })
}

function LoadCartItems(){
    document.querySelector("tbody").innerHTML = "";
    cartTotal = CarItem.reduce((total, item) => total + item.price, 0);
    document.getElementById("total").innerHTML = "$" + cartTotal.toFixed(2);
    CarItem.map(function(item , index){
         var tr = document.createElement("tr");
         var tdTitle = document.createElement("td");
         var tdPrice = document.createElement("td");
         var tdImage = document.createElement("td");
         var tdAction = document.createElement("td");

         tdTitle.innerHTML = item.title;
         tdPrice.innerHTML = item.price.toLocaleString('en-us', {style:'currency', currency:'USD'});
         tdImage.innerHTML = `<img src=${item.image} width="50" height="50">`;
         var deleteButton = document.createElement("button");
         deleteButton.className = "btn btn-danger bi bi-trash";
         deleteButton.onclick = function() {
            // Remove the item from the CarItem array and reload the cart
            CarItem.splice(index, 1);
            LoadCartItems();
            GetCount()
         };
         tdAction.appendChild(deleteButton);

         tr.appendChild(tdTitle);
         tr.appendChild(tdPrice);
         tr.appendChild(tdImage);
         tr.appendChild(tdAction);

         document.querySelector("tbody").appendChild(tr);

    })
}
