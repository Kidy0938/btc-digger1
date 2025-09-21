export default async function handler(req, res) {
  const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
  const response = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "x-api-key": NOWPAYMENTS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      price_amount: 10,
      price_currency: "usd",
      pay_currency: "usdt",
      order_id: `btc-digger-${Date.now()}`,
      order_description: "BTC Digger Demo Payment"
    })
  });
  const data = await response.json();
  res.status(200).json(data);
}
