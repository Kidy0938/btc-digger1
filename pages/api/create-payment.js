const { price, hashrate } = req.body;

body: JSON.stringify({
  price_amount: price,
  price_currency: "usd",
  pay_currency: "usdttrc20",
  order_id: `btc_digger_${hashrate}TH_${Date.now()}`,
  order_description: `BTC Digger Package: ${hashrate} TH/s for ${price} USDT`,
}),
