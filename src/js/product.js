import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

//console.log(dataSource.findProductById(productId));

function addProductToCart(item) {
  let cartItems = getLocalStorage("so-cart") || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  cartItems.push(item);
  setLocalStorage("so-cart", cartItems);
}

function addToCartHandler() {
  addProductToCart(product.product);
}

document
  .querySelector("#addToCart")
  .addEventListener("click", addToCartHandler);

// add to cart button event handler
//async function addToCartHandler(e) {
//const product = await dataSource.findProductById(e.target.dataset.id);
//addProductToCart(product);
//}

// add listener to Add to Cart button
//document
//.getElementById("addToCart")
//.addEventListener("click", addToCartHandler);
