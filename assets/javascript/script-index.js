var products_tab = document.getElementById('products-tab');
var category_tab = document.getElementById('category-tab');
import{create_product,addToCart,update_cart_counter} from './modules/reusedFunctions.js';
var allProducts=[];
update_cart_counter();
const promsCategory = new Promise((resolve, reject) => {
    if (category_tab) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://fakestoreapi.com/products/categories');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var categories = JSON.parse(xhr.response);
                    resolve(categories);
                } else {
                    reject("Categories not found");
                    console.log("Categories request failed");
                }
            }
        };
        xhr.send();
    } else {
        reject("Categories not found");
    }
});

promsCategory.then((categories) => {
    createElementOfCategories(categories);
    console.log("Categories fetched successfully");
}).catch((err) => {
    console.log(err);
});


function createElementOfCategories(categories) {
    let index = 0;
    const allTab = document.createElement('li');
    allTab.className = "nav-item";
    allTab.setAttribute("role", "presentation");
    allTab.dataset.type = "all";
    allTab.innerHTML = `<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#all" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All</button>`;
    category_tab.appendChild(allTab);

    categories.forEach((category) => {
        const categoryTab = document.createElement('li');
        categoryTab.className = "nav-item";
        categoryTab.setAttribute("role", "presentation");
        categoryTab.dataset.type = category.replace(/[\s']+/g, '');
        categoryTab.innerHTML = `<button class="nav-link" id="pills-${category.replace(/\s+\'+/g, '')}-tab" data-bs-toggle="pill" data-bs-target="#${category.replace(/[\s']+/g, '')}" type="button" role="tab" aria-controls="pills-${category.replace(/[\s']+/g, '')}" aria-selected="false">${category}</button>`;
        category_tab.appendChild(categoryTab);
    });
    console.log(category_tab);
}

const promsProducts = new Promise((resolve, reject) => {
    if (category_tab && products_tab) {
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
    allProducts=products;
    createElementOfProducts(products);
    console.log("Products fetched successfully");
}).catch((err) => {
    console.log(err);
});



function createElementOfProducts(products) {
     products_tab.innerHTML="";
   document.querySelectorAll('#category-tab li').forEach((tab) => {
        const tabPane = document.createElement('div');
        tabPane.id = tab.dataset.type;
        tabPane.className = `tab-pane fade ${tab.dataset.type === 'all' ? 'show active' : ''}`;
        console.log(tab.dataset.type);
        const productList = document.createElement('section');
        productList.className = 'products-list row';

        let  filteredProducts = tab.dataset.type === 'all'
            ? products
            : products.filter(product => product.category.replace(/[\s']+/g, '') === tab.dataset.type);

         
            
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
           
        tabPane.appendChild(productList);
        products_tab.appendChild(tabPane);

        
    
    });


    var productscart = document.querySelectorAll('.productToCart');
   
    if (productscart.length > 0) {
        productscart.forEach(function(productcart) {
                  productcart.addEventListener('click', function() {
                      console.log('click');
                      let product_id = this.dataset.id;
                      if (product_id) {
                          let product = allProducts.find(item => item.id == product_id);
                          
                          if (product) {
                          addToCart(product);
                         
                          update_cart_counter();
                          toastr.success('Product added to cart'); // Ensure cart count is updated
                      
                          }
                      } else {
                          console.log('Product ID not found');
                      }
                  });
              });
    }
}

// Carousel setup
