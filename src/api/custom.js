
export const getCrypto = () => {
    const method = 'GET';
    const request_url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=demo`
    const headers = {
      'Content-Type': 'application/json',
    }
    return fetch(request_url, { method, headers})
      .then((res) => res.json());
};
  