export function convertUSDToMXN(usdAmount, exchangeRate) {
    return usdAmount * exchangeRate;
}
export function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}