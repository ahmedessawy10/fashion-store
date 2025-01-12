import{create_product,addToCart,update_cart_counter} from './modules/reusedFunctions.js';


// URL PARAMETER GET
var urlparm = location.search?location.search.substring(1)
    .split('&')
    .map((item) => item.split('='))
    .reduce((acc, [key, value]) => {
        if (key === 'prices') {
            const values = value.split('+-+');
            acc.min = values[0].substring(3); // Extract min value
            acc.max = values[1].substring(3); // Extract max value
        } else {
            acc[key] = value;
        }
        return acc;
    }, {}): {};


    let max = parseFloat(urlparm.max ?? 400);
    let min = parseFloat(urlparm.min ?? 0);
    
$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min:0,
      max: 1000,
      values: [ min, max ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );


  
  // CATEGORY  GET FOR SELECTION


  const categoryPromise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://fakestoreapi.com/products/categories');
    xhr.onreadystatechange = function() {  // Corrected event handler name
        console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("asd");
                const categories = JSON.parse(xhr.response);
                resolve(categories);
            } else {
                reject("Categories not found");
                console.log("Categories request failed");
            }
        }
    };
    xhr.send();
});

categoryPromise
    .then((categories) => {
        createOption(categories);
        console.log("Categories fetched successfully");
    })
    .catch((err) => {
        window.alert(err);
    });

function createOption(categories) {
    const select = document.getElementById('categories');
    console.log(select);
    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.replace(/[\s']+/g, '');
        if(urlparm.categories && urlparm.categories === category.replace(/[\s']+/g, '')){
            option.selected = true;
        }
        option.textContent = category;
        select.appendChild(option);
    });
}





var products_tab = document.getElementById('products-tab');



const promsProducts = new Promise((resolve, reject) => {
    if (products_tab) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://fakestoreapi.com/products');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var products = JSON.parse(xhr.response);
                    resolve(products);
                } else {
                    console.log("Products request failed");
                }
            }
        };
        xhr.send();
    } else {
        reject("Products not found");
    }
});

promsProducts.then((products) => {

    createElementOfProducts(products);
    console.log("Products fetched successfully");
}).catch((err) => {
window.alert(err);
});



var  filteredProducts=[];
function createElementOfProducts(products) {
  
        const tabPane = document.createElement('div');
        
        
        const productList = document.createElement('section');
        productList.className = 'products-list row';
        filteredProducts = products;
       if (urlparm.categories && urlparm.categories !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category.replace(/[\s']+/g, '') === urlparm.categories
        );
    }

    if (urlparm.min && urlparm.max) {
        filteredProducts = filteredProducts.filter(product => 
            product.price >= parseFloat(urlparm.min) && product.price <= parseFloat(urlparm.max)
        );
    }
     
 
    if(filteredProducts.length === 0){

        productList.innerHTML += `<h3 class="mt-5 text-center">No products found</h3>`;
    }else{
        filteredProducts.forEach(product => {
            productList.innerHTML += create_product(
                product.id,
                product.image,
                product.category,
                product.price,
                product.offer,
                product.title,
                product.rating.rate
            );
        });
    }
    products_tab.innerHTML = '';
    products_tab.appendChild(productList);
           
            
    var productscart = document.querySelectorAll('.productToCart');
  
    if (productscart.length > 0) {
        productscart.forEach(function(productcart) {
            productcart.addEventListener('click', function() {
                console.log('click');
                let product_id = this.dataset.id;
                if (product_id) {
                    let product = filteredProducts.find(item => item.id == product_id);
                    console.log(product);
                    if (product) {
                    addToCart(product);
                    }
                } else {
                    console.log('Product ID not found');
                }
            });
        });
        update_cart_counter();
    } 
  
}

// Carousel setup
