const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

function getCurrencyName(code) {
    const names = {
        'MXN': 'Mexican Peso',
        'EUR': 'Euro',
        'GBP': 'British Pound',
        'JPY': 'Japanese Yen',
        'CAD': 'Canadian Dollar',
        'AUD': 'Australian Dollar',
        'CNY': 'Chinese Yuan',
        'INR': 'Indian Rupee'
    };
    return names[code] || code;
}
function getCurrencySymbol(code) {
    const symbols = {
        'MXN': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥',
        'CAD': 'C$',
        'AUD': 'A$',
        'CNY': '¥',
        'INR': '₹'
    };
    return symbols[code] || '$';
}
function getCurrencyCountry(code) {
    const countries = {
        'MXN': 'Mexico',
        'EUR': 'Eurozone',
        'GBP': 'United Kingdom',
        'JPY': 'Japan',
        'CAD': 'Canada',
        'AUD': 'Australia',
        'CNY': 'China',
        'INR': 'India'
    };
    return countries[code] || 'Unknown';
}

export async function getExchangeRate() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.rates.MXN;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return null;
    }
}

export async function getCurrencyList() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const currencyArray = [];
        const currencies = ['MXN', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR'];

        currencies.forEach(code => {
            currencyArray.push({
                code: code,
                rate: data.rates[code],
                name: getCurrencyName(code),
                symbol: getCurrencySymbol(code),
                country: getCurrencyCountry(code),
                lastUpdated: data.date,
                baseCurrency: data.base,
                timestamp: data.timestamp,
            });
        });
        return currencyArray;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
