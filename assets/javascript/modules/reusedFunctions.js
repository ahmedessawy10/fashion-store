function create_product(id, image, category, price, offer = null, title, stars) {
    return `
        <div class="col-lg-3 col-md-4">
            <div class="product">
                <div class="image d-flex align-items-center justify-content-center">
                    <img class="w-sm-75 w-md-100" src="${image}" alt="${title}">
                    <div class="icons">
                        <a href="#" class="px-1"><i class="fa-solid fa-magnifying-glass"></i></a>
                        <a href="#" class="px-1"><i class="fa-solid fa-heart"></i></a>
                        <a href="javascript:void(0)" class="px-1 productToCart" data-id="${id}"><i class="fa-solid fa-cart-shopping "></i></a>
                    </div>
                </div>
                <div class="text d-flex flex-column align-items-center justify-content-center pt-3">
                    <h6><a href="#">${title}</a></h6>
                    <div class="rate">
                        ${Array(Math.floor(stars)).fill('<i class="fa-solid fa-star"></i>').join('')}
                    </div>
                    <p class="fs-4 mt-2 ${offer ? 'offer' : ''}">
                        ${price} ${offer ? `<span class="old text-decoration-line-through">${offer}</span>` : ''}
                    </p>
                </div>
            </div>
        </div>
    `;
}

function addToCart(product){
    console.log(product);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cart.length === 0){
        product.quantity = 1;
        cart.push(product);

}else if(cart.length > 0){
    let item = cart.find(item => item.id === product.id);
    if(item){
        item.quantity++;
        }else{
            product.quantity = 1;
            cart.push(product);
        }
}
localStorage.setItem('cart', JSON.stringify(cart));

}

function update_cart_counter(){

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(product => {
        total += product.quantity;
    });
    document.querySelectorAll('.cart-count').forEach((e)=>{
    e.dataset.count = total;
    });
}

export { create_product, addToCart , update_cart_counter};