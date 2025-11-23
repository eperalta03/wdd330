import { getLocalStorage, setLocalStorage, alertMessage } from './utils.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  async checkout() {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: this.list,
          total: this.orderTotal,
          tax: this.tax,
          shipping: this.shipping
        })
      });

      const data = await convertToJson(response);

      // HAPPY PATH: Clear cart and redirect to success page
      this.clearCart();
      window.location.href = '../checkout/success.html';

    } catch (err) {
      if (err.name === 'servicesError') {
        // Use custom alert instead of native alert
        alertMessage(`Checkout failed: ${JSON.stringify(err.message)}`, true);
      } else {
        alertMessage('An unexpected error occurred during checkout.', true);
      }
    }
  }

  clearCart() {
    // Clear the cart from localStorage
    setLocalStorage(this.key, []);
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((total, item) => {
      return total + (item.FinalPrice * item.Quantity);
    }, 0);
  }

  calculateItemSummary() {
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    this.tax = (this.itemTotal * 0.16);
    this.shipping = 10;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElement = document.querySelector(`${this.outputSelector} #tax`);
    const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
    const totalElement = document.querySelector(`${this.outputSelector} #orderTotal`);
    const itemTotalElement = document.querySelector(`${this.outputSelector} #itemTotal`);

    if (taxElement) taxElement.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingElement) shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    if (totalElement) totalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
    if (itemTotalElement) itemTotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }
}