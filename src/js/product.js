import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {

  // const actualCar = localStorage.getItem("so-cart"); 

  // let newCar = [];

  // if (actualCar) {
  //   try {
  //     newCar = JSON.parse(actualCar);
  //   } catch (error) {
  //     console.error("Error")
  //   }
  // }
  // cart.push(product);

  // setLocalStorage("so-cart", JSON.stringify(newCar));
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
