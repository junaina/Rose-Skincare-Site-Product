//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//open
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//close
closeCart.onclick = () => {
  cart.classList.remove("active");
};
//cart working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//function
function ready() {
  var removeCartButtons = document.getElementsByClassName("bx bxs-trash");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //updating quantity
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //add to cart
  var addCart = document.getElementsByClassName("ribbon");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //buy button
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
//buybutton clicked
function buyButtonClicked() {
  alert("Your order has been placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//updating quantity function
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
//add cart clicked function
// function addCartClicked(event) {
//   var button = event.target;
//   var shopProduct = button.parentElement.parentElement.parentElement;

//   var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
//   var price = shopProduct.getElementsByClassName("price")[0].innerText;
//   var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
//   console.log(title, price, productImg);
//   addProductToCart(title, price, productImg);
//   updateTotal();
// }
function addCartClicked(event) {
  var button = event.target;
  var shopProduct = button.closest(".product-box");

  var title = shopProduct.querySelector(".product-title").innerText;
  var price = shopProduct.querySelector(".price").innerText;
  var productImg = shopProduct.querySelector(".product-img").src;
  console.log(title, price, productImg);
  addProductToCart(title, price, productImg);
  updateTotal();
}

var cartShopBox = document.createElement("div");

cartShopBox.classList.add("cart-box");
var cartItems = document.getElementsByClassName("cart-content")[0];
var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");

  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    console.log(title);
    if (cartItemNames[i].innerText == title) {
      alert("Tou have already added this to cart");
      return;
    }
  }
  var cartBoxContent = `            <img
          src="${productImg}"
          alt=""
          class="cart-img"
        />
        <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input
            type="number"
            name="quantity"
            value="1"
            min="1"
            max="10"
            step="1"
            class="cart-quantity"
          />
        </div>
        <i class="bx bxs-trash" id="cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("bx bxs-trash")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

//remove items function
function removeCartItem() {
  const cartItem = document.querySelector(".cart-box");
  cartItem.remove();
  updateTotal();
}

// const cartItems = document.querySelectorAll(".cart-box");
// let total = 0;
// cartItems.forEach((cartItem) => {
//   const priceElement = cartItem.querySelector(".cart-price");
//   const price = parseFloat(priceElement.textContent.replace("Rs.", ""));
//   const quantityElement = cartItem.querySelector(".cart-quantity");
//   const quantity = quantityElement.value;
//   total += price * quantity;
// });
// const totalElement = document.querySelector(".total-price");
// totalElement.textContent = "Rs." + totals.toFixed(2);
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  if (cartBoxes.length > 0) {
    for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName("cart-price")[0];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      var price = parseFloat(priceElement.innerText.replace("Rs.", ""));
      var quantity = quantityElement.value;
      total = total + price * quantity;
    }
  }
  document.getElementsByClassName("total-price")[0].innerText = "Rs." + total;
}
