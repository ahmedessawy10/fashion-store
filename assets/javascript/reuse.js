const header=document.getElementById('header-container');
const footer=document.getElementsByTagName('footer')[0];

import { addToCart,update_cart_counter } from "./modules/reusedFunctions.js";

const myCarouselElement = document.querySelector('#carouselExampleIndicators');
if(myCarouselElement){
  const carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 1000,
    touch: false
});
}

update_cart_counter();

// Preloader and menu setup combined
window.onload = function () {
    
  const preloader = document.getElementById('preloader');
    if (preloader) {
        // preloader.style.display = "block";
        setTimeout(() => preloader.style.display = "none", 1500);
    }

    const menu = document.getElementById('menu');
    const menulist = document.getElementById('menulist');
    if (menu && menulist) {
        menu.addEventListener('click', function () {
            if (menulist.classList.contains('show')) {
                bootstrap.Collapse.getInstance(menulist).hide();
            } else {
                bootstrap.Collapse(menulist).show();
            }
        });
    }

}







// header

header.innerHTML= `
<div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
      <button type="button" class="btn-close " style="width:15px;height:15px;border:1px dotted #777;border-radius: 50%;color:#000;" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
   
  
   <section class="icons d-flex justify-content-center align-items-center fs-2">
                          <a href="# " class="px-1 position-relative"><i class="fa-solid fa-magnifying-glass">
  
                          </i></a>
                          <a href="./cart.html" class="px-1 position-relative link-count cart-count" data-count="0"><i class="fa-solid fa-cart-shopping"></i></a>
                          <a href="# " class="px-1 position-relative link-count" data-count="0"><i class="fa-solid fa-heart"></i>
                          </a>
                      </section>
      <div class="logo">
       <img alt="" data-cfsrc="img/logo.png" src="assets/image/logo.png.webp"></a>
      </div>
  
      <section class=" links d-flex flex-column my-2">
          <button id="menu" class="btn" type="button"data-bs-toggle="collapse" data-bs-target="#menulist">
              <span>menu </span><i class="fa-solid fa-bars"></i>
          </button>
          <nav class="collapse " id="menulist" style="transition: all 0.5s ease-in-out;">
              <ul class="d-flex  flex-column align-items-start justify-content-center">
                  <li class="py-2 "><a  class="underline-link" href="index.html ">Home</a></li>
                  <li class="py-2 "><a class="underline-link" href="./shop.html">Shop</a></li>
                  <li class="py-2 "><a class="underline-link" href="blog.html ">Blog</a></li>
                  <li class="py-2 "><a class="underline-link" href="contact.html ">pages</a></li>
                  <li class="py-2 "><a  class="underline-link" href="contact.html ">Contact</a></li>
              </ul>
          </nav>
  
  
      </section>
      
                      <div class="auth">
                          <a href="#" >Login</a> /
                          <a href="#">Register</a>
                      </div>
    </div>
  </div>
  
  
  
      <!-- start header -->
      <header class="py-3 px-3">
          <div class="container-fluid">
              <div class="row">
                  <div class="col-lg-2 col-10 px-2">
                      <section class="logo">
                          <img src="assets/image/logo.png.webp " alt=" " />
                      </section>
                  </div>
                  <div class="col-lg-7  d-none  d-lg-block">
                      <nav class="d-lg-flex ">
                          <ul>
                              <li class="px-2 "><a  class="underline-link" href="index.html ">Home</a></li>
                              <li class="px-2 "><a class="underline-link" href="shop.html ">Shop</a></li>
                              <li class="px-2 "><a class="underline-link" href="blog.html ">Blog</a></li>
                              <li class="px-2 "><a class="underline-link" href="contact.html ">pages</a></li>
                              <li class="px-2 "><a  class="underline-link" href="contact.html ">Contact</a></li>
                          </ul>
                      </nav>
                  </div>
  
                  <div class="col-lg-3 px-2  d-none  d-lg-flex align-items-center">
                      <div class="header__right__auth d-flex align-items-center px-2 fw-light ">
                          <a  class="fs-6 fw-light px-1" href="#">Login</a>/
                          <a   class="fs-6 fw-light px-1 " href="#">Register</a>
                      </div>
                      <section class="icons d-lg-flex justify-content-center">
                          <a href="# " class="px-1"><i class="fa-solid fa-magnifying-glass"></i></a>
                          <a href="./cart.html" class="px-1 link-count cart-count" data-count="0"><i class="fa-solid fa-cart-shopping"></i></a>
                          <a href="#  " class="px-1 link-count " data-count="0"><i class="fa-solid fa-heart"></i></a>
                      </section>
                  </div>
  <div class="col-2  d-block d-lg-none ">
      <button class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <i class="fa-solid fa-bars fs-4 outline-0"></i>
      </button>
  </div>
                  
              </div>
      </header>`;


// end header


// start footer

footer.innerHTML=`


 <div class="container">
        <div class="row row-gap-2 mb-3">
          <div
            class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-start"
          >
            <img
              src="assets/image/logo.png.webp"
              alt="logo"
              class="mb-2"
              style="width: 150px"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt cilisis.
            </p>
            <div
              class="payment d-flex align-items-center justify-content-around column-gap-3"
            >
              <a href="#"
                ><img src="assets/image/payment-1.png.webp" alt=""
              /></a>
              <a href="#"
                ><img src="assets/image/payment-2.png.webp" alt=""
              /></a>
              <a href="#"
                ><img src="assets/image/payment-4.png.webp" alt=""
              /></a>
              <a href="#"
                ><img src="assets/image/payment-5.png.webp" alt=""
              /></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-3">
            <h6 class="fw-bold fs-3 pb-2">Quick Links</h6>
            <ul
              class="d-flex flex-column align-items-start fs-5 row-gap-2 ps-0"
            >
              <li><a href="#">About</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-3">
            <h6 class="fw-bold fs-3 pb-2">Account</h6>
            <ul
              class="d-flex flex-column align-items-start fs-5 alert-info row-gap-2 ps-0"
            >
              <li><a href="#">my account</a></li>
              <li><a href="#">order tracking</a></li>
              <li><a href="#">Check out</a></li>
              <li><a href="#">wishkist</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-8">
            <div class="newslatter">
              <h6 class="fw-bold fs-3 pb-2">NEWSLETTER</h6>
              <form action="#">
                <input type="text" placeholder="Email" />
                <button type="submit" class="site-btn">Subscribe</button>
              </form>
              <div class="social my-3">
                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-pinterest"></i></a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="d-flex align-items-baseline justify-content-center my-4">
          <span
            >Copyright © 2024 All rights reserved | This template is made with
          </span>
          <i class="fa-solid fa-heart mx-2" style="color: #ca1515"></i
          ><span>by ahmed mostafa</span>
        </div>
      </div>`;






