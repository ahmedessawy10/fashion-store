
import { update_cart_counter } from './modules/reusedFunctions.js';

let products = JSON.parse(localStorage.getItem('cart')) || [];

const tbody = document.querySelector('.cart tbody');

function updateCart(products) {
    let total = 0;
    tbody.innerHTML = '';
    products.forEach(product => {
        let productTotal = product.price * product.quantity;
        total += productTotal;
        tbody.innerHTML += createCartTR(product.image, product.id, product.title, product.price, product.quantity, productTotal);
    });
    document.querySelector('#cart-total').textContent =  total.toFixed(2);
    update_cart_counter();
}

updateCart(products);

// document.getElementById('clear-cart').addEventListener('click', () => {
//     localStorage.removeItem('cart');
//     products = [];
//     updateCart(products);
// });

// Use event delegation for dynamically created elements
tbody.addEventListener('click', (e) => {
    const target = e.target;
    const action = target.closest('button')?.id;  
    const productId = target.closest('button')?.dataset.id; 
    console.log(action, productId);
    
    if (action && productId) {
        let product = products.find(product => product.id == productId);
        if (action === 'add-quantity') {
            product.quantity++;
        } else if (action === 'sub-quantity' && product.quantity > 1) {
            product.quantity--;
        } else if (action === 'remove-product') {
            products = products.filter(product => product.id != productId);
        }

        localStorage.setItem('cart', JSON.stringify(products));
        updateCart(products);
        update_cart_counter();
    }
});

function createCartTR(image, id, name, price, quantity, total) {
    return `<tr>
                <td><img src="${image}" alt="" style="width:60px" /> <span>${name}</span></td>
                <td id="price" style="color: var(--primary-color)">${price}</td>
                <td>
                    <button data-id="${id}" class="btn rounded-circle" id="sub-quantity">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="mx-3">${quantity}</span>
                    <button data-id="${id}" class="btn rounded-circle" id="add-quantity">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </td>
                <td class="" id="product-total" style="color: var(--primary-color)">
                    ${total}
                </td>
                <td>
                    <button class="btn btn-secondary rounded-circle" data-id="${id}" id="remove-product">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </td>
            </tr>`;
}



