import { getUTCyyyymmddDate } from '../Display'
const OPEN_EXCHANGE_RATES_API_KEY = 'YOUR_API_KEY_HERE' // Replace with your actual Open Exchange Rates API key

export const getExchangeRate = async (date = new Date()) => {
  const baseUrl = "https://openexchangerates.org/api/historical/"
  const apiKey = OPEN_EXCHANGE_RATES_API_KEY

  // Define the API URL and parameters
  const params = {
    app_id: apiKey,
    base: "USD",
    symbols: "USD,JPY",
    prettyprint: 0
  };

  // Create a query string from the parameters
  const queryString = Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');

  console.log(date)
  const formattedDate = getUTCyyyymmddDate(date)

  // Call the API with the parameters and process the response data in a callback function. I hate eslint.
  // eslint-disable-next-line no-useless-concat
  const fetchUrl = baseUrl + formattedDate + '.json' + '?' + queryString
  // console.log(fetchUrl)
  return fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
      // Callback function to process the response data
      console.log(data)
      return data
    })
    .catch(error => {
      console.error(error);
  });
}