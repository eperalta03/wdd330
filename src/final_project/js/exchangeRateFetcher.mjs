const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export async function getExchangeRate(){
    try{
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.rates.MXN;
    } catch (error)
{
    console.error('Error fetching exchange rate:', error);
    return null;
}}