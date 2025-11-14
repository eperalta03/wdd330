import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { setLocalStorage, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';


const productData = ProductData;
const products = ProductList;
console.log(products);

const dataSource = new ProductData('tents');
const productId = getParam('product');

console.log(dataSource.findProductById(productId));