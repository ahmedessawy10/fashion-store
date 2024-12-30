// import {products}  from './products.js';
var products_tab = document.getElementById('products-tab');
var category_tab = Array.from(document.getElementById('category-tab').children);
var products=[];

const xhr=new XMLHttpRequest();
xhr.open('GET','./assets/products.json');
xhr.onreadystatechange=function(){
 
    if(xhr.readyState==4 &&  xhr.status==200){
       var products=JSON.parse(xhr.response);
       createElementOfproducts(products);
        console.log("products get correctly");
    }else{
        console.log("products failed");
    }

}
xhr.send();


function create_product(url, type, price, offer = null, name, stars) {
    return `
        
            <div class="col-lg-3 col-md-4">
                <div class="product">
                    <div class="image d-flex align-items-center justify-content-center">
                        <img  class="w-sm-75  w-md-100" src="${url}" alt="${name}">
                        <div class="icons">
                            <a href="#" class="px-1"><i class="fa-solid fa-magnifying-glass"></i></a>
                            <a href="#" class="px-1"><i class="fa-solid fa-heart"></i></a>
                            <a href="#" class="px-1"><i class="fa-solid fa-cart-shopping"></i></a>
                        </div>
                    </div>
                    <div class="text d-flex flex-column align-items-center justify-content-center pt-3">
                        <h6><a href="#">${name}</a></h6>
                        <div class="rate">
                            ${Array(stars).fill('<i class="fa-solid fa-star"></i>').join('')}
                        </div>
                        <p class="fs-4 mt-2 ${offer ? 'offer' : ''}">
                            ${price} ${offer ? `<span class="old text-decoration-line-through">${offer}</span>` : ''}
                        </p>
                    </div>
                </div>
            </div>
        `;
}


function createElementOfproducts(products) {
    category_tab.forEach(function(tab,index) {
        var ele = document.createElement('div');
        ele.id = tab.dataset.type;
        if(index === 0){
    
            ele.className = 'tab-pane fade show active';
        }else{
            ele.className = 'tab-pane fade';
        }
        
        var product_list= document.createElement('section');
        product_list.className = 'products-list row';
        
    
        // Filter products based on the category type
        var productsList = (tab.dataset.type !== 'all')
            ? products.filter(function(product) {
                return product.type === tab.dataset.type;
            })
            : products;
    
        // If products are found, append them
        if (productsList.length > 0) {
            productsList.forEach(function(product) {
                product_list.innerHTML += create_product(
                    product.url, 
                    product.type, 
                    product.price, 
                    product.offer, 
                    product.title, 
                    product.stars
                );
            });
            ele.appendChild(product_list);
            products_tab.appendChild(ele);
        }
    });
    
}




// cursale interval
const myCarouselElement = document.querySelector('#carouselExampleIndicators')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 1000,
  touch: false
})

// start pereloader
window.onload=function(){
    var preloader = document.getElementById('preloader');
preloader.style.display="block"
    setTimeout(function(){
preloader.style.display="none"
    },1500)
}

// end preloader



// start menu

var menu = document.getElementById('menu');
var menulist= document.getElementById('menulist');
menu.addEventListener('click', function () {
    if (menulist.classList.contains('show')) {
      bootstrap.Collapse.getInstance(menulist).hide();
    } else {
      bootstrap.Collapse(menulist).show();
    }
  });